'use client';

import { OrderableTabs } from '@/_ui/OrderableTabs';
import { ContractUiApp } from './ContractUiApp';

export const ContractUi: React.FC = () => {
  return (
    <OrderableTabs
      localStorageKey='contract-ui-tabs'
      Content={ContractUiApp}
      creatable
    />
  );
};
