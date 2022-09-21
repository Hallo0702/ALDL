import Image from 'next/image';
import type { FC, ReactNode } from 'react';

import Header from './Header';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-screen font-custom">
      <Image
        src="/images/main_bg.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="fill"
        objectPosition="center"
      />
      <div className="mx-20 z-20 relative">
        <Header />
        {children}
      </div>
    </div>
  );
};
export default Layout;
