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
import EmojiPicker from 'emoji-picker-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from '@/components/ui/toast';
import { Pen, Sparkles, Tag, IndianRupee, Loader2, Smile } from 'lucide-react';

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState('💰');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon || '💰');
      setName(budgetInfo.name || '');
      setAmount(budgetInfo.amount || '');
    }
  }, [budgetInfo, open]);

  const onUpdateBudget = async () => {
    if (!name || !amount) return;

    try {
      setLoading(true);
      const result = await db.update(Budgets)
        .set({
          name: name,
          amount: amount,
          icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

      if (result && result.length > 0) {
        toast.success("Budget Updated Successfully! 🎉");
        setOpen(false);
        setOpenEmojiPicker(false);
        if (refreshData) {
          refreshData();
        }
      }
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={false}>
        <button className='flex gap-2 items-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm'>
          <Pen className='w-4 h-4' /> Edit Budget
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white shadow-2xl border border-slate-100">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-100/80 text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Edit Budget
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-500 text-xs">
            Update budget details, spending targets, or icon.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* Emoji Selection */}
          <div className="flex flex-col items-center justify-center">
            <label className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5 self-start">
              <Smile className="w-3.5 h-3.5 text-indigo-500" /> Choose Budget Icon
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="w-16 h-16 rounded-2xl bg-indigo-50/80 hover:bg-indigo-100 border-2 border-indigo-200/80 hover:border-indigo-400 text-3xl flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer relative"
                title="Click to pick an icon"
              >
                {emojiIcon}
              </button>

              {openEmojiPicker && (
                <div className="absolute left-1/2 -translate-x-1/2 top-18 z-50 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 bg-white">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                    width={300}
                    height={380}
                    lazyLoadEmojis
                  />
                </div>
              )}
            </div>
          </div>

          {/* Budget Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-500" /> Budget Name
            </label>
            <Input
              placeholder="e.g. Home Decor, Groceries, Travel"
              value={name}
              className="h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Budget Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-indigo-500" /> Budget Amount
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="e.g. 5000"
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
            onClick={onUpdateBudget}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Updating...
              </>
            ) : (
              'Update Budget'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;
