import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function FormButtons() {
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
      >
        Limpar
      </Button>
    </Stack>
  );
}