import { useSignal } from '@preact/signals';
import { Truncated } from './Truncated';
import { useRef } from 'preact/hooks';

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useSignal(800);
  const first = useSignal(6);
  const last = useSignal(4);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: width.value, backgroundColor: 'lightgray' }}
      >
        <Truncated
          text="0x3bb57db5644d972106b08fbe5d87864bc78313096ab5f15a44e354838190737a"
          preserveFirstNChars={first.value}
          preserveLastNChars={last.value}
        />
      </div>

      <div>Preserve first n characters</div>
      <input
        value={first.value}
        onChange={(e) => (first.value = parseInt(e.currentTarget.value))}
      />

      <div>Preserve last n characters</div>
      <input
        value={last.value}
        onChange={(e) => (last.value = parseInt(e.currentTarget.value))}
      />

      <div>
        Resize <span>{width.value}px</span>
      </div>
      <input
        type="range"
        min="0"
        max="800"
        value={width.value}
        onInput={(e) => (width.value = parseInt(e.currentTarget.value))}
      />
    </>
  );
}
