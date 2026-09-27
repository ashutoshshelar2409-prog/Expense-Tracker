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
const { getUserBudgets, createBudget, updateBudget, deleteBudget } = await import(
  '@/actions/budgets'
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

describe('getUserBudgets', () => {
  it('throws when the caller is not authenticated', async () => {
    mockUnauthenticated();
    await expect(getUserBudgets()).rejects.toThrow('Unauthorized');
    expect(db.select).not.toHaveBeenCalled();
  });

  it('returns the query results for a logged-in user', async () => {
    mockAuthenticated();
    const fakeRows = [{ id: 1, name: 'Groceries', totalSpend: 500 }];
    db.select.mockReturnValueOnce(chainResolving(fakeRows));

    const result = await getUserBudgets();

    expect(result).toEqual(fakeRows);
  });
});

describe('createBudget', () => {
  it('rejects a budget with no name or amount', async () => {
    mockAuthenticated();

    await expect(createBudget({ name: '', amount: '' })).rejects.toThrow(
      'Budget name and amount are required.'
    );
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("tags the new budget with the server-verified email, not client input", async () => {
    mockAuthenticated();
    const insertedRow = [{ insertedId: 1 }];
    const chain = chainResolving(insertedRow);
    chain.values.mockImplementation((row) => {
      expect(row.createdBy).toBe(FAKE_EMAIL);
      return chain;
    });
    db.insert.mockReturnValueOnce(chain);

    const result = await createBudget({ name: 'Travel', amount: '1000' });

    expect(result).toEqual({ success: true, data: insertedRow });
  });
});

describe('updateBudget', () => {
  it("refuses to update a budget the caller doesn't own", async () => {
    mockAuthenticated();
    db.update.mockReturnValueOnce(chainResolving([]));

    await expect(
      updateBudget({ budgetId: 99, name: 'Hack', amount: '1' })
    ).rejects.toThrow('Unauthorized');
  });
});

describe('deleteBudget', () => {
  it('refuses to delete a budget the caller does not own', async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([]));

    await expect(deleteBudget(42)).rejects.toThrow('Unauthorized');
    expect(db.delete).not.toHaveBeenCalled();
  });

  it('deletes child expenses before deleting the budget itself', async () => {
    mockAuthenticated();
    db.select.mockReturnValueOnce(chainResolving([{ id: 42 }]));

    const deletedTables = [];
    db.delete.mockImplementation((table) => {
      deletedTables.push(table);
      return chainResolving([{ id: 42 }]);
    });

    await deleteBudget(42);

    expect(deletedTables.length).toBe(2);
  });
});
