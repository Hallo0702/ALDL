import type { FC } from 'react';

import Lock0Icon from '../../assets/locks/lock0.svg';
import Lock1Icon from '../../assets/locks/lock1.svg';
import Lock2Icon from '../../assets/locks/lock2.svg';
import Lock3Icon from '../../assets/locks/lock3.svg';

interface LockSvgProps {
  type: number;
  width: string | number;
  height: string | number;
  className?: string;
  id?: string;
  style?: { top: string; left: string; opacity?: string };
  onMouseOver?(): void;
}
const getLockSvg = (type: number) => {
  if (type === 0) return Lock0Icon;
  if (type === 1) return Lock1Icon;
  if (type === 2) return Lock2Icon;
  if (type === 3) return Lock3Icon;
};
const LockSvg: FC<LockSvgProps> = ({ type, ...rest }) => {
  const LockSvg = getLockSvg(type);
  return <LockSvg {...rest} />;
};
export default LockSvg;
