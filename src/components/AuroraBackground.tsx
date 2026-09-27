export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-brand/40 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-rose/30 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 size-[30rem] rounded-full bg-azure/25 blur-[130px]" />
    </div>
  );
}
