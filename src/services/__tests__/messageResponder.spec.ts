import { Message } from "discord.js";
import MessageResponder from "../messageResponder";
import PingFinder from "../pingFinder";

jest.mock("../pingFinder");
jest.mock("discord.js");

describe("MessageResponder", () => {
    const mockPingFinder = new PingFinder();
    const mockMessage = Message as jest.Mock;
    const messageResponder = new MessageResponder(mockPingFinder);

    it.skip("should reply", async () => {
        await messageResponder.handle(mockMessage);
    });
});
