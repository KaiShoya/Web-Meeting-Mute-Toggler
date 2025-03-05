import { ICON_GRAY128, ICON_GREEN128, ICON_RED128, IMPORT_SERVICES } from './const'
import { services } from './store'
import { AbstractClass, isAbstractClass } from './utils'

// 色々初期化
export const initializer = async () => {
  console.debug('initializer() start')

  for (const [serviceSubDir, serviceClass] of Object.entries(IMPORT_SERVICES)) {
    const newClass = new serviceClass()

    if (isAbstractClass(newClass)) {
      newClass.resetTab()
      newClass.SUB_DIRECTORY = serviceSubDir
      services.push(newClass)
    }
  }
  console.debug('initializer() end', services)
}

export const run = async (isKeypress: boolean) => {
  console.debug('run() start', services)
  let totalCount = 0
  let serviceCount = 0
  let openServiceLast: AbstractClass | null = null
  for (const service of services) {
    service.resetTab()
    await service.assessTabs()
    if (service.tab.count > 0) {
      totalCount += service.tab.count
      serviceCount++
      openServiceLast = service
    }
  }

  if (totalCount <= 0 || !openServiceLast) {
    // タブが開いてなければ何もしない
  } else if (serviceCount === 1 && totalCount === 1) {
    // タブが1つだけの場合
    if (isKeypress) {
      console.debug('isKeypress')
      // FIXME: tsc実行時に「'openServiceLast' is possibly 'null'.」が発生するためエラーチェックを無視する
      // @ts-ignore
      openServiceLast.sendKeypress()
    }
    // FIXME: tsc実行時に「'openServiceLast' is possibly 'null'.」が発生するためエラーチェックを無視する
    // @ts-ignore
    setTimeout(() => researchTab(openServiceLast.URL_AST, openServiceLast.tab.tabId, openServiceLast.checkMute), 100)
  } else {
    chrome.notifications.create(
      '',
      {
        type: 'basic',
        title: '',
        message: `You have ${totalCount} Meeting open. Close all but one.`,
        iconUrl: ICON_GRAY128,
      },
    )
  }
  console.debug('run() end')
}

// Sets the icon color appropriately
export const updateIcon = (statuses: chrome.scripting.InjectionResult<{ muted: boolean; joinedStatus: boolean; }>[]) => {
  const muted = statuses[0].result?.muted
  const joinedStatus = statuses[0].result?.joinedStatus

  // Set icon to gray if not in an active Meet
  // Set icon to red if in an active Meet and muted
  // Otherwise set icon to green, meaning unmuted in an active meet
  const icon = (!joinedStatus) ? ICON_GRAY128 : (muted) ? ICON_RED128 : ICON_GREEN128
  chrome.action.setIcon({ path: icon })
}

// Research meet is active and mute status
export const researchTab = (url: string, tabId: number, func: () => { muted: boolean; joinedStatus: boolean; }) => {
  chrome.tabs.query({ url }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: Number(tabs[tabId].id) },
        func,
      },
      updateIcon,
    )
  })
}

// Inject keypress for toggling mute into appropriate tab
export const sendKeypress = (tabId: number, url: string, filePath: string) => {
  chrome.tabs.query({ url }, (tabs) => {
    if (tabId != -1) {
      chrome.scripting.executeScript({
        target: { tabId: Number(tabs[tabId].id) },
        files: [filePath],
      })
    }
  })
}
