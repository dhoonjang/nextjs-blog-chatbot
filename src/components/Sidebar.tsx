import { cn } from '@/utils/style';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';

type SidebarProps = {
  close: () => void;
  isOpen: boolean;
};

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  return (
    <div
      className={cn(
        'absolute min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <AiOutlineClose className="h-5 w-5" onClick={close} />
      </div>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        홈
      </Link>
      <Link
        href="/tag"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      <Link
        href="/category/Web-Development"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        Web Development
      </Link>
      <div className="mt-10 flex items-center gap-4">
        <Link href="https://www.instagram.com/dhoonjang" target="_blank">
          <AiFillInstagram className="h-6 w-6" />
        </Link>
        <Link href="https://www.github.com/dhoonjang" target="_blank">
          <AiFillGithub className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
