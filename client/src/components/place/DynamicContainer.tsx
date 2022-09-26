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
    contentHeight: parseInt(
      ((0.9 * (bgHeight * window.innerWidth)) / bgWidth).toString()
    ),
  });
  const handleResize = () => {
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
      contentHeight: parseInt(
        ((0.9 * bgHeight * window.innerWidth) / bgWidth).toString()
      ),
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main
      className={`relative bg-[url('/images/landmark/landmark.jpg')] bg-no-repeat bg-cover bg-center`}
      style={{
        width: `calc(${resize.width}px - 10rem)`,
        height: `${resize.contentHeight}px`,
      }}
    >
      <div className="relative left-[5%] top-[5%] w-[90%] h-[90%] bg-opacity-30 bg-white">
        {locks.map((lock) => (
          <Lock
            key={crypto.randomBytes(64).toString('hex')}
            lockType={lock.lockType}
            top={lock.top}
            left={lock.left}
          />
        ))}
      </div>
    </main>
  );
};
export default DynamicContainer;
