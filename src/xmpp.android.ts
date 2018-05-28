import {
  XMPPBase,
  XMPPOptions,
  PresenceBase,
  PresenceType,
  PresenceOptions,
  PresenceMode,
  MessageBase,
  RosterBase,
  MessageType
} from './xmpp.common';
import { ad } from 'tns-core-modules/utils/utils';
import { fromObject } from 'tns-core-modules/data/observable/observable';
declare const org, co;
export class XMPP extends XMPPBase {
  private manager;
  constructor(options: XMPPOptions) {
    super(options);
    this.manager = co.fitcom.fancyxmpp.Manager.getInstance();
    if (options.host) {
      this.connection = this.manager.createConnection(
        options.username,
        options.password,
        options.domain,
        options.host
      );
    } else if (options.host && options.port) {
      this.connection = this.manager.createConnection(
        options.username,
        options.password,
        options.domain,
        options.host,
        options.port
      );
    } else {
      this.connection = this.manager.createConnection(
        options.username,
        options.password,
        options.domain
      );
    }
    const ref = new WeakRef(this);
    const owner = ref.get();
    const connectionListener = new org.jivesoftware.smack.ConnectionListener({
      authenticated(connection, resumed: boolean) {
        owner.notify({
          eventName: 'authenticated',
          object: owner,
          android: connection,
          ios: null
        });
      },
      connected(connection) {
        owner.notify({
          eventName: 'connected',
          object: owner,
          android: connection,
          ios: null
        });
      },
      connectionClosed() {},
      connectionClosedOnError(e: java.lang.Exception) {}
    });
    this.connection.addConnectionListener(connectionListener);

    const chatManager = org.jivesoftware.smack.chat2.ChatManager.getInstanceFor(
      this.connection
    );
    const incomingMessageListener = new org.jivesoftware.smack.chat2.IncomingChatMessageListener(
      {
        newIncomingMessage(from, message, chat) {
          const msg = new Message();
          msg.body = message.getBody();
          msg.to = message.getTo().toString();
          msg.from = from.toString();
          msg.type = message.getType().toString();
          owner.notify({
            eventName: 'incomingMessage',
            object: fromObject({
              message: msg,
              from: from.toString()
            }),
            android: { from: from, message: message, chat: chat },
            ios: null
          });
        }
      }
    );
    const outgoingMessageListener = new org.jivesoftware.smack.chat2.OutgoingChatMessageListener(
      {
        newOutgoingMessage(to, message, chat) {
          const msg = new Message();
          msg.body = message.getBody();
          msg.to = to.toString();
          msg.from = message.getFrom().toString();
          msg.type = message.getType().toString();
          owner.notify({
            eventName: 'outgoingMessage',
            object: fromObject({
              message: msg,
              to: to.toString()
            }),
            android: { to: to, message: message, chat: chat },
            ios: null
          });
        }
      }
    );
    chatManager.addIncomingListener(incomingMessageListener);
    chatManager.addOutgoingListener(outgoingMessageListener);
  }
  connect(): void {
    if (this.connection) {
      this.manager.connect(this.connection);
    }
  }
  disconnect(): void {
    if (this.connection) {
      this.manager.disconnect(this.connection);
    }
  }
  login(): void {
    if (this.connection) {
      this.manager.login(this.connection);
    }
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
    this.connection.sendStanza(s);
  }
}

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

export class Message extends MessageBase {
  _options;
  constructor() {
    super();
    this._options = {};
    this.message = new org.jivesoftware.smack.packet.Message();
  }
  set to(jid: string) {
    this._options.to = jid;
    try {
      const j = org.jxmpp.jid.impl.JidCreate.from(jid);
      this.message.setTo(j);
    } catch (e) {
      console.log(e);
    }
  }
  set body(body: any) {
    this._options.body = body;
    this.message.setBody(body);
  }
  set type(type: MessageType) {
    this._options.type = type;
    let t;
    switch (type) {
      case MessageType.CHAT:
        t = org.jivesoftware.smack.packet.Message.Type.chat;
        break;
      case MessageType.GROUP_CHAT:
        t = org.jivesoftware.smack.packet.Message.Type.groupchat;
        break;
      case MessageType.HEADLINE:
        t = org.jivesoftware.smack.packet.Message.Type.headline;
        break;
      case MessageType.ERROR:
        t = org.jivesoftware.smack.packet.Message.Type.error;
        break;
      default:
        t = org.jivesoftware.smack.packet.Message.Type.normal;
        break;
    }
    this.message.setType(t);
  }
  set from(jid: string) {
    this._options.from = jid;
    try {
      const j = org.jxmpp.jid.impl.JidCreate.from(jid);
      this.message.setFrom(j);
    } catch (e) {
      console.log(e);
    }
  }
}

export class Roster extends RosterBase {
  constructor() {
    super();
  }
}
