## Installation

```
npm install
```

## Running the server

```
npm start
```
Server runs on port 3000. You can access it via http://localhost:3000.

## Testing

```
npm test
```
It uses an in-memory data store to run tests so you don't need to have any database up and running.

## Code Coverage

```
npm run coverage
```

## Folder structure
```


└ src                                     → Application modules
    └ order                               → services, routes, controllers for RESTful APIs
        └ order.controller.js             → Route controllers
        └ order.service.js.               → Handles core business logic
        └ order.routes.js.                → Route definitions
        └ order.store.js.                 → Handles In-memory data store
└ test                    
    └ order.test.js                       → Contains all test cases to be executed
└ utils                    
    └ errorhandler.js                     → Handles errors for the whole application
└ app.js                                  → API declaration
└ bin                  
    └ www                                 → Server definition (port, protocol etc)
└ config                                  → Contains all the configuration files 
    └ data.json                           → Sample data to be loaded at the time of starting the server
└ middleware                   
    └ validator.js                        → Input validations for all the RESTful APIs
└ package.json                            → Holds metadata and project dependencies
 ```
 
## Assumptions

1. Data is not persisted anywhere. Sample restaurant menu is loaded from config/data.json at the time of starting the server. All the orders data will be stored in-memory and lost after stopping the server.
2. Item quantities and currency aren't taken into consideration to keep things simple

## API Details

### Fetch restaurant menu

```
GET /menu

response {
    "success": true,
    "data": [
        {
            "id": "1",
            "name": "Item1",
            "amount": 30
        },
        {
            "id": "2",
            "name": "Item2",
            "amount": 20
        },
        {
            "id": "3",
            "name": "Item3",
            "amount": 50
        }
    ]
}
```

### Placing an order

```
POST /order

body {
    "userId": "1",
    "items": ["2", "1"]
}

response {
    "success": true,
    "data": {
        "id": "ec65ff2c-bdf6-4da4-92ab-86621b5562e5",
        "userId": "1",
        "amount": 50,
        "items": [
            "2",
            "1"
        ],
        "date": "2021-07-14T07:58:41.737Z"
    }
}
```

### Posting a review for an order

```
POST /order/review

body {
    "orderId": "507dca12-729a-4067-9639-eec7cfaaf75d",
    "rating": 4,
    "comments": "Food is awesome"
}

response {
    "success": true,
    "data": {
        "id": "25d51c57-8e97-4f10-a8b9-01fd5653dac5",
        "userId": "1",
        "amount": 80,
        "items": [
            "3",
            "1"
        ],
        "date": "2021-07-14T07:40:51.068Z",
        "rating": 4,
        "comments": "abcd"
    }
}
```