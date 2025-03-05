import { initializer, run } from './common'
import { ICON_GRAY128 } from './const'

// Run functions on load
initializer()
run(false)

// Functions to run when icon is clicked.
chrome.action.onClicked.addListener((_tab) => {
  console.debug('chrome.action.onClicked.addListener', _tab)
  run(true)
})

// When a meet.google.com/* window is opened (or closed) run functions
chrome.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  console.debug('chrome.tabs.onUpdated.addListener', _tab)
  if (changeInfo.status == 'complete' || changeInfo.discarded) {
    run(false)
  }
})

// Run functions when alarm goes off
chrome.alarms.onAlarm.addListener((alarm) => {
  console.debug('chrome.alarms.onAlarm.addListener')
  if (alarm.name === '1min') {
    run(false)
  }
})

// Reset icon and badge on onload / cleanup in case of crash
addEventListener('beforeunload', () => {
  console.debug('beforeunload')
  chrome.action.setIcon({ path: ICON_GRAY128 })
  chrome.action.setBadgeText({ text: '' })
})

// ショートカットキー入力時の処理
chrome.commands.onCommand.addListener((command) => {
  console.debug('chrome.commands.onCommand.addListener')
  if (command === 'toggle-mute') {
    run(true)
  }
})
