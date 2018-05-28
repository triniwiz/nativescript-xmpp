import {
  PresenceOptions,
  PresenceType,
  PresenceBase,
  PresenceMode
} from './presence.comon';
declare const org;
export * from './presence.comon';
export class Presence extends PresenceBase {
  constructor(
    options: PresenceOptions = {
      type: PresenceType.AVAILABLE,
      mode: PresenceMode.AVAILABLE
    }
  ) {
    super(options);
    switch (options.type) {
      case PresenceType.UNAVAILABLE:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.unavailable
        );
        break;
      case PresenceType.ERROR:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.error
        );
        break;
      case PresenceType.PROBE:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.probe
        );
        break;
      case PresenceType.SUBSCRIBE:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.subscribe
        );
        break;
      case PresenceType.SUBSCRIBED:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.subscribed
        );
        break;
      case PresenceType.UNSUBSCRIBE:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.unsubscribe
        );
        break;
      case PresenceType.UNSUBSCRIBE:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.unsubscribe
        );
        break;
      case PresenceType.UNSUBSCRIBED:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.unsubscribed
        );
        break;
      default:
        this.presence = new org.jivesoftware.smack.packet.Presence(
          org.jivesoftware.smack.packet.Presence.Type.available
        );
        break;
    }
  }
  set type(type: PresenceType) {
    switch (type) {
      case PresenceType.ERROR:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.error
        );
        break;
      case PresenceType.PROBE:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.probe
        );
        break;
      case PresenceType.SUBSCRIBE:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.subscribe
        );
        break;
      case PresenceType.SUBSCRIBED:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.subscribed
        );
        break;
      case PresenceType.UNAVAILABLE:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.unavailable
        );
        break;
      case PresenceType.UNSUBSCRIBE:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.unsubscribe
        );
        break;
      case PresenceType.UNSUBSCRIBED:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.unsubscribed
        );
        break;
      default:
        this._options.type = type;
        this.presence.setType(
          org.jivesoftware.smack.packet.Presence.Type.available
        );
        break;
    }
  }
  set mode(mode: PresenceMode) {
    switch (mode) {
      case PresenceMode.AWAY:
        this._options.mode = mode;
        this.presence.setMode(org.jivesoftware.smack.packet.Presence.Mode.away);
        break;
      case PresenceMode.CHAT:
        this._options.mode = mode;
        this.presence.setMode(org.jivesoftware.smack.packet.Presence.Mode.chat);
        break;
      case PresenceMode.DND:
        this._options.mode = mode;
        this.presence.setMode(org.jivesoftware.smack.packet.Presence.Mode.dnd);
        break;
      case PresenceMode.XA:
        this._options.mode = mode;
        this.presence.setMode(org.jivesoftware.smack.packet.Presence.Mode.xa);
        break;
      default:
        this._options.mode = PresenceMode.AVAILABLE;
        this.presence.setMode(
          org.jivesoftware.smack.packet.Presence.Mode.available
        );
        break;
    }
  }
  set status(txt: string) {
    this._options.status = txt;
    this.presence.setStatus(txt);
  }
  get status(): string {
    return this._options.status;
  }
}
