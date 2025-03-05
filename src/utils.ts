import { ICON_GRAY128, SERVICE_DIR } from './const'
import { MEETING_URL_PROPERTY, Tab } from './types'

/**
 * 引数がAbstractClassを継承しているオブジェクトかどうかを判定する
 * @param value 
 * @returns boolean
 */
export const isAbstractClass = (value: unknown): value is AbstractClass => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const { SERVICE_NAME, SUB_DIRECTORY, URL, URL_AST, MEETING_URL_PROPERTY, tab, checkMute, resetTab, assessTabs, sendKeypress } = value as Record<keyof AbstractClass, unknown>
  if (
    typeof SERVICE_NAME !== 'string'
    || typeof SUB_DIRECTORY !== 'string'
    || typeof URL !== 'string'
    || typeof URL_AST !== 'string'
    || typeof MEETING_URL_PROPERTY !== 'object'
    || typeof tab !== 'object'
    || typeof checkMute !== 'function'
    || typeof resetTab !== 'function'
    || typeof assessTabs !== 'function'
    || typeof sendKeypress !== 'function'
  ) {
    return false
  }
  return true
}

export abstract class AbstractClass {
  abstract SERVICE_NAME: string
  SUB_DIRECTORY: string = ''
  abstract URL: string
  abstract URL_AST: string
  abstract MEETING_URL_PROPERTY: MEETING_URL_PROPERTY

  tab: Tab = {
    tabId: -1, // Keeps track of id of which tab to interact with
    onlyTab: false, // If only meet.google.com is open (doesn't include meet.google.com/xxx-xxxx-xxx)
    isOpen: false, // If meet.google.com is open
    alerts: false, // If an alert has been triggered related to having too many meet windows open
    count: 0, // Number of meet.google.com/xxx-xxxx-xxx windows open
  }

  abstract checkMute: () => {
    muted: boolean;
    joinedStatus: boolean;
  }

  resetTab = () => {
    this.tab = {
      tabId: -1,
      onlyTab: false,
      isOpen: false,
      alerts: false,
      count: 0,
    }
  }

  assessTabs = async () => {
    console.debug('assessTabs')
    const tabs = await chrome.tabs.query({ url: this.URL_AST })
    // Checks if meeting tabs is open and how many
    tabs.forEach((item, index) => {
      console.debug('item',item)
      if (item.url === undefined) {
        return
      }
      // TODO: この処理いる？
      if (item.url === this.URL) {
        this.tab.isOpen = true
        return
      }
      // 設定がない場合
      if (Object.keys(this.MEETING_URL_PROPERTY).length === 0) {
        this.tab.tabId = index
        this.tab.count++
        return
      }

      for (const [key, value] of Object.entries(this.MEETING_URL_PROPERTY)) {
        const urlObject = new URL(item.url)
        // FIXME: 型定義が当たるように実装見直し予定
        // @ts-ignore
        if (urlObject[key] !== value) {
          // 設定に乖離があったらカウントしない
          return
        }
      }
      this.tab.tabId = index
      this.tab.count++

      // Checks if only tab is open
      // response.onlyTab = response.isOpen && response.count == 0

      // If tabs are open set alarm, so that they can be monitored
      if (this.tab.count > 0) {
        // https://developer.chrome.com/docs/extensions/reference/alarms/#method-create
        // To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
        chrome.alarms.create('1min', {
          periodInMinutes: 0.05,
        })
      }

      // If tabs are all closed, stop the alarm and reset icon and badge
      if (this.tab.count === 0) {
        chrome.alarms.clear('1min')
        chrome.action.setIcon({ path: ICON_GRAY128 })
        chrome.action.setBadgeText({ text: '' })
      }

      // If only one tab is open reset alert
      if (this.tab.count === 1) {
        this.tab.alerts = false
        chrome.action.setBadgeText({ text: '' })
      }

      // If an alert hasn't been triggered and if more than one tabs is open, alert to close some
      tabs.forEach((_item, _index) => {
        if (!this.tab.alerts) {
          if (this.tab.count > 1) {
            chrome.notifications.create(
              '',
              {
                type: 'basic',
                title: '',
                message: `You have ${this.tab.count} ${this.SERVICE_NAME} open. Close all but one.`,
                iconUrl: ICON_GRAY128,
              },
            )
            this.tab.alerts = true
            chrome.action.setBadgeText({ text: 'Err' })
          }
        }
      })
    })
  }


  sendKeypress = () => {
    const url = this.URL_AST
    const tabId = this.tab.tabId
    const filePath = `dist/${SERVICE_DIR}/${this.SUB_DIRECTORY}/sendKeypress.js`
    // const filePath = this.getSendKeypressPath()
    console.debug('sendKeypress()', url, tabId, filePath)
    chrome.tabs.query({ url }, (tabs) => {
      if (tabId != -1) {
        chrome.scripting.executeScript({
          target: { tabId: Number(tabs[tabId].id) },
          files: [filePath],
        })
      }
    })
  }
}
