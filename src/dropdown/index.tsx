import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { OPTIONS } from '../constants';
import { useOutsideClick } from './use-outside-click';
import { motion } from 'framer-motion';

type TContainerElement = HTMLDivElement;

export const Dropdown: FC = () => {
  const containerRef = useRef<TContainerElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState('');
  const [isOpen, setOpen] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log('do debounce stuff (eg. API request)');
    }, 300);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.addEventListener('focus', () => {
      setOpen(true);
    });
    return () => {
      inputRef.current?.removeEventListener('focus', () => {
        setOpen(true);
      });
    };
  }, [inputRef]);

  useOutsideClick<TContainerElement>({
    ref: containerRef,
    handler: handleClose
  });

  const filteredOptions = OPTIONS.filter((option) => {
    if (!text) {
      return true;
    }
    return option.label.toLowerCase().includes(text.toLowerCase());
  });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <motion.div
        layout
        ref={containerRef}
        className="flex w-full flex-col bg-slate-50 lg:w-[600px]"
      >
        <motion.label layout className="bg-slate-100 px-4 py-3">
          <input ref={inputRef} value={text} onChange={handleChange} />
        </motion.label>
        {isOpen ? (
          <>
            {filteredOptions.length > 0 && <div className="h-4" />}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
              className="flex flex-col"
            >
              {filteredOptions.map((filteredOption, index) => (
                <Fragment key={`${filteredOption.id}`}>
                  {index !== 0 && (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                      className="h-2 w-full border-white"
                    />
                  )}
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                    className="cursor-pointer bg-slate-100 px-4 py-2"
                    onClick={() => {
                      setText(filteredOption.label);
                      inputRef.current?.select();
                    }}
                  >
                    {filteredOption.label}
                  </motion.li>
                </Fragment>
              ))}
            </motion.ul>
          </>
        ) : null}
      </motion.div>
    </div>
  );
};
