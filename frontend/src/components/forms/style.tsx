import styled from 'styled-components';

export const FormLoginStyle = styled.form`
  background-color: var(--bg-form-color);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  gap: 1rem;

  p {
    color: var(--p-color);
    text-align: center;
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 1rem;
    color: var(--text-form-color);
  }

  input {
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    color: var(--text-form-color);
    padding: 0.5rem;

    &:focus {
      outline: 1px solid var(--input-outline-color);
    }
  }
`;

export const MsgContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 76vh;
  left: 0;
`;

export const MsgErrorContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 76vh;
  left: 0;

  p {
    color: var(--error-color);
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  margin-top: 1rem;
  margin-bottom: 0;
  height: 100%;

  a {
    color: var(--link-color);
    text-decoration: none;
    font-size: 0.9rem;
  }
`;