import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <div>
      <header className="flex items-center justify-between bg-gray-200 px-4 py-2">
        <h1 className="text-xl font-bold">Hobby Hive</h1>
        <Nav />
      </header>
    </div>
  );
}

export default Header;
