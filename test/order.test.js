require('../bin/www')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
const expect = chai.expect

describe('Create Order API', async () => {
  describe('When ordering items that are not available in menu', () => {
    it('POST /order returns error', async () => {
      const payload = {
        "userId": "1",
        "items": ["4", "1"]
      }
      await chai.request('http://localhost:3000')
        .post('/order')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Invalid Item")
        })
    })
  })

  describe('When items field is missing', () => {
    it('POST /order returns error', async () => {
      const payload = {
        "userId": "1"
      }
      await chai.request('http://localhost:3000')
        .post('/order')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Missing required fields")
        })
    })
  })

  describe('When valid data is provided', () => {
    it('POST /order creates an order', async () => {
      const payload = {
        "userId": "1",
        "items": ["1", "2"]
      }
      await chai.request('http://localhost:3000')
        .post('/order')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
        })
    })
  })

  describe('When userId is invalid', () => {
    it('POST /order returns error', async () => {
      const payload = {
        "userId": 1,
        "items": ["1", "2"]
      }
      await chai.request('http://localhost:3000')
        .post('/order')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Invalid userId")
        })
    })
  })

  describe('When items field is invalid', () => {
    it('POST /order returns error', async () => {
      const payload = {
        "userId": "1",
        "items": "123"
      }
      await chai.request('http://localhost:3000')
        .post('/order')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Invalid items")
        })
    })
  })

  describe('When items field is empty', () => {
    it('POST /order returns error', async () => {
      const payload = {
        "userId": "1",
        "items": []
      }
      await chai.request('http://localhost:3000')
        .post('/order')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Items cannot be empty")
        })
    })
  })
})

describe('Post Review API', async () => {
  describe('When trying to post review for invalid order', () => {
    it('POST /order/review returns error', async () => {
      const payload = {
        "orderId": "1",
        "rating": 5,
        "comments": "Good food"
      }
      await chai.request('http://localhost:3000')
        .post('/order/review')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Invalid orderId")
        })
    })
  })

  describe('When trying to post review for the same order twice', () => {
    it('POST /order/review returns error', async () => {
      //create order 
      const orderpayload = {
        "userId": "1",
        "items": ["1", "2"]
      }
      const res = await chai.request('http://localhost:3000')
        .post('/order')
        .send(orderpayload)
      //submit review twice
      const payload = {
        "orderId": res.body.data.id,
        "rating": 5,
        "comments": "Good food"
      }
      await chai.request('http://localhost:3000')
        .post('/order/review')
        .send(payload)
      await chai.request('http://localhost:3000')
        .post('/order/review')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(400)
          expect(res.body.message).to.eql("Review already given")
        })
    })
  })

  describe('When valid data is provided', () => {
    it('POST /order/review returns successful response', async () => {
      const orderpayload = {
        "userId": "1",
        "items": ["1", "2"]
      }
      const res = await chai.request('http://localhost:3000')
        .post('/order')
        .send(orderpayload)
      const payload = {
        "orderId": res.body.data.id,
        "rating": 5,
        "comments": "Good food"
      }
      await chai.request('http://localhost:3000')
        .post('/order/review')
        .send(payload)
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
        })
    })
  })
})