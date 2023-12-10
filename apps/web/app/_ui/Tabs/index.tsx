export { Tabs } from './Tabs';

export interface TabState {
  id: string;
  title: string;
}

export interface CustomProps<T extends TabState> {
  tab: T;
  idx: number;
  active: boolean;
}
