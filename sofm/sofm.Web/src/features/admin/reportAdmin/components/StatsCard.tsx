export const StatsCard = ({ title, value, icon }: { title: string, value: string | number, icon: string }) => {
  return (
    <div className="bg-[#1f2120] p-6 rounded-2xl border border-[#4a463d]">
      <p className="text-[#a0a09e] mb-2">{title} {icon}</p>
      <h2 className="text-4xl font-bold text-white">{value}</h2>
    </div>
  );
};