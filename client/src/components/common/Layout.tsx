import Image from 'next/image';
import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/main_bg.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="mx-20 z-20 relative">{children}</div>
    </div>
  );
};
export default Layout;
