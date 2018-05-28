import {
  PresenceBase,
  PresenceOptions,
  PresenceMode,
  PresenceType
} from './presence.comon';
declare const XMPPStream,
  XMPPJID,
  XMPPStreamTimeoutNone,
  XMPPStreamDelegate,
  XMPPPresence,
  DDXMLElement,
  XMPPMessage;
export * from './presence.comon';
export class Presence extends PresenceBase {
  private _presence;
  priority;
  constructor(
    options: PresenceOptions = {
      type: PresenceType.AVAILABLE,
      mode: PresenceMode.AVAILABLE
    }
  ) {
    super(options);
    this._presence = DDXMLElement.elementWithName('presence');
    switch (options.type) {
      case PresenceType.UNAVAILABLE:
      case PresenceType.ERROR:
      case PresenceType.PROBE:
      case PresenceType.SUBSCRIBE:
      case PresenceType.SUBSCRIBED:
      case PresenceType.UNSUBSCRIBE:
      case PresenceType.UNSUBSCRIBE:
      case PresenceType.UNSUBSCRIBED:
      case PresenceType.AVAILABLE:
        this._presence.addAttributeWithNameStringValue('type', options.type);
        break;
      default:
        break;
    }
  }
  get presence() {
    return XMPPPresence.presenceFromElement(this._presence);
  }
  set type(type: PresenceType) {
    switch (type) {
      case PresenceType.ERROR:
      case PresenceType.PROBE:
      case PresenceType.SUBSCRIBE:
      case PresenceType.SUBSCRIBED:
      case PresenceType.UNAVAILABLE:
      case PresenceType.UNSUBSCRIBE:
      case PresenceType.UNSUBSCRIBED:
        this._options.type = type;
        this.presence.type = type;
        break;
      default:
        this._options.type = type;
        this.presence.type = PresenceType.AVAILABLE;
        break;
    }
  }
  set mode(mode: PresenceMode) {
    let show;
    switch (mode) {
      case PresenceMode.AWAY:
        this._options.mode = mode;
        show = DDXMLElement.elementWithNameStringValue('show', mode);
        break;
      case PresenceMode.CHAT:
        this._options.mode = mode;
        show = DDXMLElement.elementWithNameStringValue('show', mode);
        break;
      case PresenceMode.DND:
        this._options.mode = mode;
        show = DDXMLElement.elementWithNameStringValue('show', mode);
        break;
      case PresenceMode.XA:
        this._options.mode = mode;
        show = DDXMLElement.elementWithNameStringValue('show', mode);
        break;
      default:
        this._options.mode = PresenceMode.AVAILABLE;
        show = DDXMLElement.elementWithNameStringValue(
          'show',
          PresenceMode.AVAILABLE
        );
        break;
    }
    this._presence.addChild(show);
  }
  set status(txt: string) {
    this._options.status = txt;
    const status = DDXMLElement.elementWithNameStringValue('status', txt);
    this._presence.addChild(status);
  }
  get status(): string {
    return this._options.status;
  }
}
