import { ConnectionBase, ConnectionOptions } from './connection.common';
import { Presence } from '../presence';
import { Message } from '../message';

const main_queue = dispatch_get_current_queue();
declare const XMPPStream,
  XMPPJID,
  XMPPStreamTimeoutNone,
  XMPPStreamDelegate,
  XMPPPresence,
  DDXMLElement,
  XMPPMessage;
export class Connection extends ConnectionBase {
  constructor(options: ConnectionOptions) {
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
  private _owner: WeakRef<Connection>;

  public static initWithOwner(
    owner: WeakRef<Connection>
  ): XMPPStreamDelegateImpl {
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
