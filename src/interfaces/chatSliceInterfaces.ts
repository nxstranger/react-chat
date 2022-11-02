import { MessageInterface, MessageStatusEnum } from "./chatInterfaces";

interface AddMessageActionInterface {
    payload: MessageInterface,
}

interface LocalStorageChatInterface {
    userName?: string | null,
    contactName?: string | null,
}

interface UpdateMessageStatusActionInterface {
    payload: {
        newStatus: MessageStatusEnum,
        stamp: number,
    }
}

export type {
    LocalStorageChatInterface,
    AddMessageActionInterface,
    UpdateMessageStatusActionInterface
}
