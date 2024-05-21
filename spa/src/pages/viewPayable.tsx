import { useLocation } from 'react-router-dom';

export default function ViewPayable() {
  const location = useLocation();
  const res = location.state.res;
  console.log(res);

  return (
    <div>
      <h1>Detalhes do pagável :</h1>
    </div>
  )
}