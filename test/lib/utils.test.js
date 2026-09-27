import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('joins plain class names', () => {
    expect(cn('p-4', 'text-sm')).toBe('p-4 text-sm');
  });

  it('lets a later Tailwind class win over a conflicting earlier one', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('drops falsy values from conditional class logic', () => {
    expect(cn('base', false && 'hidden', undefined, 'visible')).toBe('base visible');
  });
});
