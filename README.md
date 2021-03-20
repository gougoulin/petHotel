# petHotel

This project is a web application (React &amp; NodeJS) for an unreal pet hotel. Employees use this app to manage the daily business of the hotel. See readme for details.

## Requirements

1. customer use their email and password to log in and sign in their pets
2. after login, the customer can choose which pet to sign in to. When signed in to the pet, the customer will log out automatically
3. when customers picked up their pets, they log in to the system. The app must show which pets are in the centre, so customers can sign off the pets. Done

Employee

1. register new customers
2. employees must have their email and password (user) to log in
3. employees can CRUD customers
4. check pets in the pet centre

Admin

1. register employee, CRUD employees
2. NOT operate customers directly

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
