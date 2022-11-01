type SendMessageType = 'MSG' | 'INFO' | 'ERR'

interface MessageInterface {
    type: 'MY'|'PT'| 'INFO'| 'ERR';
    message: string;
    stamp: number;
    extra?: any,
}

interface ServerMessageInterface {
    code: number,
    message: string,
    stamp: number,
    extra?: any
}

interface ChatStoreInterface {
    userName: string | null;
    contactName: string | null;
    messages: MessageInterface[];
    token: string | null;
    publicKey: string | null,
    privateKey: string | null,
}

export type {
    ServerMessageInterface,
    MessageInterface,
    ChatStoreInterface,
    SendMessageType,
}
