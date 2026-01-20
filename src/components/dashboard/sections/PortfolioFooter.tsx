import React from 'react';

interface FooterStatProps {
  label: string;
  value: string;
  operator?: string;
}

const FooterStat = ({ label, value, operator }: FooterStatProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative py-4 group hover:bg-white/40 transition-colors">
      {/* Visual Operator (+ or =) placed between columns */}
      {operator && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-gray-300 font-light select-none">
          {operator}
        </span>
      )}
      
      <div className="text-[22px] font-bold text-[#1e272e] tracking-tight">
        {value}
      </div>
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
};

export const PortfolioFooter = () => {
  // In a real application, these values would come from a Global State (like Redux, Context, or Zustand)
  const stats = [
    { label: 'Cash Available', value: '$0.00' },
    { label: 'Total Invested', value: '$0.00', operator: '+' },
    { label: 'Profit/Loss', value: '$0.00', operator: '+' },
    { label: 'Portfolio Value', value: '$0.00', operator: '=' },
  ];

  return (
    <footer className="bg-[#f4f7f9] border-t border-gray-200 w-full sticky bottom-0 z-20">
      <div className="flex divide-x divide-gray-200">
        {stats.map((stat, index) => (
          <FooterStat 
            key={stat.label} 
            label={stat.label} 
            value={stat.value} 
            operator={stat.operator} 
          />
        ))}
      </div>
    </footer>
  );
};