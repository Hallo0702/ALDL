import { v4 } from 'uuid';
import { FC, useEffect, useRef, useState } from 'react';

import places from '../../constant/places';
import DraggableLock from './DraggableLock';

import Lock, { LockProps } from './Lock';

interface DynamicContainerProps {
  bgWidth: number;
  bgHeight: number;
  locks: Array<LockProps>;
  locksOpacity?: number;
  draggableLock?: LockProps;
  placeId: number;
  onAction?(locationX: number, locationY: number): void;
}

const DynamicContainer: FC<DynamicContainerProps> = ({
  bgWidth,
  bgHeight,
  locks,
  locksOpacity,
  draggableLock,
  placeId,
  onAction,
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
      if (bgRef && bgRef.current) {
        const x =
          (100 *
            (e.clientX -
              bgRef.current.getBoundingClientRect().left -
              0.025 * resize.width)) /
          Number(bgRef.current.offsetWidth);
        const y =
          (100 *
            (e.clientY -
              bgRef.current.getBoundingClientRect().top -
              0.025 * resize.width)) /
          Number(bgRef.current.offsetHeight);
        const res = window.confirm('자물쇠를 거시겠습니까?');
        if (res && onAction) {
          onAction(x, y);
        }
      }
    }
  };
  const drag = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isSelected) return;
    console.log('asd');
    e.preventDefault();
    const svg = document.querySelector('#svg') as HTMLElement;
    if (bgRef && bgRef.current) {
      const x =
        (100 *
          (e.clientX -
            bgRef.current.getBoundingClientRect().left -
            0.025 * resize.width)) /
        Number(bgRef.current.offsetWidth);
      const y =
        (100 *
          (e.clientY -
            bgRef.current.getBoundingClientRect().top -
            0.025 * resize.width)) /
        Number(bgRef.current.offsetHeight);
      if (svg && x > 2.5 && x < 97.5 && y > 2.5 && y < 97.5) {
        svg.style.left = `${x}%`;
        svg.style.top = `${y}%`;
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
      {locks.map((lock) => (
        <Lock
          key={v4()}
          lockType={lock.lockType}
          locationY={lock.locationY}
          locationX={lock.locationX}
          lockerTitle={lock.lockerTitle}
          opacity={locksOpacity}
        />
      ))}
      {draggableLock && (
        <DraggableLock
          lockType={draggableLock.lockType}
          locationY={draggableLock.locationY}
          locationX={draggableLock.locationX}
        />
      )}
    </main>
  );
};
export default DynamicContainer;
