import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropdownFilter(props) {
  const {
    handleFilterChange, value1, value2, value3,
  } = props;
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Select
        onChange={handleFilterChange}
        displayEmpty
        defaultValue=""
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={value1}>{value1}</MenuItem>
        <MenuItem value={value2}>{value2}</MenuItem>
        <MenuItem value={value3}>{value3}</MenuItem>
      </Select>
    </FormControl>
  );
}

DropdownFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  value1: PropTypes.string.isRequired,
  value2: PropTypes.string.isRequired,
  value3: PropTypes.string.isRequired,
};
