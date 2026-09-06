import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React from 'react'

function CardInfo({budgetList}) {
  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='p-7 border rounded-lg flex justify-between items-center'>
            <div>
                <h2 className='text-sm'>Total Budget</h2>
                <h2 className='font-bold text-2xl'>1300</h2>
            </div>
            <PiggyBank className='h-12 w-12 rounded-3'/>
        </div>
                <div className='p-7 border rounded-lg flex justify-between items-center'>
            <div>
                <h2 className='text-sm'>Total spend</h2>
                <h2 className='font-bold text-2xl'>1300</h2>
            </div>
            <ReceiptText className='h-12 w-12 rounded-3'/>
        </div>
                <div className='p-7 border rounded-lg flex justify-between items-center'>
            <div>
                <h2 className='text-sm'>No of Budget</h2>
                <h2 className='font-bold text-2xl'>1300</h2>
            </div>
            <Wallet className='h-12 w-12 rounded-3'/>
        </div>
    </div>
  )
}

export default CardInfo
