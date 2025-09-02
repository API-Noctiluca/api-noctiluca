import request from "supertest";
import { app, server } from "../app.js"
import db_connection from "../database/db_connection.js"

describe("test butterflies crud", () => {
    beforeAll(async() => { // antes de todo se conecta
        await db_connection.authenticate() //con eso se conecta
    })

    //Método GET all butterflies
    describe("GET/butterflies", () => {
        let response
        beforeEach(async () => {
            response = await request(app).get("/butterflies").send()
        })
        
        test('should return a response with status 200 and type json', async () => {
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('json') 
        })

        test('should return array of books', async () =>{
            expect(response.body).toBeInstanceOf(Array)
        })
    })
    

    //Método GET one butterfly/:id

    //Método POST one butterfly/:id

    //Método PUT one butterfly/:id

    //Método DELETE one butterfly/:id

    afterAll(async() => { // funciona como el beforeAll, después de cada testeo lo apagamos/cerramos
        server.close() // para que Jest no se quede colgado
    })
})