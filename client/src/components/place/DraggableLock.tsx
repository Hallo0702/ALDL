import { FC, MutableRefObject, useRef, useState } from 'react';
import BasicIcon from '../../../assets/locks/basic.svg';
import StripeIcon from '../../../assets/locks/stripe.svg';

const LOCK_SIZE = '5vw';
interface DraggableLockProps {
  lockType?: string;
  top: number;
  left: number;
}

const getLockType = (lockType: string | undefined) => {
  if (lockType === 'stripe') return StripeIcon;
  return BasicIcon;
};

const DraggableLock: FC<DraggableLockProps> = ({ lockType, top, left }) => {
  const Lock = getLockType(lockType);

  return (
    <Lock
      id="svg"
      className="absolute"
      alt="basic"
      width={LOCK_SIZE}
      height={LOCK_SIZE}
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
    ></Lock>
  );
};
export default DraggableLock;
