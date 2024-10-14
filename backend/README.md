# Getting Started with backend

## Installation

Enter the backend folder

```bash
cd backend
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm run dev`

- Runs the app with nodemon

`Listening on: http://localhost:3001`

`connected to MongoDb!`

## Available Routes

Here you can find API addresses that the backend will respond to as well as what should be sent to them in the body of the HTTP request and what permissions are required to receive a response from a specific API

### Users API

#### Users end points

| no. | URL             | method  | Authorization  | action                   | notice       | returen        |
| --- | --------------- | ------- | -------------- | ------------------------ | ------------ | -------------- |
| 01. | /user/register  | POST    |                | register user            | Unique email |                |
| 02. | /user/login     | POST    |                | login                    |              | Encrypt token  |
| 03. | /user/my-orders | GET     | all            | Get my orders            |              | Array of items |

#### API for Register a new user

```http
  POST /api/user/register
```

#### Request

| index      | type    |  remark   |
| ---------- | ------- | --------- |
| firstName  | string  | required  |
| lastName   | string  | required  |
| email      | string  | required  |
| password   | string  | required  |

#### API for Login a user

```http
  POST /api/user/login
```

### Request

| index    | type   | remark   |
| -------- | ------ | -------- |
| email    | string | required |
| password | string | required |


#### API for my orders

```http
  GET /api/user/my-orders
```

### Request

| index       | type     | index        | type     | ref       | remark   |
| ----------- | -------- | ------------ |--------- | --------- | -------- |
| userId      | ObjectId |              |          | "User"    | required |
| orderItems  | object   |              |          |           |          |
|             |          | productTitle | string   |           | required |
|             |          | productImage | string   |           | required |
|             |          | unitPrice    | number   |           | required |
|             |          | quantity     | number   |           | required |
| total       | number   |              |          |           | required |
| address     | string   |              |          |           | required |

### Cart API

#### Cart end points

| no. | URL                    | method  | action              | returen      |
| --- | ---------------------- | ------- | ------------------- | ------------ |
| 01. | /cart/                 | GET     | all                 | All carts    |
| 02. | /cart/                 | DELETE  | Clear cart          | Emptry cart  |
| 03. | /cart/items            | POST    | Add item to cart    | Add cart     |
| 04. | /cart/items            | PUT     | Update item in cart | Update cart  |
| 05. | /cart/items/:productId | DELETE  | Delete card         | Deleted card |
| 05. | /cart/checkout         | POST    | Checkout            |              |

#### API to get all cards

```http
  GET /api/cart/
```

#### API for clear carts

```http
  DELETE /api/cart/
```

#### API for adding item to cart

```http
  POST /api/cart/items
```

#### API for updating item in cart

```http
  PUT /api/cart/items
```

#### API for deleting cart

```http
  DELETE /api/cart/items/:productId
```

#### API for checkout

```http
  POST /api/cart/checkout
```

### Request

| index       | type     | index     | type     | ref       | remark   |
| ----------- | -------- | --------- |--------- | --------- | -------- |
| userId      | ObjectId |           |          | "User"    | required |
| items       | object   |           |          |           |          |
|             |          | product   | ObjectId | "Product" | required |
|             |          | unitPrice | number   |           | required |
|             |          | quantity  | number   |           | required |
| totalAmount | number   |           |          |           | required |
| status      | string   |           |          |           | required |

### Product API

#### Product end points

| no. | URL        | method | Authorization | action                | notice | returen        |
| --- | ---------- | ------ | ------------- | --------------------- | ------ | -------------- |
| 01. | /product/  | GET    | All products  | Seed inital products  |        | Array of items |

#### API for product

```http
  POST /api/product/
```

#### Request

| index | type    |  remark   |
| ----- | ------- | --------- |
| title | string  | required  |
| image | string  | required  |
| price | number  | required  |
| stock | number  | required  |
