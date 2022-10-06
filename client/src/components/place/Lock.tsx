import type { FC } from 'react';
import { useState } from 'react';

import LockSvg from '../common/LockSvg';

const LOCK_SIZE = '5vw';
export interface LockProps {
  lockType: number;
  locationY: number;
  locationX: number;
  lockerTitle?: string;
  opacity?: number;
}

const Lock: FC<LockProps> = ({
  lockType,
  locationY,
  locationX,
  opacity,
  lockerTitle,
}) => {
  const [isTooltip, setIsTooltip] = useState(false);
  return (
    <>
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
        onMouseOver={() => lockerTitle && setIsTooltip(true)}
        onMouseLeave={() => setIsTooltip(false)}
      ></LockSvg>
      {lockerTitle && isTooltip && (
        <div
          className="absolute bg-white p-2 rounded-xl font-bold"
          style={{
            top: `${locationY}%`,
            left: `${locationX}%`,
            opacity: `${opacity ? opacity : '100'}%`,
          }}
        >
          {lockerTitle}
        </div>
      )}
    </>
  );
};
export default Lock;
