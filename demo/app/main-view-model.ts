import { Observable } from 'tns-core-modules/data/observable';
import { XMPP, Presence, Message } from 'nativescript-xmpp';
import { isIOS } from 'tns-core-modules/platform';
import { PresenceMode, PresenceType } from 'nativescript-xmpp/xmpp.common';
declare const org, DDXMLElement;
export class HelloWorldModel extends Observable {
  public message: string;
  private xmpp: XMPP;
  constructor() {
    super();
    this.xmpp = new XMPP({
      username: 'showstopper',
      password: 'password',
      domain: 'localhost',
      host: isIOS ? 'localhost' : '10.0.2.2',
      resource: 'NativeScript'
    });
    this.xmpp.on('outgoingMessage', args => {});
    this.xmpp.on('incomingMessage', args => {
      console.log('Message');
      console.log(args.object.get('message'));
    });
    this.xmpp.on('connected', args => {
      this.xmpp.login();
    });
    this.xmpp.on('authenticated', (args: any) => {
      const presence = new Presence();
      presence.status = 'Android!!!';
      presence.mode = PresenceMode.DND;
      this.xmpp.send(presence);
      const msg = new Message();
      msg.to = 'triniwiz@localhost';
      msg.body = 'Android Yay!!!';
      msg.from = 'showstopper@localhost';
      msg.type = 'chat';
      this.xmpp.send(msg);
      setTimeout(() => {
        const p = new Presence();
        presence.status = 'Ok';
        presence.mode = PresenceMode.AWAY;
        this.xmpp.send(presence);
      }, 5000);
      setTimeout(() => {
        const m = new Message();
        m.to = 'triniwiz@localhost';
        m.body = '2!!!';
        m.from = 'showstopper@localhost';
        m.type = 'chat';
        this.xmpp.send(m);
      }, 3000);
    });
    this.xmpp.connect();
  }
}
