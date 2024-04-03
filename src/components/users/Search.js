import React, { useState, useContext, useEffect } from 'react';
import githubContext from '../../context/github/githubContext';
import { debounce } from 'lodash';

const Search = () => {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userHasTyped, setUserHasTyped] = useState(false); 

  const gc = useContext(githubContext);

  const validateInput = (inputValue) => {
    if (inputValue === '' && userHasTyped) {
      setErrorMessage('Search field cannot be empty');
    } else if (inputValue.length > 0 && inputValue.length < 2) {
      setErrorMessage('Please enter at least 2 characters');
    } else {
      setErrorMessage('');
    }
  };

  const onChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
    setUserHasTyped(true); 
  
    if (inputValue === '') {
      setErrorMessage('');
      gc.userClear(); 
    } else {
      validateInput(inputValue);
    }
  };

  const debouncedSearchUsers = debounce(() => {
    if (text && text.length >= 2) {
      gc.searchUsers(text);
    }
  }, 500);

  useEffect(() => {
    if (text.trim()) {
      debouncedSearchUsers();
    } else {
      validateInput(text.trim());
    }

    return () => {
      debouncedSearchUsers.cancel();
    };
  }, [text]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={text}
            onChange={onChange}
          />
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
      </form>
    </div>
  );
};

export default Search;
