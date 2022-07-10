import React from "react";
import { connect } from "react-redux";
import {removeThingFromUser, deleteUser, updateRanking } from "./store";
import UserForm from "./UserForm";

const Users = ({
  users,
  deleteUser,
  things,
  removeThingFromUser,
  updateRanking,
}) => {
  return (
    <div id="Users">
      <h1>Welcome to the Users Page</h1>
      <UserForm/>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Ranking</th>
            <th>Increase/Decrease User Ranking</th>
            <th>Owned Things</th>
            <th>Delete</th>
          </tr>
          {users.map((user) => {
            const userThings = things.filter(
              (thing) => thing.userId === user.id
            );
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.ranking}</td>
                <td>
                  <button onClick={() => updateRanking(user, -1)} disabled={user.ranking < 6}>-</button>
                  <button onClick={() => updateRanking(user, 1)}>+</button>
                </td>
                <td>
                  {userThings.length > 0 ? (
                    <ul>
                      {userThings.map((thing) => {
                        return (
                          <li key={thing.id}>
                            {thing.name} ({thing.ranking})
                            <button onClick={() => removeThingFromUser(thing)}>
                              x
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="thing">No things owned</p>
                  )}
                </td>
                <td>
                  <button onClick={() => deleteUser(user)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    things: state.things,
  };
};

const mapDispatch = (dispatch) => {
  return {
    removeThingFromUser: (thing) => {
      thing = { ...thing, userId: null };
      dispatch(removeThingFromUser(thing));
    },
    deleteUser: (user) => {
      dispatch(deleteUser(user));
    },
    updateRanking: (user, rank) =>{
      user = {...user, ranking: user.ranking + rank}
      dispatch(updateRanking(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatch)(Users);
