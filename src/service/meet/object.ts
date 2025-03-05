import { AbstractClass } from '../../utils'

export class Meet extends AbstractClass {
  SERVICE_NAME = 'Google Meet'
  URL = 'https://meet.google.com/'
  URL_AST = 'https://meet.google.com/*'
  MEETING_URL_PROPERTY = {}

  checkMute = () => {
    let muted = false
    let joinedStatus = true
    for (let elem of document.getElementsByTagName('*')) {
      if ((elem.innerHTML.indexOf('Join now') != -1) || (elem.innerHTML.indexOf('Rejoin') != -1)) {
        joinedStatus = false
      } else if (elem.matches('[aria-label~="microphone"]') && ['DIV', 'BUTTON'].includes(elem.nodeName)) {
        // FIXME: 想定外の要素まで取れているためisMutedが取れなかったらスキップする
        const isMuted = (elem as HTMLElement).dataset?.isMuted
        if (isMuted === undefined) continue
        muted = JSON.parse(isMuted)
      }
    }
    return {
      muted,
      joinedStatus,
    }
  }
}
