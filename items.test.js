process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDB");

let milk = {'name': 'milk',
            'price': 3.00}
let honey = {'name': 'honey',
            'price': 5.75}      
            
beforeEach(()=>{
    items.push(milk)
    items.push(honey)
})

describe('GET /items',()=>{
    test('Gets list of items',async ()=>{
        const resp = await request(app).get('/items')
        expect(resp.body).toEqual({items:[milk,honey]})
        expect(resp.statusCode).toBe(200)
    })
})

describe('POST /items', ()=>{

    test('Creates new item and adds to fakeDB', async ()=>{
        const resp = await request(app)
        .post('/items')
        .send({'item':{'name':'salt','price':1.50}})

        expect(resp.body).toEqual({'added':{'name':'salt','price':1.50}})
        expect(resp.statusCode).toBe(201)
    })

    test('Error thrown due to invalid request', async ()=>{
        const resp = await request(app)
        .post('/items')
        .send({'item':{'name':'salt'}})

        expect(resp.statusCode).toEqual(400)
        expect(resp.body).toEqual({'error':{'message':'Invalid Request:Request body must have a JSON object named item with the keys of name and price', 'status':400}})
    })
})

describe('GET /items/:name',()=>{
    test('Gets single item based off of name',async ()=>{
        const resp = await request(app).get('/items/honey')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(honey)
    })

    test('Throws error, item not found', async ()=>{
        const resp = await request(app).get('/items/notRealItem')

        expect(resp.statusCode).toBe(404)
        expect(resp.body).toEqual({'error':{'message':'Item not found', 'status':404}})
    })
})

afterEach(()=>{
    items.length = 0
})