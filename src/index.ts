import "dotenv/config";
import container from "./inversify.config";
import { TYPES } from "./types";
import Freddie from "./freddie";

const freddie = container.get<Freddie>(TYPES.Freddie);
freddie
    .listen()
    .then(() => {
        console.log("Logged in!");
    })
    .catch((error) => {
        console.log("Oh no!", error);
    });
