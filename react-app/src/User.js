import React from 'react';
class User extends React.Component {
  render() {
    const userName = 'zyp'
    return (
      <div className="game-user">
        {userName}
      </div>
    )
  }
}
export default User
