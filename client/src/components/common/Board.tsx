import type { FC, ReactNode } from 'react';

interface BoardProps {
  children: ReactNode;
}

const Board: FC<BoardProps> = ({ children }) => {
  return (
    <div className="w-full h-auto rounded-3xl bg-white text-black px-4 py-2 md:px-32 md:py-16 border-black border-2">
      {children}
    </div>
  );
};
export default Board;
