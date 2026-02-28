import { useEffect, useState } from "react";
import { loadSecretWord } from "../utils/secretWord";

export function useSecretWord(url) {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const word = await loadSecretWord(url);
        if (!cancelled) setSecret(word);
      } catch (e) {
        if (!cancelled) setError(e.message ?? "Failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { secret, loading, error };
}
