'use client';

import { Tabs } from '@/_ui/Tabs/Tabs';
import { ContractUiApp } from './ContractUiApp';
import { FaCode } from 'react-icons/fa6';

export const ContractUi: React.FC = () => {
  return (
    <Tabs
      localStorageKey='contract-ui-tabs'
      TitleLeftSection={() => <FaCode />}
      Content={({ tab }) => <ContractUiApp id={tab.id} />}
      creatable
    />
  );
};
