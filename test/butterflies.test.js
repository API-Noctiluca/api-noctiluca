import request from "supertest";
import { app, PORT, server } from "../app.js"
import db_connection from "../database/db_connection.js"
import ButterflyModel from "../models/ButterflyModel.js";

describe("test butterflies crud", () => {
    beforeAll(async() => { // antes de todo se conecta
        await db_connection.authenticate() //con eso se conecta
    })

    //Método GET all butterflies
    describe("GET /butterflies", () => {
        let response
        beforeEach(async () => {
            response = await request(app).get("/api/butterflies").send()
        })
        
        test('should return a response with status 200 and type json', async () => {
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('json') 
        })

        test('should return array of butterflies', async () =>{
            expect(response.body).toBeInstanceOf(Array)
        })
    })
    

    //Método GET one butterfly/:id
    // describe("GET/butterflies/:id", () => {
    //     let response

    // })
    //Método POST one butterfly/:id

    //Método PUT one butterfly/:id

    //Método DELETE one butterfly/:id
    describe("DELETE /butterflies", () =>{
        let response
        let createdButterfly = {}

        beforeEach(async () => {//antes de cada test, crea una mariposa y hace la petición
            createdButterfly = await ButterflyModel.create({
                name: "test",
                other_names: "test",
                family: "test",
                location: "test",
                habitat: "test",
                morphology: "test",
                life: "test",
                feeding: "test",
                conservation: "test",
                about_conservation: "LC",
                image: "test"
            })
            response = await request(app).delete(`/api/butterflies/${createdButterfly.id}`).send()
        })

        test('should return a response with status 200 and type json', async () =>{
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('json')
        })

        test('should return a message butterfly deleted successfully', async () => {
            expect(response.body.message).toContain("Butterfly deleted successfully")
            const foundButterfly = await ButterflyModel.findOne({where: {id: createdButterfly.id}})
            expect(foundButterfly).toBeNull();
        })
    })

    afterAll(async() => { // funciona como el beforeAll, después de cada testeo lo apagamos/cerramos
        server.close() // para que Jest no se quede colgado
    })
})