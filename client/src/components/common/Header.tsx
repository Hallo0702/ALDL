import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { logout } from '../../api/auth';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/states';
import API from '../../api';

const Header: NextPage = () => {
  const [user, setUserstate] = useRecoilState(userState);
  async function signoutHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      return;
    }
    const result = await logout({ refreshToken: refreshToken });
    setUserstate({ isLogined: false });
    Cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
    API.defaults.headers.common['Authorization'] = `Bearer ${''}`;
  }

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
        {user.isLogined ? (
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
