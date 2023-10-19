process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDB");

let milk = {'name': 'milk',
            'price': 3.00}
let honey = {'name': 'milk',
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



afterEach(()=>{
    items.length = 0
})