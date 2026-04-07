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
  'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

// Regex to match Bible references like "Romans 16:25" or "1 Corinthians 12:13-14"
const scriptureRegex = new RegExp(
  `\\b(?:${BIBLE_BOOKS.join('|')})\\s+\\d+:\\d+(?:[–-]\\d+)?\\b`,
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
