import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-end items-center border-1 border-gray-400 w-full">
      <ul className="flex items-center gap-3 px-2 py-2.5">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/profile'}>Profile</Link>
        </li>
        <li>
          <p>Bolt</p>
        </li>
        <li>
          <button className="bg-sky-400">
            <p>Connect wallet</p>
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
