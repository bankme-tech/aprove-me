import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const sleepPromise = async (miliseconds: number = 10000) => {
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};
