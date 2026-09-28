'use client';
import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartDashboard({ budgetList }) {
    const formattedData = budgetList?.map((item) => ({
        ...item,
        amount: Number(item.amount || 0),
        totalSpend: Number(item.totalSpend || 0),
    }));

    return (
        <div className='border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm'>
            <h2 className='text-base font-bold text-slate-800 mb-4'>Budget Activity Overview</h2>
            {formattedData && formattedData.length > 0 ? (
                <div className='w-full h-80'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={formattedData}
                            margin={{ top: 10, right: 10, left: 15, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                            />
                            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                            <Bar dataKey="totalSpend" name="Total Spend (₹)" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="amount" name="Budget Limit (₹)" fill="#c7d2fe" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className='h-80 flex items-center justify-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium bg-slate-50/50'>
                    No budget data available to display chart.
                </div>
            )}
        </div>
    );
}

export default BarChartDashboard;