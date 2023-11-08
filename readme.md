# Project Documentation: E-Commerce Backend
1. **Introduction:**
-   Overview: Project E-commerce is a backend system designed for seamless management of product listings, customer orders, and inventory.
-   Technologies: **Node js**, **Express js**, **Mysql**, **Sequelize**.

2. **Project Setup :**
- Please create a mysql databse with name `shopping`.
- The Database should run on port 3306.
- Please open terminal on the project root folder and download all the dependencies with `npm i` command.
-  Next run `npm run start` this command.
- Now you can access all apis from `http://localhost:4000/api-docs`

3. **System Architecture :**
- MySQL used for data storage, with Hibernate as the ORM.
![Database Design](/public/image.png)
This is overall database design of this project.

4. **Database Schema:**
-   Entities: Users, Orders, Carts, Categories, Products
-   Relationships: One-to-many between Products and Categories, Many-to-many between Carts and Products, One-to-many between Users and Orders, One-to-many between Users and Carts.

5. **API Documentation**
-   Utilizes Swagger for clear API documentation.