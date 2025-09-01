import db_connection from "./database/db_connection.js"
import ButterflyModel from "./models/ButterflyModel.js"

await db_connection.authenticate();
await ButterflyModel.sync({ force: true});