
import { Meet } from './service/meet/object'
import { Teams } from './service/teams/object'
import { TeamsLightMeeting } from './service/teams_light_meetings/object'
import { TeamsV2 } from './service/teams_v2/object'

// const ICON_GRAY48 = chrome.runtime.getURL('icons/M_gray48.png')
export const ICON_GRAY128 = chrome.runtime.getURL('icons/M_gray128.png')
export const ICON_RED128 = chrome.runtime.getURL('icons/M_red128.png')
export const ICON_GREEN128 = chrome.runtime.getURL('icons/M_green128.png')

export const SERVICE_DIR = './service'

export const IMPORT_SERVICES = {
  meet: Meet,
  teams: Teams,
  teams_light_meetings: TeamsLightMeeting,
  teams_v2: TeamsV2,
}