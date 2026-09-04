'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses as ExpensesTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from '@/components/ui/toast';
import { Pen, Tag, IndianRupee, Loader2 } from 'lucide-react';

function EditExpense({ expense, refreshData }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense) {
      setName(expense.name || '');
      setAmount(expense.amount || '');
    }
  }, [expense, open]);

  const onUpdateExpense = async () => {
    if (!name || !amount) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await db.update(ExpensesTable)
        .set({
          name: name,
          amount: amount,
        })
        .where(eq(ExpensesTable.id, expense.id))
        .returning();

      if (result) {
        toast.success("Expense Updated Successfully! ✏️");
        setOpen(false);
        if (refreshData) {
          refreshData();
        }
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={false}>
        <button
          className='text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-all'
          title="Edit Expense"
        >
          <Pen className='w-4 h-4' />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white shadow-2xl border border-slate-100">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-100/80 text-indigo-600">
              <Pen className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Edit Expense
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-500 text-xs">
            Update the title or amount of your expense item.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Expense Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-500" /> Expense Name
            </label>
            <Input
              placeholder="e.g. Home Decor"
              value={name}
              className="h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Expense Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-indigo-500" /> Expense Amount
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="e.g. 4500"
                value={amount}
                className="h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-sm pl-8"
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                ₹
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            disabled={!(name && amount) || loading}
            onClick={onUpdateExpense}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              'Update Expense'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpense;
