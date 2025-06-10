## Week 2 Assignment

##  Overview
This project is a RESTful API built with Express.js to manage a list of products. It supports CRUD operations, filtering, pagination, search, and statistics, along with custom middleware for logging, authentication, validation, and error handling.



##  Project Structure
```

server.js
routes 
  └── productRoutes.js
middleware/
    ├── auth.js
    ├── errorHandler.js
    ├── logger.js
    └── validateProduct.js
.env.example
README.md
```



##  Setup Instructions

### Prerequisites
- Node.js v18 or higher

### Installation

git clone https://github.com/PLP-MERN-Stack-Developmentweek-2-express-js-assignment-ThamsanqaEmmanuel.git
cd week-2-express-js-assignment-ThamsanqaEmmanuel
npm install express


### Environment Variables
Create a `.env` file based on `.env.example`:
env
PORT=3000
API_KEY=12345


### Running the Server

node server.js

The server will run on `http://localhost:3000`



##  Using the API in Postman
For every request:
- Add a header: `x-api-key: 12345`

---

##  API Endpoints

### Root
- `GET /` → Welcome message

### Products
- `GET /api/products` → List all products
- Optional query parameters:
- `category` - filter by category
- `name` - search by name (partial)
- `page` and `limit` - for pagination

- `GET /api/products/:id` → Get product by ID
- `POST /api/products` → Create new product
- `PUT /api/products/:id` → Update product by ID
- `DELETE /api/products/:id` → Delete product by ID

### Stats
- `GET /api/products/stats` → Get product count by category

---

##  Example Requests

### Create Product (POST)
```
POST /api/products
Headers: { "x-api-key": "12345" }
Body:
{
  "name": "Mouse",
  "description": "Wireless mouse",
  "price": 25,
  "category": "electronics",
  "inStock": true
}
```

### Filter by Category (GET)
```
GET /api/products?category=electronics
```

### Paginate (GET)
```
GET /api/products?page=1&limit=2
```

### Product Stats (GET)
```
GET /api/products/stats
```

---

##  Submission Checklist
-  All project files included
-  Middleware: logger, auth, validation, errorHandler
-  API routes implemented
-  `.env.example` provided
-  `README.md` created with instructions & documentation

---

