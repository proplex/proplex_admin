export function FromHead({ title }: { title: string }) {
  return (
    <div className="w-full text-black">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
