import { MessageBase, MessageType } from './message.common';
declare const XMPPStream,
  XMPPJID,
  XMPPStreamTimeoutNone,
  XMPPStreamDelegate,
  XMPPPresence,
  DDXMLElement,
  XMPPMessage;
export * from '../message/message.common';
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
