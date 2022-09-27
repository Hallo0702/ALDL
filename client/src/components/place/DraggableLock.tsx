import { FC, MutableRefObject, useRef, useState } from 'react';
import BasicIcon from '../../../assets/locks/basic.svg';
import StripeIcon from '../../../assets/locks/stripe.svg';

const LOCK_SIZE = '5vw';
interface DraggableLockProps {
  lockType?: string;
  top: number;
  left: number;
  bgRef: MutableRefObject<HTMLElement | null>;
}

const getLockType = (lockType: string | undefined) => {
  if (lockType === 'stripe') return StripeIcon;
  return BasicIcon;
};

const DraggableLock: FC<DraggableLockProps> = ({
  lockType,
  top,
  left,
  bgRef,
}) => {
  const Lock = getLockType(lockType);
  const [isSelected, setIsSelected] = useState(false);
  const startDrag = (e) => {
    setIsSelected(true);
  };
  const endDrag = (e) => {
    setIsSelected(false);
  };
  const drag = (e) => {
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
      if (svg) {
        svg.style.left = `calc(${x}% - 2.5vw)`;
        svg.style.top = `calc(${y}% - 2.5vw)`;
      }
    }
  };

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
      onMouseDown={(e) => startDrag(e)}
      onMouseMove={(e) => drag(e)}
      onMouseUp={(e) => endDrag(e)}
      // onMouseLeave={(e) => endDrag(e)}
    ></Lock>
  );
};
export default DraggableLock;
