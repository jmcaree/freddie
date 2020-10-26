import { Client, Guild, Message, TextChannel } from "discord.js";
import MessageResponder from "../messageResponder";
import PingFinder from "../pingFinder";

const mockIsPing = jest.fn();
jest.mock("../pingFinder", () => {
    return jest.fn().mockImplementation(() => {
        return {
            isPing: mockIsPing,
        };
    });
});
jest.mock("discord.js");

describe("MessageResponder", () => {
    const mockPingFinder = new PingFinder();
    let mockClient: Client;
    let mockGuild: Guild;
    let mockMessage: Message;
    let mockTextChannel: TextChannel;
    const messageResponder = new MessageResponder(mockPingFinder);

    beforeEach(() => {
        mockIsPing.mockClear();
        mockClient = new Client();
        mockGuild = new Guild(mockClient, {});
        mockTextChannel = new TextChannel(mockGuild);
        mockMessage = new Message(mockClient, {}, mockTextChannel);
    });

    it("should reply", async () => {
        mockIsPing.mockReturnValueOnce(true);

        await messageResponder.handle(mockMessage);

        expect(mockMessage.reply).toHaveBeenCalled();
    });

    it("should throw when ping not found", async () => {
        mockIsPing.mockReturnValueOnce(false);

        await messageResponder.handle(mockMessage).catch(() => {
            expect(mockMessage.reply).not.toHaveBeenCalled();
        });
    });
});
