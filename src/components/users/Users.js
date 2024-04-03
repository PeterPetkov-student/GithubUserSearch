import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import githubContext from '../../context/github/githubContext';

const Users = () => {
  const gc = useContext(githubContext);
  const { loading, users, searchPerformed } = gc;

  if (loading) {
    return <Spinner />;
  } else if (users.length === 0 && searchPerformed) {
    return <h4>No users found.</h4>;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
