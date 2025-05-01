import { useSessionStore } from "../session/sessionStore";
import { formatSeconds } from "../utils/timerUtils";

export default function SummaryView() {
  const {
    intervals,
    intervalsTitle,
    actualTimeTakenForSlice,
    isFinished
  } = useSessionStore();

  if (!isFinished) {
    return (
      <div>
        <h2>Meeting Summary</h2>
        <p>The meeting hasn't finished yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Meeting Summary</h2>
      {intervals.map((planned, i) => {
        const title = intervalsTitle[i] || `Slice ${i + 1}`;
        const actual = actualTimeTakenForSlice[i] || 0;
        const diff = actual - planned;
        const isOver = diff > 0;

        return (
          <div key={i} style={{
            padding: '10px',
            margin: '10px 0',
            backgroundColor: isOver ? '#FFEAEA' : '#E8F5E9',
            borderLeft: `5px solid ${isOver ? '#E53935' : '#43A047'}`
          }}>
            <h4>{title}</h4>
            <p>
              ⏱ Planned: {formatSeconds(planned)}<br />
              ✅ Actual: {formatSeconds(actual)}<br />
              {isOver ? '⏳ Over by' : '✔️ Under by'} {formatSeconds(Math.abs(diff))}
            </p>
          </div>
        );
      })}
    </div>
  );
}
