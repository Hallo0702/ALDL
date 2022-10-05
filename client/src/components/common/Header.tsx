import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { logout } from '../../api/auth';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/states';
import API from '../../api';
import { useRouter } from 'next/router';

const Header: NextPage = () => {
  const [open, setOpen] = useState(false);
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
      <div className="cursor-pointer ">
        <Link href="/">
          <img src="/images/logo.png" alt="home" />
        </Link>
      </div>

      <nav className="flex items-center font-bold text-lg text-black">
        <div
          className="flex items-center justify-end md:hidden"
          onClick={() => setOpen(!open)}
        >
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-white-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <img className="w-7 h-7" src="/images/menu.png" alt="menu" />
          </button>
        </div>
        <ul
          className={`text-right md:text-center md:flex md:items-center md:pb-0 pb-md absolute md:bg-transparent bg-white bg-opacity-80 md:static md:z-auto z-[100] right-0 w-full md:w-auto md:pr-0 pr-xl transition-all md:transition-none border-transparent rounded-lg duration-500 ease-in ${
            open ? 'top-24 ' : 'top-[-490px]'
          }`}
        >
          <Link href="/about">
            <li className="md:ml-xl md:my-0 my-7 cursor-pointer">About</li>
          </Link>
          {user.isLogined ? (
            <>
              <Link href="/logout">
                <li
                  className="md:ml-xl md:my-0 my-7 cursor-pointer"
                  onClick={signoutHandler}
                >
                  Logout
                </li>
              </Link>
              <Link href="/user/mypage">
                <li className="md:ml-xl md:my-0 my-7 cursor-pointer">MyPage</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <li className="md:ml-xl md:my-0 my-7 cursor-pointer">Login</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
