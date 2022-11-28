export interface Message {
    timestamp: number;
    content: string;
    from: string;
}

export const EVENTS = {
    SERVER: {
        WELCOME: "WELCOME",
        MESSAGE: "MESSAGE_RECEIVED",
        PLAYER_JOIN: "PLAYER_JOIN",
        PLAYER_LEAVE: "PLAYER_LEAVE",
        PLAYER_RENAMED: "PLAYER_RENAMED",
    },
    CLIENT: {
        MESSAGE: "MESSAGE",
        UPDATE_NAME: "UPDATE_NAME",
    }
}