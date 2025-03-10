'use client';

import { Tabs } from '@/_ui/Tabs/Tabs';
import { FaCode } from 'react-icons/fa6';
import { ContractUiApp } from './ContractUiApp';

export const ContractUiIcon = FaCode;

export const ContractUi: React.FC = () => {
  return (
    <Tabs
      localStorageKey='contract-ui-tabs'
      TitleLeftSection={() => <ContractUiIcon />}
      Content={({ tab }) => <ContractUiApp id={tab.id} />}
      creatable
      radius='xs'
      classNames={{
        root: '!mt-0.5 !mb-8',
        list: '!px-0.5',
      }}
    />
  );
};

export default ContractUi;
