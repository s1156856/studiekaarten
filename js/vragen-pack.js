function packVragen(category, prefix, rows) {
  const TF = ["Waar", "Niet waar"];
  return rows.map((row, i) => {
    const level = row[0];
    const type = row[1];
    const prompt = row[2];
    const isTf = type === "tf";
    return {
      id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
      builtin: true,
      category,
      level,
      type,
      prompt,
      options: isTf ? [...TF] : row[3],
      answer: isTf ? row[3] : row[4],
    };
  });
}
