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