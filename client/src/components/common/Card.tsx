import type { FC } from 'react';

interface CardProps {
  title: string;
}

const Card: FC<CardProps> = ({ title }) => {
  return (
    <div className="relative w-96 h-112 font-bold border-black border-2 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-300">
      <div className="absolute top-6 left-6 bg-white rounded-full px-6 py-2">
        {title}
      </div>
    </div>
  );
};
export default Card;
