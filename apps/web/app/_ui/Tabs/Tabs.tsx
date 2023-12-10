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
  Tabs as MantineTabs,
  TabsProps as MantineTabsProps,
  Menu,
  TabsTabProps,
  TextInput,
  Tooltip,
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
import React, { forwardRef, useCallback, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineTrash } from 'react-icons/hi';
import { CustomProps, TabState } from '.';
import { TabsController } from './Controller';

export interface TabsProps<T extends TabState = TabState>
  extends Omit<MantineTabsProps, 'children'> {
  localStorageKey: string;
  Content: React.JSXElementConstructor<CustomProps<T>>;
  TitleLeftSection?: React.JSXElementConstructor<CustomProps<T>>;
  creatable?: boolean;
  createTab?: () => Omit<T, 'id'>;
  controller?: TabsController<T>;
}

const _Tabs = <T extends TabState>(
  { localStorageKey, Content, creatable, controller, ...props }: TabsProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement>,
) => {
  const [tabsStorage, setTabsStorage] = useLocalStorage<T[]>({
    key: localStorageKey,
    defaultValue: [],
    getInitialValueInEffect: false,
  });

  const [tabs, tabsHandlers] = useListState<T>(tabsStorage);

  useDidUpdate(() => {
    setTabsStorage(tabs);
  }, [setTabsStorage, tabs]);

  const [activeTab, setActiveTab] = useSessionStorage<string | null>({
    key: `${localStorageKey}-active-tab`,
    defaultValue: null,
  });

  const createTab = useCallback(
    (tab?: Partial<T>) => {
      const id = `${Date.now()}-${Math.random()}`.replaceAll('.', '');
      tabsHandlers.append({
        title: 'Untitled',
        ...props.createTab?.(),
        ...tab,
        id,
      } as T);
      setActiveTab(id);
    },
    [tabsHandlers, props, setActiveTab],
  );

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

  useEffect(() => {
    const createTabListener: Parameters<
      TabsController<T>['addEventListener']
    >[1] = (e) => {
      createTab(e.detail);
    };
    controller?.addEventListener('create-tab', createTabListener);
    return () => {
      controller?.removeEventListener('create-tab', createTabListener);
    };
  });

  if (tabs.length === 0 && !creatable) {
    return null;
  }

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
      <MantineTabs
        ref={ref}
        value={activeTab}
        onChange={changeTab}
        variant='outline'
        activateTabWithKeyboard={false}
      >
        <MantineTabs.List>
          <SortableContext items={tabs.map((_tab, idx) => idx + 1)}>
            {tabs.map((tab, idx) => (
              <Tab
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
                <Tooltip
                  label={`${tab.title} (Double click to edit)`}
                  withArrow
                  multiline
                  openDelay={500}
                >
                  <TextInput
                    w={100}
                    value={tab.title}
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
                    styles={{
                      input: {
                        textOverflow: 'ellipsis',
                      },
                    }}
                    leftSection={
                      props.TitleLeftSection ? (
                        <props.TitleLeftSection
                          idx={idx}
                          tab={tab}
                          active={activeTab === tab.id}
                        />
                      ) : undefined
                    }
                  />
                </Tooltip>
              </Tab>
            ))}
          </SortableContext>
          {creatable && (
            <MantineTabs.Tab value='+'>
              <ActionIcon component='div' variant='subtle' color='gray'>
                <FaPlus />
              </ActionIcon>
            </MantineTabs.Tab>
          )}
        </MantineTabs.List>
        {tabs.map((tab, idx) => (
          <MantineTabs.Panel key={tab.id} value={tab.id}>
            <Content idx={idx} tab={tab} active={activeTab === tab.id} />
          </MantineTabs.Panel>
        ))}
      </MantineTabs>
    </DndContext>
  );
};

export const Tabs = forwardRef(_Tabs) as <T extends TabState = TabState>(
  props: React.PropsWithRef<TabsProps<T>>,
) => React.ReactElement;

interface TabProps extends TabsTabProps {
  idx: number;
  closeTab: () => void;
}

const Tab: React.FC<TabProps> = ({ idx, closeTab, ...props }) => {
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
        <MantineTabs.Tab
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
