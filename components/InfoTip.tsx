export function InfoTip({ id, text, label }: { id: string; text: string; label: string }) {
  return (
    <span className="info-tip">
      <button className="info-trigger" type="button" aria-label={label} aria-describedby={id}>i</button>
      <span className="info-bubble" id={id} role="tooltip">{text}</span>
    </span>
  );
}
