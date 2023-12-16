import { ContractUi, ContractUiIcon } from '../ContractUi';
import { Calculator, CalculatorIcon } from '../Calculator';
import { GnosisUi } from '../GnosisUi';
import { SafeIcon } from '../GnosisUi/SafeInfos';
import { SignIcon, SignUi } from '../SignUi';
import { TradingView, TradingViewIcon } from '../TradingView';

export const tabs: {
  slug: string;
  label: string;
  children: React.FC;
  icon?: React.JSXElementConstructor<any>;
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
