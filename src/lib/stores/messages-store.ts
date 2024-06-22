import type { BaseMessage, Message } from "@types";
import { writable } from "svelte/store";

export const messagesStore = writable<Message[]>([]);

export const removeMessage = (id: string) => {
    messagesStore.update((messages) => messages.filter((message) => message.id !== id));
};

export const addMessage = (baseMessage: BaseMessage) => {
    const { duration = 5000 } = baseMessage;
    const message = {
        ...baseMessage,
        id: crypto.randomUUID(),
    };

    messagesStore.update((messages) => [...messages, message]);

    setTimeout(() => {
        removeMessage(message.id);
    }, duration);
};
