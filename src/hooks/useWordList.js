import { useEffect, useMemo, useState } from "react";

export function useWordList(wordListUrl) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(wordListUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const contents = await response.text();
        if (!cancelled) setText(contents);
      } catch (e) {
        if (!cancelled) setError(e.message ?? "Failed to load words");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [wordListUrl]);

  const wordSet = useMemo(() => {
    return new Set(
      text
        .toLowerCase()
        .split(/\r?\n/)
        .map((word) => word.trim())
        .filter(Boolean)
    );
  }, [text]);

  return { wordSet, loading, error };
}
