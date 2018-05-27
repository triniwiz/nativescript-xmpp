import { XMPPBase, XMPPOptions } from './xmpp.common';
import { fromObject } from 'tns-core-modules/data/observable/observable';
declare const XMPPStream, XMPPJID, XMPPStreamTimeoutNone, XMPPStreamDelegate;
const main_queue = dispatch_get_current_queue();
export class XMPP extends XMPPBase {
  send(data: any): void {
    throw new Error("Method not implemented.");
  }
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
