import React from 'react';
import { Users, Briefcase, ChevronUp, ChevronDown, Info } from 'lucide-react';

interface DiscoverRowProps {
  title: string;
  icon: React.ReactNode;
  buttonLabel: string;
  columns: string[];
}

const DiscoverRow = ({ title, icon, buttonLabel, columns }: DiscoverRowProps) => {
  return (
    <div className="bg-white border-b border-gray-100 last:border-0">
      {/* Table Header */}
      <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-50 bg-white sticky top-0">
        <div className="col-span-4 text-[13px] font-bold text-[#1e272e]">{title}</div>
        <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1 justify-end">
          {columns[0]} <div className="flex flex-col"><ChevronUp size={8}/><ChevronDown size={8}/></div>
        </div>
        <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase text-center">{columns[1]}</div>
        <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase text-center">{columns[2]}</div>
        <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase text-center">{columns[3]}</div>
      </div>

      {/* Empty State / CTA Button */}
      <div className="py-12 flex justify-center items-center bg-white group cursor-pointer hover:bg-gray-50/50 transition-colors">
        <button className="flex items-center gap-3 text-sm font-bold text-[#1e272e] group-hover:text-[#46b445] transition-colors">
          <div className="text-gray-400 group-hover:text-[#46b445]">
            {icon}
          </div>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export const DiscoverSection = () => {
  return (
    <section className="mt-8 space-y-0 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      {/* People Table */}
      <DiscoverRow 
        title="People" 
        icon={<Users size={20} strokeWidth={1.5} />}
        buttonLabel="Discover People"
        columns={['Return 1M', 'Risk', 'Copiers', 'Change']}
      />

      {/* Smart Portfolios Table */}
      <DiscoverRow 
        title="Smart Portfolios" 
        icon={<Briefcase size={20} strokeWidth={1.5} />}
        buttonLabel="Discover Smart Portfolios"
        columns={['Return 1M', 'Risk', 'Investors', 'Change']}
      />

      {/* Important Disclosures Footer */}
      <div className="bg-[#edf1f4] py-8 flex justify-center items-center gap-2">
        <span className="text-sm text-gray-500">
          See <button className="font-bold text-[#1e272e] hover:underline">important disclosures</button>
        </span>
        <Info size={16} className="text-gray-400 cursor-pointer" />
      </div>
    </section>
  );
};