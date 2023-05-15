import React from "react";
import Nav from "./Nav";

class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Hobby Hive</h1>
          <Nav />
        </header>
      </div>
    );
  }
}
export default Header;
