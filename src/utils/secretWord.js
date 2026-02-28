export async function loadSecretWord(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  const html = await resp.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = (doc.body?.textContent ?? "").trim().toLowerCase();

  const m = text.match(/\b[a-z]{5}\b/);
  if (!m) throw new Error("No 5-letter word found in response body");
  return m[0].toUpperCase();
}
