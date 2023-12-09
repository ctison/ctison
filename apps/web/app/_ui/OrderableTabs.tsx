'use client';

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ActionIcon,
  CloseButton,
  Menu,
  Tabs,
  TabsProps,
  TabsTabProps,
  TextInput,
} from '@mantine/core';
import {
  useDidUpdate,
  useEventListener,
  useListState,
  useLocalStorage,
  useMergedRef,
  useSessionStorage,
  useToggle,
} from '@mantine/hooks';
import { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineTrash } from 'react-icons/hi';

export interface TabState {
  id: string;
  title?: string;
}

export interface CustomProps {
  tab: TabState;
  idx: number;
  active: boolean;
}

export interface OrderableTabsProps extends Omit<TabsProps, 'children'> {
  localStorageKey: string;
  Content: React.JSXElementConstructor<CustomProps>;
  creatable?: boolean;
}

export const OrderableTabs = ({
  localStorageKey,
  Content,
  creatable,
}: OrderableTabsProps) => {
  const [tabsStorage, setTabsStorage] = useLocalStorage<TabState[]>({
    key: localStorageKey,
    defaultValue: [],
    getInitialValueInEffect: false,
  });

  const [tabs, tabsHandlers] = useListState<TabState>(tabsStorage);

  useDidUpdate(() => {
    setTabsStorage(tabs);
  }, [setTabsStorage, tabs]);

  const [activeTab, setActiveTab] = useSessionStorage<string | null>({
    key: `${localStorageKey}-active-tab`,
    defaultValue: null,
  });

  const createTab = useCallback(() => {
    const id = `${Date.now()}-${Math.random()}`.replaceAll('.', '');
    tabsHandlers.append({
      id,
    });
    setActiveTab(id);
  }, [tabsHandlers, setActiveTab]);

  const changeTab = useCallback(
    (value: string | null) => {
      if (value === null) {
        setActiveTab(null);
      } else if (value === '+') {
        createTab();
      } else {
        setActiveTab(value);
      }
    },
    [createTab, setActiveTab],
  );

  const removeTab = useCallback(
    (idOrIdx: string | number) => {
      let idx: number;
      if (typeof idOrIdx === 'number') {
        idx = idOrIdx;
      } else {
        idx = tabs.findIndex((tab) => tab.id === idOrIdx);
      }
      if (activeTab === tabs[idx].id) {
        let newActiveTab: string | null = null;
        if (tabs.length === 1) {
        } else if (idx >= tabs.length - 1) {
          newActiveTab = tabs[idx - 1].id;
        } else {
          newActiveTab = tabs[idx + 1].id;
        }
        setActiveTab(newActiveTab);
      }
      tabsHandlers.remove(idx);
    },
    [tabs, activeTab, tabsHandlers, setActiveTab],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        distance: 10,
        tolerance: Number.MAX_SAFE_INTEGER,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        if (e.over !== null && e.active.id !== e.over.id) {
          tabsHandlers.reorder({
            from: (e.active.id as number) - 1,
            to: (e.over!.id as number) - 1,
          });
        }
      }}
    >
      <Tabs
        value={activeTab}
        onChange={changeTab}
        variant='outline'
        activateTabWithKeyboard={false}
      >
        <Tabs.List>
          <SortableContext items={tabs.map((_tab, idx) => idx + 1)}>
            {tabs.map((tab, idx) => (
              <OrderableTab
                key={tab.id}
                value={tab.id}
                idx={idx + 1}
                rightSection={
                  <CloseButton
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(idx);
                    }}
                  />
                }
                closeTab={() => removeTab(idx)}
              >
                <TextInput
                  w={100}
                  value={tab.title ?? 'Untitled'}
                  pointer={true}
                  variant='unstyled'
                  onMouseDown={(e) => e.preventDefault()}
                  onDoubleClick={(e) => {
                    e.currentTarget.focus();
                    e.currentTarget.select();
                  }}
                  onChange={(e) => {
                    tabsHandlers.setItem(idx, {
                      ...tab,
                      title: e.currentTarget.value,
                    });
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </OrderableTab>
            ))}
          </SortableContext>
          {creatable && (
            <Tabs.Tab value='+'>
              <ActionIcon component='div' variant='subtle' color='gray'>
                <FaPlus />
              </ActionIcon>
            </Tabs.Tab>
          )}
        </Tabs.List>
        {tabs.map((tab, idx) => (
          <Tabs.Panel key={tab.id} value={tab.id}>
            <Content idx={idx} tab={tab} active={activeTab === tab.id} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </DndContext>
  );
};

interface OrderableTabProps extends TabsTabProps {
  idx: number;
  closeTab: () => void;
}

const OrderableTab: React.FC<OrderableTabProps> = ({
  idx,
  closeTab,
  ...props
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: idx,
    });

  const [isMenuOpened, toggleMenu] = useToggle();

  const contextMenuRef = useEventListener('contextmenu', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  const ref = useMergedRef(setNodeRef, contextMenuRef);

  return (
    <Menu
      trigger={false as unknown as undefined}
      opened={isMenuOpened}
      onChange={toggleMenu}
      withArrow
      arrowSize={15}
      offset={-1}
      shadow='md'
    >
      <Menu.Target>
        <Tabs.Tab
          ref={ref}
          component='div'
          {...props}
          style={{
            transform: CSS.Transform.toString(transform),
            transition,
            touchAction: 'none',
          }}
          {...attributes}
          {...listeners}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Divider />
        <Menu.Item
          onClick={closeTab}
          color='red'
          leftSection={<HiOutlineTrash />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
