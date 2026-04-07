"use client";

import { useEffect, useMemo, useState } from "react";

type PasswordOptions = {
  length: number;
  count: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
};

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const SIMILAR_CHARS = "Il1O0";

function randomInt(max: number) {
  const webCrypto = globalThis.crypto;
  if (webCrypto?.getRandomValues) {
    const array = new Uint32Array(1);
    webCrypto.getRandomValues(array);
    return array[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function shuffle(value: string) {
  const chars = value.split("");

  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
  }

  return chars.join("");
}

function buildCharSet(source: string, excludeSimilar: boolean) {
  if (!excludeSimilar) {
    return source;
  }

  return source
    .split("")
    .filter((char) => !SIMILAR_CHARS.includes(char))
    .join("");
}

function generateOnePassword(options: PasswordOptions) {
  const sets: string[] = [];

  if (options.includeUppercase) {
    sets.push(buildCharSet(UPPERCASE, options.excludeSimilar));
  }

  if (options.includeLowercase) {
    sets.push(buildCharSet(LOWERCASE, options.excludeSimilar));
  }

  if (options.includeNumbers) {
    sets.push(buildCharSet(NUMBERS, options.excludeSimilar));
  }

  if (options.includeSymbols) {
    sets.push(buildCharSet(SYMBOLS, options.excludeSimilar));
  }

  const validSets = sets.filter((set) => set.length > 0);

  if (validSets.length === 0) {
    throw new Error("Select at least one character type.");
  }

  const targetLength = Math.max(options.length, validSets.length);
  const merged = validSets.join("");
  const chars: string[] = [];

  // Ensure every enabled character group appears at least once.
  for (const set of validSets) {
    chars.push(set[randomInt(set.length)]);
  }

  while (chars.length < targetLength) {
    chars.push(merged[randomInt(merged.length)]);
  }

  return shuffle(chars.join(""));
}

export default function PasswordGeneratorPanel() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const options = useMemo<PasswordOptions>(
    () => ({
      length,
      count,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      excludeSimilar,
    }),
    [count, excludeSimilar, includeLowercase, includeNumbers, includeSymbols, includeUppercase, length],
  );

  function buildPasswords(nextOptions: PasswordOptions) {
    return Array.from({ length: nextOptions.count }, () => generateOnePassword(nextOptions));
  }

  function generatePasswords() {
    setError("");
    setCopyStatus("");

    try {
      const next = buildPasswords(options);
      setGeneratedPasswords(next);
    } catch (generationError) {
      setGeneratedPasswords([]);
      setError(generationError instanceof Error ? generationError.message : "Unable to generate passwords.");
    }
  }

  useEffect(() => {
    try {
      setError("");
      setGeneratedPasswords(buildPasswords(options));
    } catch (generationError) {
      setGeneratedPasswords([]);
      setError(generationError instanceof Error ? generationError.message : "Unable to generate passwords.");
    }
  }, [options]);

  async function copyPassword(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("Password copied.");
    } catch {
      setCopyStatus("Copy failed. Please copy manually.");
    }
  }

  async function copyAllPasswords() {
    if (!generatedPasswords.length) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPasswords.join("\n"));
      setCopyStatus("All generated passwords copied.");
    } catch {
      setCopyStatus("Copy failed. Please copy manually.");
    }
  }

  return (
    <section className="tool-shell" aria-label="Password generator tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Security utility</p>
          <h2>Password Generator</h2>
          <p className="panel-subtext">
            Generate secure passwords instantly in your browser. We never store generated passwords in any database.
          </p>
        </div>
      </div>

      <div className="two-col-fields">
        <label className="field">
          <span>Password length: {length}</span>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(event) => setLength(Number.parseInt(event.target.value, 10))}
          />
        </label>

        <label className="field">
          <span>How many passwords</span>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(event) => {
              const parsed = Number.parseInt(event.target.value, 10);
              setCount(Number.isNaN(parsed) ? 1 : Math.max(1, Math.min(20, parsed)));
            }}
          />
        </label>
      </div>

      <div className="two-col-fields">
        <label className="field field-checkbox">
          <span className="checkbox-inline">
            <input type="checkbox" checked={includeUppercase} onChange={(event) => setIncludeUppercase(event.target.checked)} />
            Include uppercase (A-Z)
          </span>
        </label>

        <label className="field field-checkbox">
          <span className="checkbox-inline">
            <input type="checkbox" checked={includeLowercase} onChange={(event) => setIncludeLowercase(event.target.checked)} />
            Include lowercase (a-z)
          </span>
        </label>

        <label className="field field-checkbox">
          <span className="checkbox-inline">
            <input type="checkbox" checked={includeNumbers} onChange={(event) => setIncludeNumbers(event.target.checked)} />
            Include numbers (0-9)
          </span>
        </label>

        <label className="field field-checkbox">
          <span className="checkbox-inline">
            <input type="checkbox" checked={includeSymbols} onChange={(event) => setIncludeSymbols(event.target.checked)} />
            Include symbols (!@#$...)
          </span>
        </label>

        <label className="field field-checkbox">
          <span className="checkbox-inline">
            <input type="checkbox" checked={excludeSimilar} onChange={(event) => setExcludeSimilar(event.target.checked)} />
            Exclude similar characters (I, l, 1, O, 0)
          </span>
        </label>
      </div>

      <div className="control-row">
        <button type="button" className="btn primary" onClick={generatePasswords}>
          Generate Passwords
        </button>
        <button type="button" className="btn" onClick={() => void copyAllPasswords()} disabled={!generatedPasswords.length}>
          Copy all
        </button>
      </div>

      {error ? <p className="error">{error}</p> : null}
      {copyStatus ? <p className="panel-subtext">{copyStatus}</p> : null}

      <section className="editor-card" aria-labelledby="generated-passwords-title">
        <p id="generated-passwords-title">Generated Passwords</p>
        {generatedPasswords.length ? (
          <ul className="password-list">
            {generatedPasswords.map((password, index) => (
              <li key={`${password}-${index}`} className="password-list-item">
                <code>{password}</code>
                <button type="button" className="btn" onClick={() => void copyPassword(password)}>
                  Copy
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="panel-subtext">Choose your settings and click Generate Passwords.</p>
        )}
      </section>
    </section>
  );
}
