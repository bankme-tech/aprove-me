# API: `/integrations/assignor`
Payable controller API implementation.
## Endpoints
### Assignor

<details>
  <summary> 
    <code>POST</code> <code>/integrations/assignor</code> <code><b>Create new assignor</b></code> 
  </summary>

##### Body schema
> | Name            | Type         | Nullable | Description                    |
> |-----------------|--------------|----------|--------------------------------|
> | email           | string email | required | Person email.                  |
> | name            | string       | required | Person name.                   |
> | document        | string       | required | Person document.               |
> | phone           | string       | required | Person phone.                  |
###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/assignor' \
--header 'Content-Type: application/json' \
--data '{
    "email": "devtest@email.com",
    "name": "dev-test",
    "document": "111.222.333-44",
    "phone": "+55 (21) 9 1111 4444"
}'
```
###### Response
```json
{
    "id":"50f773d0-dc36-45c5-99c6-4779ef681af5",
    "document":"111.222.333-44",
    "email":"devtest@email.com",
    "phone":"+55 (21) 9 1111 4444",
    "name":"dev-test"
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>PATCH</code> <code>/integrations/assignor</code> <code><b>Create new assignor</b></code> 
  </summary>

##### Body schema
> | Name            | Type         | Nullable | Description                    |
> |-----------------|--------------|----------|--------------------------------|
> | email           | string email | optional | Person email.                  |
> | name            | string       | optional | Person name.                   |
> | document        | string       | optional | Person document.               |
> | phone           | string       | optional | Person phone.                  |
###### Example cURL
```sh
curl -X 'PATCH' --location 'http://localhost:3001/integrations/assignor/{ID}' \
--header 'Content-Type: application/json' \
--data '{
    "email": "devtest@email.com",
    "name": "dev-test",
    "document": "111.222.333-44",
    "phone": "+55 (21) 9 1111 4444"
}'
```

###### Response
```json
{
    "id":"50f773d0-dc36-45c5-99c6-4779ef681af5",
    "document":"111.222.333-44",
    "email":"devtest@email.com",
    "phone":"+55 (21) 9 1111 4444",
    "name":"dev-test"
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>GET</code> <code>/integrations/assignor</code> <code><b>GET many</b></code> 
  </summary>

###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/assignor' \
--header 'Content-Type: application/json' 
```

###### Response
```json
{
   "assignors" : [
      {
         "id" : "0954c16f-dfa6-4a89-8f8b-7c9ba9cc897f",
         "document" : "12321",
         "email" : "asd@email.copm",
         "name" : "123213",
         "phone" : "2222"
      }
  ]
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>GET</code> <code>/integrations/assignor/:id</code> <code><b>GET by id</b></code> 
  </summary>

###### Example cURL
```sh
curl -X 'PATCH' --location 'http://localhost:3001/integrations/assignor/{ID}' \
--header 'Content-Type: application/json'
```

###### Response
```json
{
    "id":"50f773d0-dc36-45c5-99c6-4779ef681af5",
    "document":"111.222.333-44",
    "email":"devtest@email.com",
    "phone":"+55 (21) 9 1111 4444",
    "name":"dev-test"
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>DELETE</code> <code>/integrations/assignor/:id</code> <code><b>DELETE by id</b></code> 
  </summary>

###### Example cURL
```sh
curl -X 'DELETE' --location 'http://localhost:3001/integrations/assignor/{ID}' \
--header 'Content-Type: application/json'
```

###### Response
```json
{
    "id": "50f773d0-dc36-45c5-99c6-4779ef681af5",
    "document": "111.222.333-44",
    "email": "devtest@email.com",
    "phone": "+55 (21) 9 1111 4444",
    "name": "dev-test"
}
```
</details>

