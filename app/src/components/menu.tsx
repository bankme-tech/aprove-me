import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import './menu.css';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'orange',
    color: 'white',
    display: 'flex',
    justifyContent: 'center'
  },
  menuButton: {
    textDecoration: 'none',
    color: 'white',
    padding: '1em'
  }
});

const Menu: FC = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/list" className={classes.menuButton}>
        Pagáveis
      </Link>
      <Link to="/" className={classes.menuButton}>
        Cadastrar Pagáveis
      </Link>
      <Link to="/addAssignor" className={classes.menuButton}>
        Cadastrar Cedente
      </Link>
    </div>
  );
};

export default Menu;