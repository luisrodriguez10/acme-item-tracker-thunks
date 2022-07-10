import React from 'react';
import { connect } from 'react-redux';
import {createUser} from './store';

const UserForm = ({ createUser })=> {
  return (
    <div id='CreateUser'>
      <button onClick={ createUser }>Add User</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createUser: ()=> {
      dispatch(createUser());
    }
  };
}

export default connect(null, mapDispatchToProps)(UserForm);
