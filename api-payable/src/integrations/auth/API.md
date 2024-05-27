# API: `/integrations/auth`
Auth controller API implementation.
## Endpoints
### Assignor

<details>
  <summary> 
    <code>POST</code> <code>/integrations/auth</code> <code><b>Create new login</b></code> 
  </summary>

##### Body schema
> | Name            | Type         | Nullable | Description                    |
> |-----------------|--------------|----------|--------------------------------|
> | login           | string       | required | User login.                    |
> | password        | string       | required | User password.                 |
###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/auth' \
--header 'Content-Type: application/json' \
--data '{
    "login": "devtest@email.com",
    "password": "dev-test"
}'
```
###### Response
```json
{
    "id":"1eece5b0-6469-4e3c-a0a5-7d5c1652182f",
    "login":"devtest@email.com"
}
```
  </details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>POST</code> <code>/integrations/auth/login</code> <code><b>Login user with credentials</b></code> 
  </summary>

##### Body schema
> | Name            | Type         | Nullable | Description                    |
> |-----------------|--------------|----------|--------------------------------|
> | login           | string       | required | User login.                    |
> | password        | string       | required | User password.                 |
###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "login": "devtest@email.com",
    "password": "dev-test"
}'
```
###### Response
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlZWNlNWIwLTY0NjktNGUzYy1hMGE1LTdkNWMxNjUyMTgyZiIsImxvZ2luIjoiZGV2dGVzdEBlbWFpbC5jb20iLCJpYXQiOjE3MTY4NDI2OTAsImV4cCI6MTcxNjg0Mjc1MH0.YTRsOasv2fCwWBlY9Xkn1wElY24lejB6wTwAHeswk1s"
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>GET</code> <code>/integrations/auth/token</code> <code><b>Get user data in token</b></code> 

  </summary>

##### Header schema
> | Name            | Type              | Nullable | Description                    |
> |-----------------|-------------------|----------|--------------------------------|
> | authorization   | `Bearer ${string}`| required | Login token.                   |
###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/auth/token' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3ODM5ZmQxLTIzZjQtNGY2OS05Y2JiLWNhYjhhMDgyMWYwMyIsImxvZ2luIjoibXlfbG9naW4iLCJpYXQiOjE3MTY4NDI4NjcsImV4cCI6MTcxNjg0MjkyN30.Jp51DfcI8W6yod0bRu0OnYpPeADXlRFWW0ktO3ZKK48' 
```
###### Response
```json
{
    "user": {
        "id": "47839fd1-23f4-4f69-9cbb-cab8a0821f03",
        "login": "my_login",
        "iat": 1716842973,
        "exp": 1716843033
    }
}
```
</details>

--------------------------------------------------------------------------------

