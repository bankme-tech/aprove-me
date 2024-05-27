import { MoonLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div style={{width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <MoonLoader color="#0935C1" />
    </div>
  )
}
