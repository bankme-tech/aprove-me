import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: repeat(2, 1fr);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`
export const Painel = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme['gray-600']};
  color: ${({ theme }) => theme['gray-100']};

  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgba(0, 0, 0, 0.05);
`

export const Head = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;

  font-weight: 500;

  > svg {
    height: 1.25rem /* 20px */;
    width: 1.25rem /* 20px */;
  }

  > span {
    font-weight: 600;
  }
`

export const Foot = styled.footer`
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
`

export const OutletDiv = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`
