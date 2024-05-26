import React, { useState } from 'react';
import './input.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  verifyValue: (value: string) => boolean;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  [x: string]: any;
}

type ErrorType = {
  email: string;
  password: string;
  value: string;
  name: string;
  document: string;
  phone: string;
};

export default function Input({
  verifyValue,
  children,
  onChange,
  name,
  ...rest
}: Props) {

  const errors: ErrorType = {
    name: 'Must have at least 3 characters',
    document: 'Invalid document format',
    phone: 'Invalid phone format',
    email: 'Invalid email format',
    password: 'At least 4 characters',
    value: 'Value must be a number greater than 0'
  };

  const isValueValid = verifyValue(rest?.value as string || '');

  const [isFirstRender, setIsFirstRender] = useState(true);

  const setBorderColor = () => {
    return isFirstRender || isValueValid
      ? 'ring-zinc-900/20'
      : 'ring-red-500 focus:outline-red-500';
  };

  return (
    <>
      <label
        className="text-sm font-normal relative mb-2 w-full"
        htmlFor={name}
      >
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 md:text-sm lg:text-base">
          {children}
        </span>
        <input
          id={name}
          name={name}
          required
          {...rest}
          onChange={(e) => {
            onChange(e);
            setIsFirstRender(false);
          }}
          className={`bg-zinc-50 w-full p-2 px-3 mt-1 rounded-xl ring-1 ${setBorderColor()} outline-1 md:text-base `}
        />

        {!isFirstRender && !isValueValid && (
          <span className="absolute bottom-[-20px] left-0 ml-2 text-xs text-red-500">
            {errors[name as keyof ErrorType]}
          </span>
        )}
      </label>
    </>
  );
}
