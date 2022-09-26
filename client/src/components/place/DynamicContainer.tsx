import crypto from 'crypto';
import { FC, useEffect, useState } from 'react';
import places from '../../constant/places';

import Lock, { LockProps } from './Lock';

interface DynamicContainerProps {
  bgWidth: number;
  bgHeight: number;
  locks: Array<LockProps>;
  locksOpacity?: number;
  placeId: number;
}

const DynamicContainer: FC<DynamicContainerProps> = ({
  bgWidth,
  bgHeight,
  locks,
  locksOpacity,
  placeId,
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
    console.log(places.find((place) => place.id === placeId)?.bgImgSrc);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main
      className={`relative bg-no-repeat bg-cover bg-center`}
      style={{
        backgroundImage: `url(${
          places.find((place) => place.id === placeId)?.bgImgSrc
        })`,
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
            opacity={locksOpacity}
          />
        ))}
      </div>
    </main>
  );
};
export default DynamicContainer;
