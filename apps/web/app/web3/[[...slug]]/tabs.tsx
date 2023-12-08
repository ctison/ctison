import { ContractUi } from '../ContractUi';
import { GnosisUi } from '../GnosisUi';
import { SignUi } from '../SignUi';

export const tabs: { slug: string; label: string; children: React.FC }[] = [
  {
    slug: 'contract',
    label: 'Contract',
    children: ContractUi,
  },
  {
    slug: 'sign',
    label: 'Sign',
    children: SignUi,
  },
  {
    slug: 'gnosis',
    label: 'Gnosis',
    children: GnosisUi,
  },
];
