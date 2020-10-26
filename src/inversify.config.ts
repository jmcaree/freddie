import "reflect-metadata";
import { Client } from "discord.js";
// import inversify from "inversify";
// const { Container } = inversify;
import { Container } from "inversify";
import Freddie from "./freddie";
import PingFinder from "./services/pingFinder";
import { TYPES } from "./types";
import MessageResponder from "./services/messageResponder";

const container = new Container();

container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<Freddie>(TYPES.Freddie).to(Freddie).inSingletonScope();
container
    .bind<MessageResponder>(TYPES.MessageResponder)
    .to(MessageResponder)
    .inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container
    .bind<string>(TYPES.Token)
    .toConstantValue(process.env.TOKEN || "Token Not Found");

export default container;
