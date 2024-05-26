'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { AppRoutes } from '@/constants/app-routes';

export const BatchToggle: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const batch = searchParams.get('batch') === 'true';

  return (
    <div className="form-control" data-testid="batch-button">
      <label className="label cursor-pointer gap-4">
        <span className="label-text">Batch</span>
        <input
          onClick={() => {
            if (batch) {
              router.push(AppRoutes.payables.create);
            } else {
              router.push(`${AppRoutes.payables.create}?batch=true`);
            }
          }}
          type="checkbox"
          className="toggle"
          checked={batch}
        />
      </label>
    </div>
  );
};
