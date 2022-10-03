import { FC, forwardRef } from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  label?: string;
  btnType: string;
  btnSize: string;
  customstyle?: string;
}
const btnType = {
  active: 'active',
  normal: 'normal',
  dark: 'dark',
};

const btnSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
};

const btnTypeClass = {
  [btnType.active]: 'border border-black rounded-3xl bg-peach',
  [btnType.normal]: 'border border-black rounded-3xl bg-white',
  [btnType.dark]: 'border border-black rounded-3xl bg-black text-white',
};

const btnSizeClass = {
  [btnSize.small]: 'w-14 h-7 m-2 font-custom font-medium text-xs text-black',
  [btnSize.medium]: 'w-24 h-10 m-2 font-custom font-medium text-sm text-black',
  [btnSize.large]: 'w-36 h-10 m-2 font-custom font-medium text-sm text-black',
  [btnSize.xlarge]: 'w-36 h-12 m-2 font-custom font-medium text-md text-black',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, btnSize, btnType, customstyle, onClick, ...rest }, ref) => {
    return (
      <button
        className={
          btnSizeClass[btnSize] +
          ' ' +
          btnTypeClass[btnType] +
          ' ' +
          customstyle
        }
        onClick={onClick}
        ref={ref}
        {...rest}
      >
        {label}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
