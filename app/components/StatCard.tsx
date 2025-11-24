export default function StatCard({ title, value, icon }: any) {
  return (
    <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xl 
      shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer text-white">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-300 text-sm">{title}</h2>
        {icon}
      </div>

      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
