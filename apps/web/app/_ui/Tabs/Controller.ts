import { type TabState } from '.';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace TabsController {
  export type EventMap<T extends TabState> = {
    'create-tab': Partial<T>;
  };
  export type K<T extends TabState> = keyof EventMap<T>;
  export type E<T extends TabState, _K extends K<T>> = CustomEvent<
    EventMap<T>[_K]
  >;
}

export class TabsController<T extends TabState = TabState> extends EventTarget {
  // @ts-expect-error Override a method with a generic is complex
  public override addEventListener<K extends TabsController.K<T>>(
    type: K,
    callback: (e: TabsController.E<T, K>) => void,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, callback as EventListener, options);
  }

  // @ts-expect-error Override a method with a generic is complex
  public override removeEventListener<K extends TabsController.K<T>>(
    type: K,
    callback: (e: TabsController.E<T, K>) => void,
    options?: boolean | EventListenerOptions,
  ): void {
    super.removeEventListener(type, callback as EventListener, options);
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
