import React from 'react';
import ScriptureLink from './ScriptureLink';

interface ScriptureTextProps {
  text: string;
  className?: string;
  linkClassName?: string;
}

const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Psalm',
  'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea',
  'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
  'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation',
  // Common Abbreviations
  'Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Josh', 'Judg', '1 Sam', '2 Sam', '1 Kin', '2 Kin', '1 Chr', '2 Chr', 'Neh', 'Esth', 'Psa', 'Prov', 'Ecc', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal',
  'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1 Cor', '2 Cor', 'Gal', 'Eph', 'Phi', 'Col', '1 The', '2 The', '1 Tim', '2 Tim', 'Tit', 'Phm', 'Heb', 'Jam', '1 Pet', '2 Pet', '1 Joh', '2 Joh', '3 Joh', 'Rev'
];

// Regex to match Bible references like "Romans 16:25" or "1 Corinthians 12:13-14"
const scriptureRegex = new RegExp(
  `\\b(?:${BIBLE_BOOKS.join('|')})\\.?\\s*\\d+\\s*:\\s*\\d+(?:\\s*[–-]\\s*\\d+)?\\b`,
  'g'
);

export default function ScriptureText({ text, className, linkClassName }: ScriptureTextProps) {
  if (!text) return null;

  const parts = text.split(scriptureRegex);
  const matches = text.match(scriptureRegex);

  if (!matches) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {matches[i] && (
            <ScriptureLink reference={matches[i]} className={linkClassName} />
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
