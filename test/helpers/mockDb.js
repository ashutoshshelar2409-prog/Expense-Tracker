import { vi } from 'vitest';

export function chainResolving(rows) {
  const chain = {
    from: vi.fn(() => chain),
    leftJoin: vi.fn(() => chain),
    innerJoin: vi.fn(() => chain),
    where: vi.fn(() => chain),
    groupBy: vi.fn(() => chain),
    orderBy: vi.fn(() => chain),
    limit: vi.fn(() => chain),
    values: vi.fn(() => chain),
    set: vi.fn(() => chain),
    returning: vi.fn(() => Promise.resolve(rows)),
    // Makes `await db.select(...)....where(...)` resolve even when the
    // real code never calls `.returning()` (plain SELECTs don't).
    then: (resolve) => resolve(rows),
  };
  return chain;
}
