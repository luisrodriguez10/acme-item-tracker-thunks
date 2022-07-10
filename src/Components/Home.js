import React from "react";
import { connect } from "react-redux";

const Home = ({ users, things, topRankedThing, topRankedUser }) => {
  const rankedThings = topRankedThing.reduce((accum, thing) => {
    if (thing.ranking === 1) {
      accum = false;
    }
    return accum;
  }, true);
  const rankedUsers = topRankedUser.reduce((accum, user) => {
    if (user.ranking === 5) {
      accum = false;
    }
    return accum;
  }, true);
  return (
    <div id="Home">
      <h1>Home</h1>
      <p className="HomeMsg">
        Here at the Acme Item Tracker Corp we have {users.length} users and{" "}
        {things.length} things!
      </p>
      <h2>Top Ranked</h2>
      <div id="Ranking">
        <section id="ThingRanking">
          <h3>Things</h3>
          {
            rankedThings ? 
            <table>
            <tbody>
              <tr>
                <th>Thing</th>
                <th>Ranking</th>
                <th>Owner</th>
              </tr>
              {
                topRankedThing.map(thing => {
                  const user = users.find(user => user.id === thing.userId);
                  return (
                    <tr key={thing.id}>
                      <td>{thing.name}</td>
                      <td>{thing.ranking}</td>
                      <td>{user ? user.name : 'No Owner'}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table> : <p>Things have not been ranked yet.</p>
          }
        </section>
        <section id="UserRanking">
          <h3>Users</h3>
          {
            rankedUsers ? 
            <table>
              <tbody>
                <tr>
                  <th>User</th>
                  <th>Ranking</th>
                  <th>Num of Things Owned</th>
                </tr>
                {
                  topRankedUser.map(user => {
                    const thingUserCount = things.filter(thing => thing.userId === user.id);
                    return (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.ranking}</td>
                        <td>{thingUserCount.length > 0 ? thingUserCount.length : 'No things'}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table> : <p>Users have not been ranked yet.</p>
          }
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const topRankThing = Math.max(...state.things.map((thing) => thing.ranking));
  const topRankedThing = state.things.filter(
    (thing) => thing.ranking === topRankThing
  );
  const topRankUser = Math.max(...state.users.map((user) => user.ranking));
  const topRankedUser = state.users.filter(
    (user) => user.ranking === topRankUser
  );
  return {
    users: state.users,
    things: state.things,
    topRankedThing,
    topRankedUser,
  };
};

export default connect(mapStateToProps)(Home);
