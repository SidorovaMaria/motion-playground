function codeFromBackticks(text: string) {
  const parts = text.split(/`(.*?)`/g); // split by backticks
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="code">
        {part}
      </code>
    ) : (
      part
    )
  );
}
export { codeFromBackticks };
