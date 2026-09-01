'use client';
import React, { useState } from 'react';
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
import { toast } from '@/components/ui/toast';
import { useUser } from '@clerk/nextjs';
import { Plus, Sparkles, Tag, IndianRupee, Loader2, Smile } from 'lucide-react';

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState('💰');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const onCreateBudget = async () => {
    if (!name || !amount) return;

    try {
      setLoading(true);
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      if (!userEmail) {
        toast.error("User email not found. Please log in again.");
        return;
      }

      const result = await db.insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: userEmail,
          icon: emojiIcon
        })
        .returning({ insertedId: Budgets.id });

      if (result && result.length > 0) {
        toast.success("New Budget Created Successfully! 🎉");
        setName('');
        setAmount('');
        setEmojiIcon('💰');
        setOpen(false);
        setOpenEmojiPicker(false);
        if (refreshData) {
          refreshData();
        }
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='w-full text-left'>
          <div className='group relative h-45 w-full bg-slate-50/60 hover:bg-indigo-50/40 p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 cursor-pointer shadow-xs hover:shadow-md transform hover:-translate-y-0.5'>
            <div className='w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs'>
              <Plus className='w-6 h-6 stroke-[2.5]' />
            </div>
            <div className='text-center'>
              <h2 className='font-semibold text-slate-800 text-base group-hover:text-indigo-600 transition-colors'>
                Create New Budget
              </h2>
              <p className='text-xs text-slate-500 font-normal mt-0.5'>
                Set spending limit for a category
              </p>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-106.25 rounded-2xl p-6 bg-white shadow-2xl border border-slate-100">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-100/80 text-indigo-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                Create New Budget
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 text-xs">
              Configure a target budget and icon to monitor your category expenses.
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
              onClick={onCreateBudget}
              className="w-full h-11 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                </>
              ) : (
                'Create Budget'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
