export function HighlightWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="hl-word">
      <span className="hl-circle" aria-hidden="true" />
      <span className="hl-text">{children}</span>
    </span>
  );
}
