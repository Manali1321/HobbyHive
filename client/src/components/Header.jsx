import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header className="flex items-center justify-between bg-black px-4 py-2">
      <h1 className="text-white text-xl font-bold">Hobby Hive</h1>
      <Nav />
    </header>
  );
}

export default Header;
