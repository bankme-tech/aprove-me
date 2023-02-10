import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface Assignor {
  document: string;
  email: string;
  name: string;
  phone: string;
}

interface Props {
  assignors: Assignor[];
  onChange: (value: string) => void;
}

const Combobox: React.FC<Props> = ({ assignors, onChange }) => {
  const classes = useStyles();
  const [selectedAssignor, setSelectedAssignor] = useState<string>('');

  useEffect(() => {
    onChange(selectedAssignor);
  }, [selectedAssignor, onChange]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="assignor-label">Assignor</InputLabel>
      <Select
        labelId="assignor-label"
        id="assignor"
        value={selectedAssignor}
        onChange={(event) => setSelectedAssignor(event.target.value as string)}
      >
        {assignors.map((assignor) => (
          <MenuItem key={assignor.document} value={assignor.document}>
            {assignor.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Combobox;