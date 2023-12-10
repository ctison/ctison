import { TabState } from '.';

module TabsController {
  export type EventMap<T extends TabState> = {
    'create-tab': Partial<T>;
  };
  export type K<T extends TabState> = keyof EventMap<T>;
  export type E<T extends TabState, _K extends K<T>> = CustomEvent<
    EventMap<T>[_K]
  >;
}

export class TabsController<T extends TabState = TabState> extends EventTarget {
  // @ts-expect-error
  public override addEventListener<K extends TabsController.K<T>>(
    type: K,
    callback: (e: TabsController.E<T, K>) => void,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void {
    super.addEventListener(type, callback as EventListener, options);
  }

  // @ts-expect-error
  public override removeEventListener<K extends TabsController.K<T>>(
    type: K,
    callback: (e: TabsController.E<T, K>) => void,
    options?: boolean | EventListenerOptions | undefined,
  ): void {
    return super.removeEventListener(type, callback as EventListener, options);
  }

  public dispatch<K extends TabsController.K<T>>(
    type: K,
    data: TabsController.EventMap<T>[K],
  ): boolean {
    return this.dispatchEvent(
      new CustomEvent(type, {
        detail: data,
      }),
    );
  }
}
