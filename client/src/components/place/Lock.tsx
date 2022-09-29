import type { FC } from 'react';
import LockSvg from '../common/LockSvg';

const LOCK_SIZE = '5vw';
export interface LockProps {
  lockType: number;
  locationY: number;
  locationX: number;
  opacity?: number;
}

const Lock: FC<LockProps> = ({ lockType, locationY, locationX, opacity }) => {
  return (
    <LockSvg
      type={lockType}
      className="absolute"
      width={LOCK_SIZE}
      height={LOCK_SIZE}
      style={{
        top: `${locationY}%`,
        left: `${locationX}%`,
        opacity: `${opacity ? opacity : '100'}%`,
      }}
      // todo : 마우스 올리면 제목정도 나오게 출력하면 좋을것 같음.
      onMouseOver={() => console.log(2)}
    ></LockSvg>
  );
};
export default Lock;
