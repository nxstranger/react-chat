import { MessageInterface } from "./chatInterfaces";

interface AddMessageActionInterface {
    payload: MessageInterface,
}

interface LocalStorageChatInterface {
    userName?: string | null,
    contactName?: string | null,
}

export type {
    LocalStorageChatInterface,
    AddMessageActionInterface,
}
