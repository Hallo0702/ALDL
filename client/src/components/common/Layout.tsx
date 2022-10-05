import Image from 'next/image';
import type { FC, ReactNode } from 'react';

import Header from './Header';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative max-w-full min-h-screen font-custom text-black">
      <Image
        src="/images/main_bg.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="fill"
        objectPosition="center"
      />
      <div className="relative mx-sm md:mx-lg z-20">
        <Header />
        {children}
      </div>
      <div className="h-24"></div>
    </div>
  );
};
export default Layout;
