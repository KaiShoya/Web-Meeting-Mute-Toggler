import { AbstractClass } from '../../utils'

export class TeamsV2 extends AbstractClass {
  SERVICE_NAME = 'Microsoft Teams'
  URL = 'https://teams.microsoft.com/v2/'
  URL_AST = 'https://teams.microsoft.com/v2/*'
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
