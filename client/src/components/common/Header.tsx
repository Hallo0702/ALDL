import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { logout } from '../../api/auth';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/states';
import API from '../../api';
import { useRouter } from 'next/router';

const Header: NextPage = () => {
  const [user, setUserstate] = useRecoilState(userState);
  const router = useRouter();

  async function signoutHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      return;
    }
    const result = await logout({ refreshToken: refreshToken });
    setUserstate({ isLogined: false, address: '', privateKey: '' });
    Cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
    API.defaults.headers.common['Authorization'] = `Bearer ${''}`;
    router.push('/');
  }
  return (
    <header className="flex justify-between py-8">
      <div className="cursor-pointer">
        <Link href="/">
          <img src="/images/logo.png" alt="home" />
        </Link>
      </div>
      <nav className="flex justify-center items-center font-bold text-lg text-black">
        <Link href="/about">
          <div className="mr-10 cursor-pointer">· About</div>
        </Link>
        {user.isLogined ? (
          <>
            <Link href="/logout">
              <div className="mr-10 cursor-pointer" onClick={signoutHandler}>
                · Logout
              </div>
            </Link>
            <Link href="/user/mypage">
              <div className="mr-4 cursor-pointer">· MyPage</div>
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <div className="mr-8 cursor-pointer">· Login</div>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
