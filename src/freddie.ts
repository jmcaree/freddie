import { Client, Message } from "discord.js";
import inversify from "inversify";
const { inject, injectable } = inversify;
import { TYPES } from "./types";
import MessageResponder from "./services/messageResponder";

@injectable()
export class Freddie {
    private client!: Client;
    private readonly token!: string;
    private readonly messageResponder!: MessageResponder;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder,
    ) {
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
    }

    public listen(): Promise<string> {
        this.client.on("message", (message: Message) => {
            if (message.author.bot) {
                console.log("Ignoring bot message!");
                return;
            }

            console.log(`Message Received! Contents: ${message.content}`);

            this.messageResponder
                .handle(message)
                .then(() => {
                    console.log("Response sent!");
                })
                .catch(() => {
                    console.log("Response not sent.");
                });
        });

        return this.client.login(this.token);
    }
}
