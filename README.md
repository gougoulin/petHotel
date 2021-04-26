# petHotel

This project is a back-end web application (React &amp; NodeJS) for an unreal pet hotel. Employees of the petHotel use this app to manage the daily business of the hotel.

## Requirements

1. A customer uses his email and password to log in
2. after logging in, the customer will be directed the dashboard page
3. The dashboard page shows the pets of the customer
4. Any pets can be signed in / signed out
5. Should make sure the customer will log out after signing in the pet/pets
6. when customers picked up their pets, they log in to the system. The app must show which pets are in the centre, so customers can sign off the pets. Done

Employee

1. register new customers
2. employees must have their email and password (user) to log in
3. employees can CRUD customers
4. check pets in the pet centre

Admin

1. register employee, CRUD employees
2. NOT operate customers directly

## Parts could be improved

1. At the beginning, the authority and user are designed as Many-to-Many relation to practice Sequelize. In fact, it is a Many-to-One relation.
2. A PaymentEmployee table was implemented, which it is not used.

## Stack

### Front End

- React
- Create-react-app
- redux
- react-router
- react-redux
- react-thunk

### Back End

- NodeJS
- Library: Express
- Database: MySQL
- ORM: Sequelize
- sequelize-cli
- dotenv
- logger: winston
- express-winston

### Tools

- Version control: Git, Github
- nodemon

## Entity Relational Diagram

### User

Attributes

1. email, char(255)
2. password

### Customer

1. firstName
2. lastName
3. email
4. mobile
5. address
