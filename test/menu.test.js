require('../bin/www')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
const expect = chai.expect

describe('Fetch Menu API', async () => {
    it('GET /menu returns list of all items in the menu', async () => {
        await chai.request('http://localhost:3000')
            .get('/menu')
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(200)
                expect(res.body.data).to.eql([{
                    "id": "1",
                    "name": "Item1",
                    "amount": 30
                }, {
                    "id": "2",
                    "name": "Item2",
                    "amount": 20
                }, {
                    "id": "3",
                    "name": "Item3",
                    "amount": 50
                }])
            })
    })
})