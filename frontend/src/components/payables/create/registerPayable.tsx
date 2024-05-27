import { useState } from 'react'
import { RegisterPayable } from '../../forms/payables/RegisterPayable'
import { Container } from './style'
import { TPayable } from '../../../types/PayableType'

export const CreatePayable = () => {
  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const [assignor, setAssignor] = useState('')
  const [emissionDate, setEmissionDate] = useState('')

  const handleSubmit = (payable: TPayable) => {
    console.log(payable)
  }
  return (
    <Container>
      <div>
        <RegisterPayable
          id={ id }
          setId={ setId }
          value={ value }
          setValue={ setValue }
          assignor={ assignor }
          setAssignor={ setAssignor }
          emissionDate={ emissionDate }
          setEmissionDate={ setEmissionDate }
          handleSubmit={ handleSubmit }
        />
      </div>
    </Container>
  )
}