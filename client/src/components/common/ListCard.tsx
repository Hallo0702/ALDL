import Image from 'next/image';
import type { FC } from 'react';

interface ListCardProps {
  tag: string;
  title: string;
  content?: string;
  imageSrc?: string;
}

const ListCard: FC<ListCardProps> = ({ tag, title, content, imageSrc }) => {
  return (
    <div className="w-full h-48 bg-white rounded-3xl px-12 py-6 mb-12 border-black border-2 flex justify-between text-black">
      <div className="w-128">
        <div className="px-4 py-2 bg-peach w-24 rounded-full text-center font-bold mb-2 border-black border">
          {tag}
        </div>
        <div className="font-bold text-lg mb-2 line-clamp-1">{title}</div>
        <div className="font-medium text-lg line-clamp-2">{content}</div>
      </div>
      <div className="relative w-32 h-32">
        <Image
          src={imageSrc ? imageSrc : '/vercel.svg'}
          alt={title}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        ></Image>
      </div>
    </div>
  );
};
export default ListCard;
