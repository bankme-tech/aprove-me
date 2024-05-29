# API: `/integrations/payable`
Payable controller API implementation.
## Endpoints
### Payable

<details>
  <summary> 
    <code>POST</code> <code>/integrations/payable</code> <code><b>Create new payable</b></code> 
  </summary>

##### Body schema
> | Name            |  Type     |  Nullable |  Description                     |
> |-----------------|-----------|-----------|----------------------------------|
> | assignorId   |  UUID      |  required | Payable assignorId.                |
> | value        |  float     |  required | Payable value in float.            |
> | emissionDate |  ISOString |  required | Payable emissionDate.              |

###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/payable' \
--header 'Content-Type: application/json' \
--data '{
    "value":1.23,
    "emissionDate":"2024-05-27T20:57:00.000Z",
    "assignor":"d8f6d710-72da-4d4f-be1a-7485efde3b9e"
}'
```
###### Response
```json
{
    "id":"1b58ba33-1f42-4f36-86c5-1eff14ad1390",
    "value":1.23,
    "emissionDate":"2024-05-27T20:57:00.000Z",
    "assignorId":"d8f6d710-72da-4d4f-be1a-7485efde3b9e"
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>PATCH</code> <code>/integrations/payable</code> <code><b>Create new payable</b></code> 
  </summary>

##### Body schema
> | Name            |  Type     |  Nullable |  Description                     |
> |-----------------|-----------|-----------|----------------------------------|
> | assignorId   |  UUID      |  optional | Payable assignorId.                |
> | value        |  float     |  optional | Payable value in float.            |
> | emissionDate |  ISOString |  optional | Payable emissionDate.              |
###### Example cURL
```sh
curl 'http://localhost:3001/integrations/payable/{ID}' \
-X 'PATCH' \
--data-raw '{
  "value":1232.13,
  "assignor":"0954c16f-dfa6-4a89-8f8b-7c9ba9cc897f"
  "emissionDate":"2020-01-27T10:57:00.000Z",
}
```
###### Response
```json
{
    "id":"d4315e7d-6ee5-4c9f-8408-f37ee725520a",
    "value":123.45,
    "emissionDate":"2024-05-27T15:38:57.610Z",
    "assignorId":"0954c16f-dfa6-4a89-8f8b-7c9ba9cc897f"
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>GET</code> <code>/integrations/payable</code> <code><b>Get payables page</b></code> 
  </summary>

###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/payable' \
--header 'Content-Type: application/json'
```
###### Response
```json
{
   "items" : [
      {
         "assignorId" : "d8f6d710-72da-4d4f-be1a-7485efde3b9e",
         "emissionDate" : "2024-05-27T20:57:00.000Z",
         "id" : "1b58ba33-1f42-4f36-86c5-1eff14ad1390",
         "value" : 1.23
      },
      {
         "assignorId" : "d8f6d710-72da-4d4f-be1a-7485efde3b9e",
         "emissionDate" : "2024-05-27T20:57:00.000Z",
         "id" : "3f85b3b9-2d15-4920-abb7-5e4d6825581b",
         "value" : 1.23
      },
      {
         "assignorId" : "d8f6d710-72da-4d4f-be1a-7485efde3b9e",
         "emissionDate" : "2024-05-27T20:57:00.000Z",
         "id" : "57271467-3eeb-4c20-a42a-233e76bfbd10",
         "value" : 1.23
      },
      {
         "assignorId" : "0954c16f-dfa6-4a89-8f8b-7c9ba9cc897f",
         "emissionDate" : "2024-05-27T15:38:57.610Z",
         "id" : "d4315e7d-6ee5-4c9f-8408-f37ee725520a",
         "value" : 1232.13
      },
      {
         "assignorId" : "d8f6d710-72da-4d4f-be1a-7485efde3b9e",
         "emissionDate" : "2024-05-27T19:41:12.276Z",
         "id" : "ea4aec57-bf33-4499-9431-7bf4f46ef71b",
         "value" : 333.33
      }
   ],
   "itemsTotal" : 5,
   "pageTotal" : 1
}
```
</details>

--------------------------------------------------------------------------------

<details>
  <summary> 
    <code>POST</code> <code>/integrations/payable/batch</code> <code><b>Create batch of payables</b></code> 
  </summary>

Send batch of payables to RabbitMQ queue. The queue consumer will process and save them in the database.
##### Body schema
> | Name                    | Type              | Nullable | Description             |
> |-------------------------|-------------------|----------|-------------------------|
> | payables                | Array<PayableDto> | required | Payable array.          |
> | payables[].assignorId   | UUID              | required | Payable assignorId.     |
> | payables[].value        | float             | required | Payable value in float. |
> | payables[].emissionDate | ISOString         | required | Payable emissionDate.   |

###### Example cURL
```sh
curl --location 'http://localhost:3001/integrations/payable' \
--header 'Content-Type: application/json' \
--data '{
    "payables": [
        "value":1.23,
        "emissionDate":"2024-05-27T20:57:00.000Z",
        "assignor":"d8f6d710-72da-4d4f-be1a-7485efde3b9e"
    ]
}'
```

###### Response
```json
{
    "sent": true,
    "queueName": "q_payable_batch"
}
```
</details>
