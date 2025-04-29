import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-violet-400 flex justify-start h-10 px-4 sticky top-20 z-10">
      <div className="flex items-end ml-24">
        <button className="bg-yellow-400 text-white font-semibold px-6 py-2 h-10 shadow ">  {/*h-12 rounded-t-xl*/}
      
          All Category
        </button>

        <a
          href="/"
          className="bg-violet-400 text-white font-medium px-6 py-2 ml-4 h-10 hover:bg-violet-600 transition-colors duration-200"
        >
          Home
        </a>

      </div>
    </nav>
  );
};

export default NavBar;
