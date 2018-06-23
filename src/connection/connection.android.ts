import { ConnectionBase, ConnectionOptions } from './connection.common';
import { fromObject } from 'tns-core-modules/data/observable/observable';
import { Presence } from '../presence';
import { Message } from '../message';

declare const co, org;

export class Connection extends ConnectionBase {
    private manager;

    constructor(options: ConnectionOptions) {
        super(options);
        this.manager = co.fitcom.fancyxmpp.Manager.getInstance();
        const opts = new co.fitcom.fancyxmpp.ConnectionOptions();


        if (options.host) {
            opts.setHost(options.host);
        }

        if (options.port) {
            opts.setPort(options.port)
        }

        if (options.resource) {
            opts.setResource(options.resource);
        }

        if (options.sasl) {
            const nativeList = new java.util.ArrayList();
            options.sasl.forEach(mech => {
                nativeList.add(mech);
            });
            opts.setSasl(nativeList);
        }

        opts.setCompression(options.compression);


        this.connection = this.manager.createConnection(opts);
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
            connectionClosed() {
            },
            connectionClosedOnError(e: java.lang.Exception) {
            }
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
                        android: {from: from, message: message, chat: chat},
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
                        android: {to: to, message: message, chat: chat},
                        ios: null
                    });
                }
            }
        );
        chatManager.addIncomingListener(incomingMessageListener);
        chatManager.addOutgoingListener(outgoingMessageListener);
        const rosterManager = org.jivesoftware.smack.roster.Roster.getInstanceFor(
            this.connection
        );
        const presenceEventListener = new org.jivesoftware.smack.roster.PresenceEventListener(
            {
                presenceAvailable(address, availablePresence) {
                    const p = new Presence();
                    p.mode = availablePresence.getMode();
                    p.status = availablePresence.getStatus();
                    p.type = availablePresence.getType().toString();
                    owner.notify({
                        eventName: 'presenceAvailable',
                        object: fromObject({
                            jid: address.toString(),
                            presence: p
                        }),
                        android: {address: address, presence: availablePresence},
                        ios: null
                    });
                },
                presenceError(address, errorPresence) {
                    const p = new Presence();
                    p.mode = errorPresence.getMode();
                    p.status = errorPresence.getStatus();
                    p.type = errorPresence.getType().toString();
                    owner.notify({
                        eventName: 'presenceError',
                        object: fromObject({
                            jid: address.toString(),
                            presence: p
                        }),
                        android: {address: address, presence: errorPresence},
                        ios: null
                    });
                },
                presenceSubscribed(address, subscribedPresence) {
                    const p = new Presence();
                    p.mode = subscribedPresence.getMode();
                    p.status = subscribedPresence.getStatus();
                    p.type = subscribedPresence.getType().toString();
                    owner.notify({
                        eventName: 'presenceSubscribed',
                        object: fromObject({
                            jid: address.toString(),
                            presence: p
                        }),
                        android: {address: address, presence: subscribedPresence},
                        ios: null
                    });
                },
                presenceUnavailable(address, presence) {
                    const p = new Presence();
                    p.mode = presence.getMode();
                    p.status = presence.getStatus();
                    p.type = presence.getType().toString();
                    owner.notify({
                        eventName: 'presenceUnavailable',
                        object: fromObject({
                            jid: address.toString(),
                            presence: p
                        }),
                        android: {address: address, presence: presence},
                        ios: null
                    });
                },
                presenceUnsubscribed(address, unsubscribedPresence) {
                    const p = new Presence();
                    p.mode = unsubscribedPresence.getMode();
                    p.status = unsubscribedPresence.getStatus();
                    p.type = unsubscribedPresence.getType().toString();
                    owner.notify({
                        eventName: 'presenceUnsubscribed',
                        object: fromObject({
                            jid: address.toString(),
                            presence: p
                        }),
                        android: {address: address, presence: unsubscribedPresence},
                        ios: null
                    });
                }
            }
        );
        const rosterListener = new org.jivesoftware.smack.roster.RosterListener({
            entriesAdded(addresses: java.util.Collection<any>) {
            },
            entriesUpdated(addresses: java.util.Collection<any>) {
            },
            entriesDeleted(addresses: java.util.Collection<any>) {
            },
            presenceChanged(presence) {
                console.log(presence);
            }
        });
        const subscribeListener = new org.jivesoftware.smack.roster.SubscribeListener(
            {
                processSubscribe(from, subscribeRequest) {
                    const p = new Presence();
                    p.mode = subscribeRequest.getMode();
                    p.status = subscribeRequest.getStatus();
                    p.type = subscribeRequest.getType().toString();
                    owner.notify({
                        eventName: 'processSubscribe',
                        object: fromObject({
                            jid: from.toString(),
                            presence: p
                        }),
                        android: {address: fromObject, presence: subscribeRequest},
                        ios: null
                    });
                }
            }
        );

        rosterManager.addRosterListener(rosterListener);
        rosterManager.addPresenceEventListener(presenceEventListener);
        rosterManager.addSubscribeListener(subscribeListener);
        const multiUserChatManager = org.jivesoftware.smackx.muc.MultiUserChatManager.getInstanceFor(
            this.connection
        );
        const multiUserChatLightManager = org.jivesoftware.smackx.muclight.MultiUserChatLightManager.getInstanceFor(
            this.connection
        );

        const mucInvitationListener = new org.jivesoftware.smackx.muc.InvitationListener(
            {
                invitationReceived(
                    conn,
                    room,
                    inviter,
                    reason,
                    password,
                    message,
                    invitation
                ) {
                    console.log('invitation');
                }
            }
        );

        multiUserChatManager.addInvitationListener(mucInvitationListener);
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
