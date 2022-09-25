import type { FC } from 'react';
import BasicIcon from '../../../assets/locks/basic.svg';
import StripeIcon from '../../../assets/locks/stripe.svg';

const LOCK_SIZE = '5vw';
interface LockProps {
  lockType?: string;
  top: number;
  left: number;
}
const getLockType = (lockType: string | undefined) => {
  if (lockType === 'stripe') return StripeIcon;
  return BasicIcon;
};

//left : 3~100
const Lock: FC<LockProps> = ({ lockType, top, left }) => {
  const Lock = getLockType(lockType);
  return (
    <Lock
      className="absolute"
      alt="basic"
      width={LOCK_SIZE}
      height={LOCK_SIZE}
      style={{
        top: `${top}%`,
        left: `calc(${left}% - ${LOCK_SIZE})`,
      }}
      onMouseOver={() => console.log(2)}
    ></Lock>
  );
};
export default Lock;
