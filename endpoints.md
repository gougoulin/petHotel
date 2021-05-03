# RESTful API's Endpoints

[/api/v2/users](#Users)

- [/](##/)
- [/:id](##/:id)
- [/me](##/me)

[/api/v2/customers](#customers)

# General Settings

"Content-Type": "application/json"

# Users

## /api/v2/users/

### GET

Request user list

1. Authorization. Token required. `Authorization: token token_str`

1. Request. No request body.

1. Response.

```json
// 200 success
// remember to delete sensitive information like password
{
  "users": [
    {
      "username": "bob",
      "email": "bob@gmail.com"
    }
  ]
}
```

### POST

Register a new user.

1. Authorization. Token required.
1. Request.

```json
// req.body
{
  "email": "bob@gmail.com",
  "password": "ABCabc123456"
}
```

1. Response.

```json
// 201 created
{
  "token": "token string"
}

// 400 bad request
{
    "errors": {
        "email": ["Must enter email", "Invalid email"],
        "password": ["Must enter password", "Must have at least 1 Uppercase, 1 lowercase, and more than 6 digits"]
    }
}

// 409 conflict
{
    "errors": {
        "email": ["already occupied"]
    }
}
```

## /login

1. Method: POST
2. No authorization required.
   - If token exist, log out that token ( put it into black list. Do this later )
3. Request

```json
// req.body
{
  "email": "bob@gmail.com",
  "password": "ABCabc123456"
}
```

4. Response

```json
// 201 created
{
  "token": "token string"
}
// 400 bad request
{
    "errors": {
        "body": ["empty body"],
        "email": ["error in email field"],
        "password": ["error in password field"]
    }
}

```

## /:id

1. GET
2. PUT
3. DELETE

## /me

1. Method. GET
1. Authorization.
1. Request.
1. Response.

# Customers

### GET
