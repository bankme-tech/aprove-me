import { Landmark } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { Container, Foot, Head, OutletDiv, Painel } from './styles'

export const AuthLayout = () => {
  return (
    <Container>
      <Painel>
        <Head>
          <Landmark />
          <span>aprove.me</span>
        </Head>

        <Foot>&copy; aprove.me - {new Date().getFullYear()}</Foot>
      </Painel>

      <OutletDiv>
        <Outlet />
      </OutletDiv>
    </Container>
  )
}
