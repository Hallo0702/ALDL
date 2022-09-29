import { FC } from 'react';
import LockSvg from '../common/LockSvg';

const LOCK_SIZE = '5vw';
interface DraggableLockProps {
  lockType: number;
  locationY: number;
  locationX: number;
}
const DraggableLock: FC<DraggableLockProps> = ({
  lockType,
  locationY,
  locationX,
}) => {
  return (
    <LockSvg
      type={lockType}
      id="svg"
      className="absolute"
      width={LOCK_SIZE}
      height={LOCK_SIZE}
      style={{
        top: `${locationY}%`,
        left: `${locationX}%`,
      }}
    ></LockSvg>
  );
};
export default DraggableLock;
