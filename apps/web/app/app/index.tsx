import { ContractUi, ContractUiIcon } from './contract/page';
import { Calculator, CalculatorIcon } from './convert/page';
import { GnosisUi } from './gnosis/page';
import { SafeIcon } from './gnosis/SafeInfos';
import { SignIcon, SignUi } from './sign/page';
import { TradingView, TradingViewIcon } from './tradingview/page';
import type { IconType } from 'react-icons';

export const apps: {
  slug: string;
  label: string;
  children: React.FC;
  icon: IconType;
}[] = [
  {
    slug: 'convert',
    label: 'Convert',
    children: Calculator,
    icon: CalculatorIcon,
  },
  {
    slug: 'contract',
    label: 'Contract',
    children: ContractUi,
    icon: ContractUiIcon,
  },
  {
    slug: 'sign',
    label: 'Sign',
    children: SignUi,
    icon: SignIcon,
  },
  {
    slug: 'gnosis',
    label: 'Gnosis',
    children: GnosisUi,
    icon: SafeIcon,
  },
  {
    slug: 'tradingview',
    label: 'TradingView',
    children: TradingView,
    icon: () => <TradingViewIcon size='1.2em' />,
  },
];
