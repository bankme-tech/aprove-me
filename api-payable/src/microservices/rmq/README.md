# RabbitMQ module
Connect and run amqp queues. 

## Queues
### Name:`q_payable_batch`: Process payables batch
Queue that consume a batch of payable and store them in the database and if it errors three times the payable will send it to `dlq_payable_batch`.
#### Message body schema
> | Name                    | Type          | Description             |
> |-------------------------|---------------|-------------------------|
> | tryCount            | int               | Payable array.          |
> | data                | Array<PayableDto> | Payable array.          |
> | data[].assignorId   | UUID              | Payable assignorId.     |
> | data[].value        | float             | Payable value in float. |
> | data[].emissionDate | ISOString         | Payable emissionDate.   |

### Name: `dlq_payable_batch`: Payable dead letter queue.
Queue of payables that receives failed values and send an email to `ADMIN_TEAM_EMAIL` team.
