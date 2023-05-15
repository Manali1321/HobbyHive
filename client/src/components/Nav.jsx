import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/admin">Admin</a>
        </li>
      </ul>
    );
  }
}
export default Nav;
