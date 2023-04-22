import { useComputed, useSignal } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';

type Props = {
  text: string;
  separator?: string;
  preserveFirstNChars?: number;
  preserveLastNChars?: number;
};

export const Truncated = ({
  text,
  separator = '...',
  preserveFirstNChars = 6,
  preserveLastNChars = 4,
}: Props) => {
  const charWidth = useSignal(0);
  const containerWidth = useSignal(0);
  const spacerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const truncatedText = useComputed(() => {
    const charCapacity = Math.floor(containerWidth.value / charWidth.value);

    if (charCapacity >= text.length) return text;

    const minChars =
      preserveFirstNChars + separator.length + preserveLastNChars;
    const right = text.slice(-preserveLastNChars);
    const left = text.slice(
      0,
      charCapacity - (preserveLastNChars + separator.length)
    );

    if (charCapacity <= minChars) {
      return `${text.slice(0, preserveFirstNChars)}${separator}${text.slice(
        -preserveLastNChars
      )}`;
    }

    return `${left}${separator}${right}`;
  });

  useEffect(() => {
    if (spacerRef.current === null) return;
    charWidth.value = spacerRef.current.getBoundingClientRect().width;
  }, [spacerRef.current]);

  useEffect(() => {
    const container = textRef.current;
    if (container === null) return;
    const resizeObserver = new ResizeObserver(
      () => (containerWidth.value = container.getBoundingClientRect().width)
    );
    resizeObserver.observe(container);
    return () => resizeObserver.unobserve(container);
  }, [textRef.current]);

  return (
    <>
      <div
        ref={textRef}
        style={{ textAlign: 'right', fontFamily: 'monospace' }}
      >
        {truncatedText}
      </div>
      <span
        style={{
          fontFamily: 'monospace',
          visibility: 'invisible',
          position: 'absolute',
          left: '-10px',
          top: '-10px',
        }}
        ref={spacerRef}
      >
        X
      </span>
    </>
  );
};
