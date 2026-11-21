export function SectionHead({ label, title, intro, id }: { label: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <p className="label">{label}</p>
      <h2 id={id} className="h-display mt-2 text-4xl sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-muted">{intro}</p>}
    </header>
  );
}
