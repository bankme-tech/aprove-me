/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ApiError } from './types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const sleepPromise = async (miliseconds: number = 10000) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};

export const isApiError = (error: any): error is ApiError => {
  if (error.message && error.statusCode && error.error) {
    return true;
  }
  return false;
};
