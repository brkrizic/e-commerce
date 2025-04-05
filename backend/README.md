REGISTER USER: POST http://localhost:3001/api/v1/users/register BODY: {"fullname": "john doe", "email": "john@email.com", "password": "123"}
LOGIN USER: POST http://localhost:3001/api/v1/users/login BODY: {"email": "john@email.com", "password": "123"}

CREATE PRODUCT: POST http://localhost:3001/api/v1/products BODY: {"name": "iphone", "description": "some item", "category": "cat1", "images": file: form-data, "price": 53.23}
GET ALL PRODUCTS: GET http://localhost:3001/api/v1/products
GET PRODUCT BY ID: GET http://localhost:3001/api/v1/products/{id}
UPDATE PRODUCT: PUT http://localhost:3001/api/v1/products/{id} BODY: {"name": "iphone", "description": "some item", "category": "cat1", "images": file: form-data, "price": 53.23}
DELETE PRODUCT: DELETE http://localhost:3001/api/v1/products/{id}

*******************************************************************************************************************
#PORT
PORT="3001"

#Database Configuration
DB_HOST=192.168.1.254
DB_PORT=27017
DB_USER=devo
DB_PASSWORD=Pn8TtdA5%40
DB_DATABASE=admin

#Secrets
PEPPER=^pD~<R/=GEtVmBKf&+qsiuHl$6|JNZ*wc!bYnjzI3xQ4PFC?2UW-:MdaT
JWT_KEY=sfFKDesasf
