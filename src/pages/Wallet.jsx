import React from 'react';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, History } from 'lucide-react';

export default function Wallet() {
  const transactions = [
    { id: 'TXN-001', title: 'Metro Ticket (Aqua Line)', type: 'debit', amount: 30, date: 'Today, 2:15 PM', status: 'Success' },
    { id: 'TXN-002', title: 'Wallet Top-up via UPI', type: 'credit', amount: 500, date: 'Yesterday, 10:30 AM', status: 'Success' },
    { id: 'TXN-003', title: 'PMPL Daily Pass', type: 'debit', amount: 50, date: '12 Aug, 08:00 AM', status: 'Success' },
    { id: 'TXN-004', title: 'Uber Auto (Swargate)', type: 'debit', amount: 120, date: '10 Aug, 06:45 PM', status: 'Success' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Wallet</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Manage your MobilityOS balance and payment methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="md:col-span-2 bg-[var(--color-navy)] rounded-[var(--radius-lg)] p-8 text-white relative overflow-hidden shadow-[var(--shadow-modal)]">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <WalletIcon size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-slate-300 font-medium tracking-wider uppercase text-sm mb-2">Available Balance</p>
            <h2 className="text-5xl font-bold mb-8">₹450.00</h2>
            <div className="flex gap-4">
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded-[var(--radius-md)] font-medium transition-colors shadow-sm flex items-center gap-2">
                <Plus size={20} /> Add Money
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-[var(--radius-md)] font-medium transition-colors backdrop-blur-sm">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-[var(--color-text-secondary)]" /> Payment Methods
          </h3>
          <div className="space-y-3">
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-800 text-xs">UPI</div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Google Pay</p>
                  <p className="text-xs text-[var(--color-text-muted)]">user@okicici</p>
                </div>
              </div>
            </div>
            <div className="p-3 border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-12 bg-blue-50 rounded flex items-center justify-center font-bold text-blue-800 text-xs">VISA</div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">•••• 4242</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Expires 12/28</p>
                </div>
              </div>
            </div>
            <button className="w-full py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] rounded-[var(--radius-md)] transition-colors mt-2">
              + Add New Method
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className="font-bold text-[var(--color-text-primary)] text-lg flex items-center gap-2">
            <History size={20} /> Transaction History
          </h3>
          <button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] font-medium">Download Statement</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Transaction</th>
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-50 text-[var(--color-success)]' : 'bg-slate-100 text-[var(--color-text-secondary)]'}`}>
                        {txn.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--color-text-primary)] text-sm">{txn.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{txn.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[var(--color-text-secondary)]">{txn.date}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-50 text-[var(--color-success)] text-xs font-bold rounded-full">{txn.status}</span>
                  </td>
                  <td className={`p-4 text-right font-bold ${txn.type === 'credit' ? 'text-[var(--color-success)]' : 'text-[var(--color-text-primary)]'}`}>
                    {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}