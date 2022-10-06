import Image from 'next/image';
import type { FC } from 'react';

interface CardProps {
  title: string;
  imageSrc: string;
}

const Card: FC<CardProps> = ({ title, imageSrc }) => {
  return (
    <div className="relative max-w-96 h-112 font-bold border-black border-2 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden">
      <Image
        alt={title}
        src={imageSrc}
        layout="fill"
        objectFit="fill"
        objectPosition="center"
      />

      <div className="absolute top-6 left-6 bg-white rounded-full px-6 py-2 text-black border-black border">
        {title}
      </div>
    </div>
  );
};
export default Card;
