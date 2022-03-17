# nodejs-backend-test

### Project details

This example test uses [@hapi](https://hapi.dev) as a basic REST
framework. You don't need to use Hapi, if you feel it might save you
time you can switch to anything you'd like (even GraphQL), but out of
the interest of saving **you** time, we've bootstrapped the project and
some REST calls.

### Instructions

- Test instructions will be sent to you over email, please read them
  carefully.
- Please click `Use This Template` in the GitHub repo to get started.
- This template is a suggestion, feel free to ignore, rewrite, or install favourite packages as you see fit.
- Try to make small commits at least every 20 minutes, so we can track progress.
- Please stop before 2 hours and make a final commit if you run out of time
- We expect all tests to always be run-able (something is displayed after npm start) state, but don't necessarily expect you to finish.
- For hints on possible best practices see:
  [Best Practices](./best_practices.md)

## Getting started

Ensure you're using NodeJS >=14 (14 is that's what we target in AWS)

```
npm install
npm start
curl localhost:3000/store
```

The server will start under
[http://localhost:3000](http://localhost:3000)

## Note : Please use postman to check endpoints and post Data

## as a test implemented required parts

check in postman
1.to see existing carts
http://localhost:3000/carts

2. to see a cart if no id provided creates a Cart
   GET http://localhost:3000/cart

Response:
Create cart id: 36407962-3e86-470a-b190-ab02367dbb52

3.  if cart id there
    GET http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52
    Response: []

4.  User must be able to add a product to the cart
    POST a item to that cartid http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52
    a.
    BODY: {

                        "items":[  {
                                    "name": "Sledgehammer",
                                    "price": 125.76,
                                    "qty": 2

                                }
                                ]
                    }

                    Response : [
            {
                "id": "36407962-3e86-470a-b190-ab02367dbb52",
                "items": [
                    {
                        "name": "Sledgehammer",
                        "price": 125.76,
                        "qty": 2
                    }
                ],
                "cartTotal": 251.52
            }

        ]

            b. no BODY
            Response: first add Items to the Cart



           c. check GET http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52
            you will see prev added items in cart

                       [
        {
            "id": "36407962-3e86-470a-b190-ab02367dbb52",
            "items": [
                {
                    "name": "Sledgehammer",
                    "price": 125.76,
                    "qty": 2
                }
            ],
            "cartTotal": 251.52
        }

    ]

            d. add more items to this cart observe we had Sledgehammer already 2 qty in existing cart
            POST http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52
            BODY: {

                        "items":[  {
                                    "name": "Sledgehammer",
                                    "price": 125.76,
                                    "qty": 1

                                },
                                {
                                    "name": "Axe",
                                    "price": 190.51,
                                    "qty": 2,
                                    "totalPrice": 381.02
                                }
                                ]
                    }

                    now the  check the Response

                   [
        {
            "id": "36407962-3e86-470a-b190-ab02367dbb52",
            "items": [
                {
                    "name": "Sledgehammer",
                    "price": 125.76,
                    "qty": 3
                },
                {
                    "name": "Axe",
                    "price": 190.51,
                    "qty": 2
                }
            ],
            "cartTotal": 758.30
        }

    ]

            e. let say if adding items individually adding chisel 2 times as a single qty it will adds and add to existing cart items

                    User must be able to add a product to the cart
                    http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52

                                BODY: {

                                    "items":[  {
                                                "name": "Chisel",
                                                "price": 13.99,
                                                "qty": 1
                                            },
                                            {
                                                "name": "Chisel",
                                                "price": 13.99,
                                                "qty": 1
                                            },
                                            {
                                                "name": "Hacksaw",
                                                "price": 19.45,
                                                "qty": 1
                                            },
                                            {
                                                "name": "Axe",
                                                "price": 190.51,
                                                "qty": 2
                                            }
                                            ]
                                }

                                Response: [
                        {
                            "id": "36407962-3e86-470a-b190-ab02367dbb52",
                            "items": [
                                {
                                    "name": "Sledgehammer",
                                    "price": 125.76,
                                    "qty": 3
                                },
                                {
                                    "name": "Axe",
                                    "price": 190.51,
                                    "qty": 4
                                },
                                {
                                    "name": "Chisel",
                                    "price": 13.99,
                                    "qty": 2
                                },
                                {
                                    "name": "Hacksaw",
                                    "price": 19.45,
                                    "qty": 1
                                }
                            ],
                            "cartTotal": 1186.75
                        }

5.  check above User must be able to view the price total of the cart. (Total price of cart items) and All prices should be rounded to 2 decimal places
    ]

6.  lets delete by a cartid

    DELETE http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52

    Response: deleted cart 36407962-3e86-470a-b190-ab02367dbb52

    GET http://localhost:3000/cart/36407962-3e86-470a-b190-ab02367dbb52
    Response: []

7.  http://localhost:3000/carts implemented to see all carts

## Delivery Notes

- Please send a public link to your GitHub repository over email.
- Please put clear instructions on how to run your code into this `README.md`.

Thank you for investing this time and effort, we will get back to you on the results as soon as possible!

Have fun...
