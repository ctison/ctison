import { ContractUi, ContractUiIcon } from '../ContractUi';
import { GnosisUi } from '../GnosisUi';
import { SafeIcon } from '../GnosisUi/SafeInfos';
import { SignIcon, SignUi } from '../SignUi';

export const tabs: {
  slug: string;
  label: string;
  children: React.FC;
  icon?: React.FC;
}[] = [
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
];
