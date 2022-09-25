import crypto from 'crypto';
import { FC, useEffect, useState } from 'react';

import Lock, { LockProps } from './Lock';

interface DynamicContainerProps {
  bgWidth: number;
  bgHeight: number;
  locks: Array<LockProps>;
}

const DynamicContainer: FC<DynamicContainerProps> = ({
  bgWidth,
  bgHeight,
  locks,
}) => {
  const [resize, setResize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleResize = () => {
    setResize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main
      className={`relative -left-20 w-[100vw] bg-[url('/images/landmark/seoul.png')] bg-no-repeat bg-cover bg-center`}
      style={{
        height: `${parseInt(
          ((bgHeight * resize.width) / bgWidth).toString()
        )}px`,
      }}
    >
      {locks.map((lock) => (
        <Lock
          key={crypto.randomBytes(64).toString('hex')}
          lockType={lock.lockType}
          top={lock.top}
          left={lock.left}
        />
      ))}
    </main>
  );
};
export default DynamicContainer;
