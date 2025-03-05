import { AbstractClass } from '../../utils'

export class TeamsLightMeeting extends AbstractClass {
  SERVICE_NAME = 'Microsoft Teams'
  URL = 'https://teams.microsoft.com/light-meetings/launch'
  URL_AST = 'https://teams.microsoft.com/light-meetings/launch*'
  MEETING_URL_PROPERTY = {}

  checkMute = () => {
    let muted = false
    let joinedStatus = true
    const microphoneButton = document.getElementById('microphone-button')
    muted = microphoneButton!.dataset.state == 'mic-off'
    return {
      muted,
      joinedStatus,
    }
  }
}
