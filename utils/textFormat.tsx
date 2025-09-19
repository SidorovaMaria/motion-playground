function codeFromBackticks(text: string, className?: string): React.ReactNode[] {
  const parts = text.split(/`(.*?)`/g); // split by backticks
  // Replace HTML entities like &#10142; with their actual character
  for (let i = 0; i < parts.length; i++) {
    parts[i] = parts[i].replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  }

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className={`code ${className}`}>
        {part}
      </code>
    ) : (
      part
    )
  );
}
export { codeFromBackticks };
