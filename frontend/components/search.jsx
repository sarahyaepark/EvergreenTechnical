import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function SearchField(props) {
  const classes = useStyles();
  const { handleSearch } = props;
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Search by vendor name"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />
    </form>
  );
}

SearchField.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
