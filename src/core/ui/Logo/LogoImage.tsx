import classNames from 'clsx';
import Image from "next/image";
import configuration from '~/configuration';

const LogoImage: React.FCC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Image
      className={classNames(`w-[40px] sm:w-[50px]`, className)}
      width={105}
      height={50}
      alt='logo'
      src={configuration.site.logoUrl}
    />
  );
};

export default LogoImage;
