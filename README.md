
# API Store Web-App

<h2  align="center">StoreFront Project - Back-End Node and PostgresSQL App</h2>

<p  align="center">

<a  href="https://www.linkedin.com/in/mamdouh-morad/">

<img  alt="Follow Me on LinkedIn"  src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">

</a>


  
An API for an online Store to sell products using

The Application has been built using **Node.JS**, **TypeScript** and **PostgresSQL** to manage endpoints and database.



## Basic Info

* use ``npm install`` in root folder to install the project dependencies and modules

* use ``npm run build`` to build the JS files

* use ``npm run test`` to run Jasmine Test Suites

* use ``npm run start`` to get the project working and starting on ``localhost:3000``

* use ``npm run clean`` to clean up and delete the build files.

  
## DataBase Info

* username ``postgres``.
* password ``meow``.
* Dev-Database name store.
* Test-Database name store_test.
 {
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store",
      "user": "postgres",
      "password": "meow"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_test",
      "user": "postgres",
      "password": "meow"
    }
  }


## DATABASE Instructions to get it Ready  - Be Noted That Test-Database already gets created automatically with running Jasmine-Unit-Testing

*  CREATE USER postgres WITH PASSWORD 'meow';                    // Creates User with given name & password
*  CREATE DATABASE store;                                       // Creates Database
*  CREATE DATABASE store_test;                                 // Creates Database
*  \c store                                                   // Connects to Database
*  GRANT ALL PRIVILEGES ON DATABASE store TO postgres;       // Give Permissions to user
* \c store_test                                             // Connects to Database
* GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres; // Give Permissions to user



## Database Schema
* ``products`` CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, price INTEGER, category VARCHAR);
* ``users`` CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR, lastname VARCHAR, password VARCHAR);
* ``orders`` CREATE TABLE orders (id SERIAL PRIMARY KEY, status VARCHAR, user_id INTEGER REFERENCES users(id));
* ``orders_products``  CREATE TABLE orders_products (id SERIAL PRIMARY KEY, quantity INTEGER, order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id));

## ENV File
*  ``TEST_VAR`` = ``testing123``
*  ``POSTGRES_HOST`` = ``127.0.0.1``
*  `POSTGRES_DB` = ``store``
*  ``POSTGRES_USER`` = ``postgres``
*  ``POSTGRES_PASSWORD`` = ``meow``
*  ``POSTGRES_DB_TEST`` = ``store_test``
*  ``BCRYPT_PASSWORD`` = ``Sanji12Sherry12!``
*  ``SALT_ROUNDS`` = ``10``
*  ``TOKEN_SECRET`` = ``meow12meow12``
*  ``ENV`` = ``dev``


## Application Data

The Database schema are being stored and read from json files in the ``src`` Folder.

*  **Migration Configuration** are stored in the ``database.json`` file.

*  **Schema** can be found in details under the migration folder in the up/down files in ``migrations`` folder.

* To run all **Migration** files  ``db-migrate up:all`` or ``db-migrate down:all``
  

The Data Interfaces and Objects Structures are located in the ``src/models`` Folder.

* The **Product** Data interface is located in the ``products.ts``file.

* The **User** Interface is located in the ``users.ts`` file.

* The **Orders** Interface is located in the ``orders.ts`` file.

* The **Orders Products** Interface is located in the ``orders_products.ts`` file.

  

## Project Structure

The Application is built using set of **Models** and **Handlers** which handle the flow of data and UI-design.

The **Models and Handlers** are set into 4 different modules.

*  **Products** Module which handles Products CRUD Functions by being used in Handlers/Routers.

*  **Users** Module which handles Users CRUD Functions by being used in Handlers/Routers.

*  **Orders** Module which handles Orders CRUD Functions by being used in Handlers/Routers.

*  **Orders Products** Module which handles Orders-Products CRUD Functions by being used in Handlers/Routers.
  

The **Test Units** are made up of four modules.

*  **Products** Module which handles Products CRUD Functions.

*  **Users** Module which handles Users CRUD Functions.

*  **Orders** Module which handles Orders CRUD Functions.

*  **Orders Products** Module which handles Orders-Products CRUD Functions.


## Interface Properities and Functions

A table containing the properities and functions of each application data-object and Interface used in the website.

|                |Products                             | Users                               | 
|----------------|-------------------------------------|-------------------------------------|
|Elements        |`'ID, Name, Price, Category`         |`Firstname, Lastname, Password`      |
|Functions       |`Index, Show, Create, Update, Delete`|`Index, Show, Create, Update, Delete`|
|End Points     | ` /products`                         |`/users`                             |

|                |Orders                               | Orders Products                     |
|----------------|-------------------------------------|-------------------------------------|
|Elements        |`'ID, status, Order ID`              |`Quantity, Order ID, Product ID`     |
|Functions       |`Index, Show, Create, Update, Delete`|`Index, Show, Create, Update, Delete`|
|End Points      | `/orders`                           | `/orders/:id/products`              |




|                |        ``INDEX  - GET ``            |     ``SHOW   - GET``       |  ``CREATE - POST``      |  `` UPDATE - PUT ``       |   ``DELETE - DELETE``     |
|----------------|-------------------------------------|----------------------------|-------------------------|---------------------------|---------------------------|
|                |      ``/products ``                 |   ``/products/:id ``       |   ``/products``         |  ``/products/:id ``       |  ``/products/:id ``       |
|                |      ``/users ``                    |   ``/users/:id``           |   ``/users``            |  ``/users/:id``           |  ``/users/:id``           |
|                |      ``/orders ``                   |   ``/orders/:id``          |   ``/orders ``          |  ``/orders/:id``          |  ``/orders/:id``          |
|                |      ``/orders/:id/products``       | ``/orders/:id/products ``  | ``/orders/:id/products``|  ``/orders/:id/products`` |  ``/orders/:id/products`` |

  

## UML diagram

The Flow of User Experience and Interaction in the website.

  

```mermaid

graph LR

A[Create User]

A -->C

B[User Existing User]--> C{HomePage}
C --> D[Index]
C --> E[Show]
C --> F[Create]
C --> G[Update]
C --> H[Delete]

 K[Products]
 L[Users]
 M[Orders]
 N[Orders Products]


D --> K
D --> L
D --> M
D --> N

E --> K
E --> L
E --> M
E --> N

F --> K
F --> L
F --> M
F --> N

G --> K
G --> L
G --> M
G --> N

H --> K
H --> L
H --> M
H --> N
