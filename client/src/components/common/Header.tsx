import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { logout } from '../../api/auth';

async function signoutHandler(event: React.SyntheticEvent) {
  event.preventDefault();
  const result = await logout();
  Cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
}

const Header: NextPage = () => {
  const { data: session, status } = useSession();
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
        {status === 'authenticated' ? (
          <>
            <Link href="logout">
              <div className="mr-10 cursor-pointer" onClick={signoutHandler}>
                · logout
              </div>
            </Link>
            <Link href="mypage">
              <div className="mr-24 cursor-pointer">· mypage</div>
            </Link>
          </>
        ) : (
          <>
            <Link href="auth/login">
              <div className="mr-24 cursor-pointer">· login</div>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
