import { IconExternalLink } from '../icons';
import { twMerge } from 'tailwind-merge';

export type ExternalLinkProps = React.ComponentPropsWithRef<'a'>;

export const ExternalLink: React.FC<Readonly<ExternalLinkProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      rel='noreferrer noopener'
      target='_blank'
      className={twMerge('inline-flex !underline hover:!text-black', className)}
      {...props}
    >
      {children}
      <IconExternalLink
        className='mt-[0.2rem] inline self-start'
        size='0.8rem'
      />
    </a>
  );
};
