import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-violet-400 flex justify-start h-10 px-4">
      <div className="flex items-end ml-24">
        <button className="bg-yellow-400 text-white font-semibold px-4 py-2 h-12 rounded-t-xl shadow">
          All Category <span className="ml-1"></span>
        </button>

        <a
          href="/"
          className="bg-violet-600 text-white font-medium px-6 py-2 ml-4 h-10 "
        >
          Home
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
