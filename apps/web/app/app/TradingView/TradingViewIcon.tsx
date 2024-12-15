import { IconBase, type IconBaseProps } from 'react-icons';

export const TradingViewIcon: React.FC<Readonly<IconBaseProps>> = (props) => (
  <IconBase
    strokeLinecap='round'
    strokeLinejoin='round'
    viewBox='0 0 48 48'
    {...props}
  >
    <polygon points='4.5 14.453 4.5 22.273 11.865 22.273 11.865 33.547 19.685 33.547 19.685 14.453 4.5 14.453' />
    <polygon points='26.202 33.547 34.326 14.453 43.5 14.453 35.376 33.547 26.202 33.547' />
    <circle cx='25.8407' cy='18.3627' r='3.9101' />
  </IconBase>
);
