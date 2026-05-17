import { useState, useEffect, memo } from 'react';

const terminalContent = [
  { text: 'ksatria@dev:~$ nmap -sV ksatria.dev', isPrompt: true },
  { text: '', isPrompt: false },
  { text: 'PORT     STATE SERVICE', isPrompt: false },
  { text: '22/tcp   open  ssh', isPrompt: false },
  { text: '80/tcp   open  http', isPrompt: false },
  { text: '443/tcp  open  https', isPrompt: false },
  { text: '3000/tcp open  nextjs', isPrompt: false },
  { text: '', isPrompt: false },
  { text: 'ksatria@dev:~$ scan complete. 0 vulnerabilities found.', isPrompt: true },
] as const;

export const Terminal = memo(function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (lineIndex >= terminalContent.length) {
      setTypingComplete(true);
      return;
    }
    const currentLineData = terminalContent[lineIndex];
    if (charIndex < currentLineData.text.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLineData.text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLineData.text]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex(lineIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex]);

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: '#0D1117',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 font-jetbrains text-xs text-text-muted">ksatria@dev: ~</span>
      </div>
      <div className="p-4 font-jetbrains text-sm leading-relaxed min-h-[220px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {terminalContent[i].isPrompt ? (
              <>
                <span className="text-purple-400">ksatria@dev:~$</span>{' '}
                <span className="text-text-primary">{line.replace('ksatria@dev:~$ ', '')}</span>
              </>
            ) : (
              <span className="text-text-primary">{line}</span>
            )}
          </div>
        ))}
        {lineIndex < terminalContent.length && (
          <div className="whitespace-pre-wrap">
            {terminalContent[lineIndex].isPrompt && (
              <span className="text-purple-400">ksatria@dev:~$ </span>
            )}
            <span className="text-text-primary">
              {terminalContent[lineIndex].isPrompt
                ? currentLine.replace('ksatria@dev:~$ ', '')
                : currentLine}
            </span>
            {!typingComplete && (
              <span className="text-purple-400 animate-blink">&#9604;</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
