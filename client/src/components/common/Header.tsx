import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const Header: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header className="flex justify-between py-12">
      <div className="cursor-pointer">
        <Link href="/">
          <img src="/images/logo.png" alt="home" />
        </Link>
      </div>
      <nav className="flex font-medium text-lg">
        <Link href="about">
          <div className="mr-10 cursor-pointer">· about</div>
        </Link>
        {isLoggedIn ? (
          <>
            <Link href="logout">
              <div className="mr-10 cursor-pointer">· logout</div>
            </Link>
            <Link href="mypage">
              <div className="mr-24 cursor-pointer">· mypage</div>
            </Link>
          </>
        ) : (
          <>
            <Link href="login">
              <div className="mr-24 cursor-pointer">· login</div>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
