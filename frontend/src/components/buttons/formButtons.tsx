import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type FormButtonsProps = {
  setId: (string: string) => void
  setValue: (string: number) => void
  setAssignor: (string: string) => void
  setEmissionDate: (string: string) => void
};
export default function FormButtons({ setId, setValue, setAssignor, setEmissionDate }: FormButtonsProps) {
  return (
    <Stack 
      spacing={1}
      direction="row"
      justifyContent={'space-around'}
      >
      <Button 
      type='submit'
      variant="contained"
      color='success'
      >
        Enviar
      </Button>
      <Button
        type='reset'
        variant="contained"
        color='error'
        onClick={ () => { setId(''); setValue(0); setAssignor(''); setEmissionDate(''); } }
      >
        Limpar
      </Button>
    </Stack>
  );
}