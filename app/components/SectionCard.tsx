export default function SectionCard({ title, children }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white backdrop-blur-xl shadow-xl">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
