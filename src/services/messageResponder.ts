import { Message } from "discord.js";
import PingFinder from "./pingFinder";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export default class MessageResponder {
    private pingFinder!: PingFinder;

    constructor(@inject(TYPES.PingFinder) pingFinder: PingFinder) {
        this.pingFinder = pingFinder;
    }

    handle(message: Message): Promise<Message | Message[]> {
        if (this.pingFinder.isPing(message.content)) {
            return message.reply("Pong!");
        }

        return Promise.reject();
    }
}
