# BooksAPI
Books API for Managing Books  
You Can find [Hosted Demo App](http://54.66.167.82)  
You Can find the [Video Demo for App and Deployment](https://vimeo.com/882851798?share=copy#t=0) 
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
- Launch EC2 Instance using Amazon AMI
- ```sudo su -```
- Install node:20  
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash   
. ~/.nvm/nvm.sh  
nvm install 20
```
- Install nginx and git   
```
yum update             
yum install nginx -y  
yum install git -y
``` 
- Install pm2
  ```npm i -g pm2```
- Clone git repo
- Add .env file to root of the project with two variables  
```
DATABASE_URL=?? 
PORT=8080
```
- Run Following commands
```
cd into/Project/root
npm i
npx prisma generate
npm run build 
pm2 start 'dist/app.js'
```
- Reverse proxy
```
cd /etc/nginx/conf.d
nano default.conf
```
  - Add paste following 
  ```
  server { 
    listen 80; 
    location / { 
      proxy_pass http://localhost:8080/; 
    } 
  } 
  ```
  - save and restart nginx ```systemctl restart nginx```