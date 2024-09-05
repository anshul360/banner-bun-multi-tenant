import Link from 'next/link';
import LogoImage from './LogoImage';
import { Josefin_Sans } from 'next/font/google';

const jsans = Josefin_Sans({subsets: ["latin"], style: ["italic", "normal"]})

const Logo: React.FCC<{
  href?: string;
  className?: string;
  label?: string;
}> = ({ href, label, className }) => {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'} className=" flex gap-2 items-center">
      <LogoImage className={className} /><span className={"text-transparent font-extrabold text-xl sm:text-2xl bg-clip-text bg-gradient-to-bl to-[#AD1471] from-[#2E14AE] italic whitespace-nowrap " + jsans.className}>banner<span className="font-normal not-italic">bun</span></span>
    </Link>
  );
};

export default Logo;
