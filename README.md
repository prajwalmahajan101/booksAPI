# BooksAPI
Books API for Managing Books

## **Tech Stack :**  
- NodeJs
- Express  
- Prisma (ORM)
- MongoDB (Atlas)
## **API Doc :**

### ***Create Book Record***:
- Method: POST
- Path: /v1/books/
- body:
  - Type: Json
  - data:
    - **title**: Required, String, minimum length - 5 , maximum length - 256
    - **author**: Required,String, minimum length - 5 , maximum length - 256, ***if more than one author separate there names with comma in the same string***
    -  **summary**: Optional,String, minimum length - 0, maximum length - 512
### ***Get All Books***:
  - Method : GET
  - Path: /v1/books/
### ***Get Book by Id***:
- Method : GET
- Path: /v1/books/:id
- params: 
  - **id**: ObjectId for the Book 
### ***Update a Book Details***:
- Method : PATCH
- Path: /v1/books/:id
- params: 
    - **id**: ObjectId for the Book
- body:
- Type: Json
- data:
    - **title**: Optional, String, minimum length - 5 , maximum length - 256
    - **author**: Optional,String, minimum length - 5 , maximum length - 256, ***if more than one author separate there names with comma in the same string***
    -  **summary**: Optional,String, minimum length - 0, maximum length - 512 
### ***Delete a Book***:
- Method: DELETE
- Path: /v1/books/:id
- params:
  - **id**: ObjectId for the Book 

## **Deployment on AWS - EC2 :**
- Launch EC2 Instance using Ubuntu AMI
- Install node:20 
  ```sudo snap install node --classic```
- Install nginx   
  ``` sudo apt update          ```   
  ```sudo apt install nginx -y ``` 
- Install pm2
  ```npm i -g pm2```
- Clone git repo
- Add .env file to root of the project with two variables  
  ``` DATABASE_URL, PORT=8000 ```
- Run Following commands
  - ```cd into/Project/root```
  - ```npm i```
  - ```npx prisma generate```
  - ```npm run build``` 
  - ```pm2 start 'npm run start'```
- Reverse proxy
  - ```cd /etc/nginx/enabled-sites```
  - ```sudo nano default```
  - change in location / block
  - comment the try and replace
  - ```proxy_pass http://api:8000/;```
  - save and restart nginx ```sudo systemctl restart nginx```