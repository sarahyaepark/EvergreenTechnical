import React, { useState } from 'react';
import { css } from 'aphrodite';
import { useQuery } from '@apollo/client';
import { VendorList, DropdownFilter, SearchBox } from './components';
import customStyleSheet from './lib/customStyleSheet';
import evergreenIcon from './img/evergreen_icon.png';
import getImageUri from './utils/getImageUri';
import { GET_USER_QUERY } from './gql/gql';

const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    float: 'left',
  },
  container: {
    backgroundColor: color.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '1rem',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

function App() {
  const { data } = useQuery(GET_USER_QUERY, {
    variables: {
      id: 1,
    },
  });
  const user = data && data.user;

  const [filterBy, setFilter] = useState('');
  const [sortBy, setSort] = useState('');
  const [search, setSearch] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return user ? (
    <div className={css(styles.container)}>
      <img
        className={css(styles.logo)}
        src={getImageUri(evergreenIcon)}
        alt="logo"
      />
      <div className={css(styles.filterContainer)}>
        <SearchBox handleSearch={handleSearch} />
        <div className={css(styles.filter)}>
          <h4>Filter By:</h4>
          <DropdownFilter handleFilterChange={handleFilterChange} value1="Software" value2="Consulting, staffing, and professional services" value3="Other" />
          <h4>Sort By:</h4>
          <DropdownFilter handleFilterChange={handleSortChange} value1="Name" value2="Risk" value3="Status" />
        </div>
      </div>
      <br />
      <VendorList search={search} sortBy={sortBy} filterBy={filterBy} isAdmin={user.admin} />
    </div>
  ) : (
    <img
      alt="user loading"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
    />
  );
}

export default App;
