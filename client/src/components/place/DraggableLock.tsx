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
  const [curTop, setCurTop] = useState(top);
  const [curLeft, setCurLeft] = useState(left);
  const makeDraggable = (e: any) => {
    // const selectedElement: boolean | HTMLElement = false;
    const svg = e.target;
    console.log(svg);
    // svg.addEventListener('mousedown', startDrag);
    // svg.addEventListener('mousemove', drag);
    // svg.addEventListener('mouseup', endDrag);
    // svg.addEventListener('mouseleave', endDrag);
    // function startDrag(e) {
    //   if (e.target.classList.contains('draggable')) {
    //     selectedElement = e.target;
    //   }
    // }
    // function drag(e) {
    //   console.log(typeof selectedElement);
    //   // if (typeof selectedElement) {
    //   //   e.preventDefault();
    //   //   const x = parseFloat(selectedElement.getAttributeNS(null, 'x'));
    //   //   selectedElement.setAttributeNS(null, 'x', x + 0.1);
    //   // }
    // }
    // function endDrag(e) {}
  };
  const Lock = getLockType(lockType);
  const [isSelected, setIsSelected] = useState(false);
  const svgRef = useRef(null);
  const getMousePosition = (e) => {
    const CTM = e.target.getScreenCTM();
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d,
    };
  };
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
      // style={{
      //   // top: `${curTop}%`,
      //   // left: `${curLeft}%`,
      //   top: `${10}%`,
      //   left: `${10}%`,
      // }}
      onMouseDown={(e) => startDrag(e)}
      onMouseMove={(e) => drag(e)}
      onMouseUp={(e) => endDrag(e)}
      // onMouseLeave={(e) => endDrag(e)}
    ></Lock>
  );
};
export default DraggableLock;
