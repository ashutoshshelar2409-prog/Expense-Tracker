import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chainResolving } from '../helpers/mockDb';

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
  currentUser: vi.fn(),
}));

vi.mock('@/utils/dbConfig', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const { auth, currentUser } = await import('@clerk/nextjs/server');
const { db } = await import('@/utils/dbConfig');
const { getUserExpenses, createExpense, updateExpense, deleteExpense } = await import(
  '@/actions/expenses'
);

const FAKE_EMAIL = 'ashu@example.com';

function mockAuthenticated() {
  auth.mockResolvedValue({ userId: 'user_123' });
  currentUser.mockResolvedValue({ primaryEmailAddress: { emailAddress: FAKE_EMAIL } });
}

function mockUnauthenticated() {
  auth.mockResolvedValue({ userId: null });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getUserExpenses', () => {
  it('throws when the caller is not authenticated', async () => {
    mockUnauthenticated();
    await expect(getUserExpenses()).rejects.toThrow('Unauthorized');
  });
});

describe('createExpense', () => {
  it('rejects an expense targeting a budget the caller does not own', async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([]));

    await expect(
      createExpense({ name: 'Coffee', amount: '150', budgetId: 999 })
    ).rejects.toThrow('Unauthorized');
    expect(db.insert).not.toHaveBeenCalled();
  });

  it('inserts the expense once the target budget is confirmed owned', async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([{ id: 5 }]));
    const insertedRow = [{ id: 1 }];
    db.insert.mockReturnValueOnce(chainResolving(insertedRow));

    const result = await createExpense({ name: 'Coffee', amount: '150', budgetId: 5 });

    expect(result).toEqual({ success: true, data: insertedRow });
  });
});

describe('updateExpense', () => {
  it("refuses to update an expense that isn't the caller's (via parent budget)", async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([]));

    await expect(
      updateExpense({ expenseId: 7, name: 'Hacked', amount: '1' })
    ).rejects.toThrow('Unauthorized');
    expect(db.update).not.toHaveBeenCalled();
  });
});

describe('deleteExpense', () => {
  it("refuses to delete an expense that isn't the caller's (via parent budget)", async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([]));

    await expect(deleteExpense(7)).rejects.toThrow('Unauthorized');
    expect(db.delete).not.toHaveBeenCalled();
  });

  it('deletes the expense once ownership through the parent budget is confirmed', async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([{ id: 7 }]));
    db.delete.mockReturnValueOnce(chainResolving([{ id: 7 }]));

    const result = await deleteExpense(7);

    expect(result).toEqual({ success: true, data: [{ id: 7 }] });
  });
});
