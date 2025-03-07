import { FC, useRef } from 'react';
import { OPTIONS } from '../constants';

export const Dropdown: FC = () => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="bg-blue flex h-screen w-full flex-col items-center justify-center"
    >
      <div className="flex w-full flex-col gap-4 bg-red-500 xl:w-[600px]">
        <h1>Dropdown</h1>
        <p>Here are some options:</p>
        <ul className="flex flex-col gap-2 bg-green-600">
          {OPTIONS.map((option) => (
            <li key={`${option.id}`}>{option.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
