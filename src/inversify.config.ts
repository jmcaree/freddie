import "reflect-metadata";
import inversify from "inversify";
const { Container } = inversify;
import { TYPES } from "./types";
import { Freddie } from "./freddie";
import { Client } from "discord.js";

const container = new Container();

container.bind<Freddie>(TYPES.Freddie).to(Freddie).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container
    .bind<string>(TYPES.Token)
    .toConstantValue(process.env.TOKEN || "Token Not Found");

export default container;
