import {
  XMPPBase,
  XMPPOptions,
  PresenceOptions,
  PresenceType,
  PresenceMode,
  PresenceBase,
  MessageBase,
  RosterBase,
  MessageType
} from './xmpp.common';
import { fromObject } from 'tns-core-modules/data/observable/observable';
declare const XMPPStream,
  XMPPJID,
  XMPPStreamTimeoutNone,
  XMPPStreamDelegate,
  XMPPPresence,
  DDXMLElement,
  XMPPMessage;
const main_queue = dispatch_get_current_queue();
export class XMPP extends XMPPBase {
  constructor(options: XMPPOptions) {
    super(options);
    this.connection = XMPPStream.new();
    this.connection.hostName = options.host ? options.host : options.domain;
    if (options.port) {
      this.connection.hostPort = options.port;
    }
    this.connection.myJID = XMPPJID.jidWithString(
      `${options.username}@${options.domain}`
    );
    const delegate = XMPPStreamDelegateImpl.initWithOwner(new WeakRef(this));
    this.connection.addDelegateDelegateQueue(delegate, main_queue);
  }
  connect(): void {
    if (!this.connection.isDisconnected) {
      return;
    }
    const error = this.connection.connectWithTimeoutError(
      XMPPStreamTimeoutNone
    );
  }
  disconnect(): void {
    this.connection.disconnect();
  }
  login(): void {
    this.connection.authenticateWithPasswordError(this._options.password);
  }
  send(data: any): void {
    let s;
    if (data instanceof Presence) {
      s = data.presence;
    } else if (data instanceof Message) {
      s = data.message;
    } else {
      s = data;
    }
    this.connection.sendElement(s);
  }
}

@ObjCClass(XMPPStreamDelegate)
class XMPPStreamDelegateImpl extends NSObject implements XMPPStreamDelegate {
  private _owner: WeakRef<XMPP>;

  public static initWithOwner(owner: WeakRef<XMPP>): XMPPStreamDelegateImpl {
    const delegate = XMPPStreamDelegateImpl.new() as XMPPStreamDelegateImpl;
    delegate._owner = owner;
    return delegate;
  }

  xmppStreamDidConnect(stream) {
    const owner = this._owner.get();
    owner.notify({
      eventName: 'connected',
      object: owner,
      android: null,
      ios: stream
    });
  }

  xmppStreamDidAuthenticate(sender) {
    const owner = this._owner.get();
    owner.notify({
      eventName: 'authenticated',
      object: owner,
      android: null,
      ios: sender
    });
  }
}

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

export class Message extends MessageBase {
  _options;
  constructor() {
    super();
    this._options = {};
    this.message = DDXMLElement.elementWithName('message');
    this.message.addAttributeWithNameStringValue('type', 'normal');
  }
  set to(jid: string) {
    this._options.to = jid;
    this.message.addAttributeWithNameStringValue('to', jid);
  }
  set body(body: any) {
    this._options.body = body;
    const b = DDXMLElement.elementWithNameStringValue('body', body);
    this.message.addChild(b);
  }
  set type(type: MessageType) {
    this._options.type = type;
    this.message.addAttributeWithNameStringValue('type', type);
  }
  set from(jid: string) {
    this._options.from = jid;
    this.message.addAttributeWithNameStringValue('from', jid);
  }
}

export class Roster extends RosterBase {
  constructor() {
    super();
  }
}
