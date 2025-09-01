import request from "supertest";
import { app, server } from "../app.js"
//import db_connection from "../database/db_connection.js"

describe("test butterflies crud", () => {

    afterAll(() => {
        server.close() // para que Jest no se quede colgado
    })
    //Método GET

    //Método GET one butterfly/:id

    //Método POST one butterfly/:id

    //Método PUT one butterfly/:id

    //Método DELETE one butterfly/:id
})