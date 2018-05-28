import { MessageBase, MessageType } from '../message/message.common';
declare const org;
export * from '../message/message.common';
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
