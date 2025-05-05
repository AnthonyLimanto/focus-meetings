import { useEffect, useState } from "react";
import { useSessionStore } from "../session/sessionStore";
import { formatSeconds } from "../utils/timerUtils";
import PieChartTimer from "./PieChartTimer";
import { Box, Button, Heading } from "@vibe/core";
import soundFile from "../assets/sounds/s3_spring_rain.mp3";

export default function TimerView() {
  const {
    remaining,
    startSession,
    resumeSession,
    pauseSession,
    isRunning,
    intervals,
    intervalsTitle,
    currentIndex,
    removeIntervals,
    isFinished,
    intervalsColour,
    goToNextInterval,
    stayInCurrentInterval,
  } = useSessionStore();

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  console.log("Timer State:", useSessionStore.getState());

  useEffect(() => {
    const newAudio = new Audio(soundFile);
    newAudio.volume = 0.1;

    // Play sound when the current interval finishes
    if (remaining === 0) {
      try {
        newAudio.play();
        setAudio(newAudio);
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }

    return () => {
      try {
        newAudio.pause();
        newAudio.currentTime = 0;
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    };
  }, [remaining]); // Dependency array includes `remaining`

  if (!intervals.length) return <div style={Styles.noSession}>No meeting session found.</div>;

  const currentTopic = intervalsTitle[currentIndex] || "Untitled";

  return (
    <Box style={Styles.container}>
      {/* Current Topic and Time Left */}
      <Box style={Styles.topicBox}>
        <Heading type="h2" align="center" style={Styles.topicHeading}>
          Current Topic: {currentTopic}
        </Heading>
        {isFinished && (
          <Heading type="h3" align="center" style={Styles.finishedHeading}>
            Timer Done
          </Heading>
        )}
        <Heading type="h3" align="center" style={Styles.timeLeft}>
          Time Left: {formatSeconds(remaining)}
        </Heading>
      </Box>

      {/* Pie Chart Timer */}
      <Box style={Styles.timerBox}>
        <PieChartTimer />
      </Box>

      {/* Control Buttons */}
      <Box style={Styles.buttonRow}>
        <Button  onClick={() => startSession(intervals)}>
          Start Meeting
        </Button>

        {isRunning ? (
          <Button onClick={() => pauseSession()}>
            Pause
          </Button>
        ) : (
          <Button onClick={() => resumeSession()}>
            Resume
          </Button>
        )}

        <Button onClick={() => removeIntervals()}>
          Reset
        </Button>
        <Button onClick={() => goToNextInterval()}>
          Next Interval
        </Button>
        <Button onClick={() => stayInCurrentInterval()}>
          Stay in Current Interval
        </Button>
        <Button onClick={() => audio?.pause()}>
          Stop Alarm
        </Button>
      </Box>
    </Box>
  );
}

// --- Styles ---
const Styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "flex-start", // Align content to the top
    padding: "20px",
    backgroundColor: "#CCE7F6", // Slightly darker blue
    minHeight: "30vh",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  noSession: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center" as const,
    marginTop: "50px",
  },
  topicBox: {
    backgroundColor: "#E6F7FF", // Light blue
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    marginTop: "10px", // Reduce space above the header
    width: "90%",
    maxWidth: "600px",
    textAlign: "center" as const,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  topicHeading: {
    marginBottom: "10px",
    color: "#333",
  },
  finishedHeading: {
    color: "#FF4D4F", // Red for finished
    marginBottom: "10px",
  },
  timeLeft: {
    color: "#555",
  },
  timerBox: {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row" as const,
    gap: "10px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    marginTop: "20px",
  },
};