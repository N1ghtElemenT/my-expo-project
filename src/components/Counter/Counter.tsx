import { useCounterStore } from "../../store/useCounterStore";
import CounterView from "./CounterView";

export default function Counter() {
  const count = useCounterStore((s) => s.count);
  const up = useCounterStore((s) => s.up);
  const down = useCounterStore((s) => s.down);
  const reset = useCounterStore((s) => s.reset);

  return (
    <CounterView count={count} onUp={up} onDown={down} onReset={reset} />
  );
}
