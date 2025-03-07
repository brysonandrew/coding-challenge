import { useEffect, type RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

type TEventKey = keyof Pick<
  GlobalEventHandlersEventMap,
  'touchstart' | 'mousedown'
>;

export type TOutsideClickConfig<T> = {
  ref: RefObject<T | null>;
  handler: Handler;
  events?: readonly TEventKey[];
};
export const useOutsideClick = <T extends HTMLElement = HTMLElement>({
  ref,
  handler
}: TOutsideClickConfig<T>): void => {
  const handleEvent = (event: MouseEvent | TouchEvent) => {
    const element = ref?.current;

    if (!element || element.contains(event.target as Node)) {
      return;
    }

    handler(event);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleEvent);
    window.addEventListener('touchstart', handleEvent);
    return () => {
      window.removeEventListener('mousedown', handleEvent);
      window.removeEventListener('touchstart', handleEvent);
    };
  }, [ref, handler]);
};
