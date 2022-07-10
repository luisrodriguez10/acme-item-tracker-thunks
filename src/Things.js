import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import { deleteThing, updateThing } from './store';

const Things = ({ things, users, deleteThing, increment, updateThing })=> {
  return (
    <div id='Things'>
      <h1>Welcome to the Things Page</h1>
      <ThingForm />
      <table>
        <tbody>
          <tr>
            <th>Thing</th>
            <th>Current Owner</th>
            <th>Ranking</th>
            <th>Increase/Decrease Ranking</th>
            <th>Change Owner</th>
            <th>Delete</th>
          </tr>
          {
            things.map(thing => {
              const user = users.find(user => user.id === thing.userId) || {};
              return(
                <tr key={thing.id}>
                  <td>{ thing.name }</td>
                  <td>{ user.name || 'nobody' }</td>
                  <td>{ thing.ranking }</td>
                  <td><button onClick={()=> increment(thing, -1)} disabled={thing.ranking < 2}>-</button><button onClick={()=> increment(thing, 1)}>+</button></td>
                  <td>
                  <select defaultValue={ thing.userId } onChange={ ev => updateThing(thing, ev.target.value )}>
                    <option value=''>-- nobody --</option>
                    {
                      users.map( user => {
                        return (
                          <option key={ user.id } value={ user.id }>{ user.name }</option>
                        );
                      })
                    }
                  </select>
                  </td>
                  <td><button onClick={ ()=> deleteThing(thing)}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  (state)=> {
    return {
      things: state.things,
      users: state.users
    }
  },
  (dispatch)=> {
    return {
      updateThing: (thing, userId)=> {
        thing = {...thing, userId: userId * 1 };
        dispatch(updateThing(thing));
      },
      increment: (thing, dir)=> {
        thing = {...thing, ranking: thing.ranking + dir};
        dispatch(updateThing(thing));
      },
      deleteThing: (thing)=> {
        dispatch(deleteThing(thing));
      }
    };

  }
)(Things);
