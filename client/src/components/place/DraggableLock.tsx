import { FC } from 'react';
import LockSvg from '../common/LockSvg';

const LOCK_SIZE = '5vw';
interface DraggableLockProps {
  lockType: number;
  top: number;
  left: number;
}
const DraggableLock: FC<DraggableLockProps> = ({ lockType, top, left }) => {
  return (
    <LockSvg
      type={lockType}
      id="svg"
      className="absolute"
      width={LOCK_SIZE}
      height={LOCK_SIZE}
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
    ></LockSvg>
  );
};
export default DraggableLock;
