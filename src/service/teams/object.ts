import { AbstractClass } from '../../utils'

export class Teams extends AbstractClass {
  SERVICE_NAME = 'Microsoft Teams'
  URL = 'https://teams.microsoft.com/_'
  URL_AST = 'https://teams.microsoft.com/_*'
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
