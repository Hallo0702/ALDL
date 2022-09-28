import crypto from 'crypto';
import { FC, useEffect, useRef, useState } from 'react';
import places from '../../constant/places';
import DraggableLock from './DraggableLock';

import Lock, { LockProps } from './Lock';

interface DynamicContainerProps {
  bgWidth: number;
  bgHeight: number;
  locks: Array<LockProps>;
  locksOpacity?: number;
  drggableLock: LockProps;
  placeId: number;
}

const DynamicContainer: FC<DynamicContainerProps> = ({
  bgWidth,
  bgHeight,
  locks,
  locksOpacity,
  drggableLock,
  placeId,
}) => {
  const bgRef = useRef<HTMLElement | null>(null);
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
    handleResize();
  }, [bgWidth, bgHeight]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    console.log(places.find((place) => place.id === placeId)?.bgImgSrc);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isSelected, setIsSelected] = useState(false);
  const startDrag = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof Element && e?.target?.parentElement?.id === 'svg') {
      setIsSelected(true);
    }
  };
  const endDrag = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof Element && e?.target?.parentElement?.id === 'svg') {
      setIsSelected(false);
      //todo : 자물쇠 걸기 모달띄워서 걸기진행
      const res = window.confirm('자물쇠를 거시겠습니까?');
      if (res && bgRef && bgRef.current) {
        const x =
          (100 * (e.clientX - bgRef.current.getBoundingClientRect().left)) /
          Number(bgRef.current.offsetWidth);
        const y =
          (100 * (e.clientY - bgRef.current.getBoundingClientRect().top)) /
          Number(bgRef.current.offsetHeight);
        let title, content, imageSrc;
      }
    }
  };
  const drag = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isSelected) return;
    e.preventDefault();
    const svg = document.querySelector('#svg') as HTMLElement;
    if (bgRef && bgRef.current) {
      const x =
        (100 * (e.clientX - bgRef.current.getBoundingClientRect().left)) /
        Number(bgRef.current.offsetWidth);
      const y =
        (100 * (e.clientY - bgRef.current.getBoundingClientRect().top)) /
        Number(bgRef.current.offsetHeight);
      if (svg && x > 2.5 && x < 97.5 && y > 2.5 && y < 97.5) {
        svg.style.left = `${x - 2.5}%`;
        svg.style.top = `${y - 2.5}%`;
      }
    }
  };

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
      ref={bgRef}
      onMouseDown={(e) => startDrag(e)}
      onMouseMove={(e) => drag(e)}
      onMouseUp={(e) => endDrag(e)}
      onMouseLeave={(e) => endDrag(e)}
    >
      {/* <div
        className="relative left-[5%] top-[5%] w-[90%] h-[90%] bg-opacity-30 bg-white"
        onMouseMove={(e: any) => {
          console.log(e.target.offsetTop);
        }}
      > */}
      {locks.map((lock) => (
        <Lock
          key={crypto.randomBytes(64).toString('hex')}
          lockType={lock.lockType}
          top={lock.top}
          left={lock.left}
          opacity={locksOpacity}
        />
      ))}
      <DraggableLock
        lockType={drggableLock.lockType}
        top={drggableLock.top}
        left={drggableLock.left}
      />
      {/* </div> */}
    </main>
  );
};
export default DynamicContainer;
