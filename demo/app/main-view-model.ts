import { Observable } from 'tns-core-modules/data/observable';
import { XMPP, Presence } from 'nativescript-xmpp';
import { isIOS } from 'tns-core-modules/platform';
declare const org;
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
    this.xmpp.on('connected', args => {
      this.xmpp.login();
    });
    this.xmpp.on('authenticated', (args: any) => {
      const presence = new Presence();
      presence.status = 'Nice';
      this.xmpp.send(presence);
    });
    this.xmpp.connect();
  }
}
