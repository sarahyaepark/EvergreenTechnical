import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  GET_VENDORS_QUERY, GET_VENDORS_BY_CATEGORY, UPDATE_VENDOR_CATEGORY, UPDATE_VENDOR_STATUS,
} from '../gql/gql';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    width: '80%',
  },
  formControl: {
    maxWidth: '8rem',
  },
});

export const VendorList = (props) => {
  const {
    isAdmin, filterBy, sortBy, search,
  } = props;

  const { data, error, loading } = useQuery(GET_VENDORS_QUERY);
  const categoryQuery = useQuery(GET_VENDORS_BY_CATEGORY, { variables: { category: filterBy } });

  const [updateVendorCategory] = useMutation(UPDATE_VENDOR_CATEGORY);
  const [updateVendorStatus] = useMutation(UPDATE_VENDOR_STATUS);

  const [vendors, setVendors] = useState(false);

  const handleSelect = (event, operation, vendorId) => {
    if (operation === 'category') {
      updateVendorCategory({ variables: { vendorId: parseInt(vendorId), category: event.target.value } });
    }
    if (operation === 'status') {
      updateVendorStatus({ variables: { vendorId: parseInt(vendorId), status: event.target.value } });
    }
  };
  const classes = useStyles();
  useEffect(() => {
    if (!error && !loading) {
      setVendors(data.vendors);
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (!categoryQuery.error && !categoryQuery.loading && filterBy) {
      setVendors(categoryQuery.data.vendorsCategory);
    }
  }, [categoryQuery.data, categoryQuery.error, categoryQuery.loading, filterBy]);

  useEffect(() => {
    if (sortBy !== '') {
      let sorted;
      if (sortBy === 'Name') {
        sorted = [...vendors].sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sortBy === 'Risk') {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        sorted = [...vendors].sort((a, b) => priorityMap[a.risk] - priorityMap[b.risk]);
      }
      if (sortBy === 'Status') {
        sorted = [...vendors].sort((a, b) => a.status - b.status);
      }
      setVendors(sorted);
    }
  }, [sortBy]);

  useEffect(() => {
    if (data) {
      const currentLength = search.length;
      const currentMatches = [];

      data.vendors.map((currVendor) => {
        const sub = currVendor.name.substring(0, currentLength).toLowerCase();
        if (sub === (search).toLowerCase()) currentMatches.push(currVendor);
      });
      setVendors(currentMatches);
    }
  }, [search]);

  return vendors ? (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vendor Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Risk</TableCell>
          </TableRow>
        </TableHead>
        {isAdmin ? (
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell component="th" scope="row">
                  <a href={vendor.externalLink} rel="noreferrer" target="_blank">{vendor.name}</a>
                </TableCell>
                <TableCell align="left">{vendor.description}</TableCell>
                <TableCell align="left">
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      defaultValue={vendor.category}
                      onChange={(e) => handleSelect(e, 'category', vendor.id)}
                    >
                      <MenuItem value="Consulting, staffing, and professional services">Consulting, staffing, and professional services</MenuItem>
                      <MenuItem value="Software">Software</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="left">
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      defaultValue={vendor.status}
                      onChange={(e) => handleSelect(e, 'status', vendor.id)}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="left">{vendor.risk}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )
          : (
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell component="th" scope="row">
                    <a href={vendor.externalLink} rel="noreferrer" target="_blank">{vendor.name}</a>
                  </TableCell>
                  <TableCell align="left">{vendor.description}</TableCell>
                  <TableCell align="left">{vendor.category}</TableCell>
                  <TableCell align="left">{vendor.status}</TableCell>
                  <TableCell align="left">{vendor.risk}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

      </Table>
    </TableContainer>
  ) : (
    <img
      alt="vendors loading"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
    />
  );
};

export default VendorList;

VendorList.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  filterBy: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
