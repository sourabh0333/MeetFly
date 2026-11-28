import Link from "next/link";

// Guide text with **bold** and [links](/path). Internal links use next/link.
export function Rich({ text }) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k++}>{m[1]}</strong>);
    else if (m[3].startsWith("/")) parts.push(<Link key={k++} href={m[3]}>{m[2]}</Link>);
    else parts.push(<a key={k++} href={m[3]}>{m[2]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Plain text for structured data and descriptions.
export const plain = (text) => text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
