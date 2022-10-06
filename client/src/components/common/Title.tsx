import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Title: FC<Props> = ({ children }) => {
  return (
    <div className="text-center font-custom font-bold text-2xl text-black mb-12">
      {children}
    </div>
  );
};
export default Title;
