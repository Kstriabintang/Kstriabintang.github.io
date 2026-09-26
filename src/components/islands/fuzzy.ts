// Tiny fuzzy matcher for the command palette: substring and word-start hits score highest,
// then in-order subsequence matches. Returns 0 when the query does not match at all.

function subsequenceScore(query: string, text: string): number {
  let qi = 0;
  let score = 0;
  let streak = 0;
  for (let ti = 0; ti < text.length && qi < query.length; ti++) {
    if (text[ti] === query[qi]) {
      const wordStart = ti === 0 || /[\s\-—/_.]/.test(text[ti - 1]);
      streak += 1;
      score += 1 + streak + (wordStart ? 3 : 0);
      qi += 1;
    } else {
      streak = 0;
    }
  }
  return qi === query.length ? score : 0;
}

export function fuzzyScore(query: string, title: string, keywords = ''): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const t = title.toLowerCase();
  const k = keywords.toLowerCase();

  let score = 0;
  const idx = t.indexOf(q);
  if (idx === 0) score = 100;
  else if (idx > 0) score = /[\s\-—/]/.test(t[idx - 1]) ? 80 : 60;
  else {
    const words = q.split(/\s+/).filter(Boolean);
    const allInTitle = words.every((w) => t.includes(w));
    const allAnywhere = words.every((w) => t.includes(w) || k.includes(w));
    if (allInTitle) score = 50;
    else if (allAnywhere) score = 30;
    else score = Math.min(25, subsequenceScore(q, t));
  }
  return score;
}

export function rank<T extends { title: string; keywords?: string }>(items: T[], query: string, limit = 40): T[] {
  return items
    .map((item, i) => ({ item, i, s: fuzzyScore(query, item.title, item.keywords) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map((r) => r.item);
}
