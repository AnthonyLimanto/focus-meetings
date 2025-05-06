import { useEffect, useState } from "react";
import { useSessionStore } from "../session/sessionStore";
import { formatSeconds } from "../utils/timerUtils";
import PieChartTimer from "./PieChartTimer";
import { Box, Button, Heading } from "@vibe/core";
import soundFile from "../assets/sounds/s3_spring_rain.mp3";
import TimerViewStyles from "../styles/TimerViewStyles";

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
    isExtension,
    isStarted,
    isExtended,
    goToNextInterval,
    stayInCurrentInterval,
  } = useSessionStore();

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

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
  }, [remaining]);

  if (!intervals.length) return <div style={TimerViewStyles.noSession}>No meeting session found.</div>;

  const currentTopic = intervalsTitle[currentIndex] || "Untitled";

  return (
    <Box style={TimerViewStyles.container}>
      {/* Current Topic and Time Left */}
      <Box style={TimerViewStyles.topicBox}>
        <Heading type="h2" align="center" style={TimerViewStyles.topicHeading}>
          Current Topic: {currentTopic}
        </Heading>
        {isFinished ? (
          <Heading type="h3" align="center" style={TimerViewStyles.finishedHeading}>
            Timer Done
          </Heading>
        ) : (
          remaining !== 999 && ( // Only show "Time Left" if remaining is not 999
            <Heading type="h3" align="center" style={TimerViewStyles.timeLeft}>
              Time Left: {formatSeconds(remaining)}
            </Heading>
          )
        )}
      </Box>

      {/* Pie Chart Timer */}
      <Box style={TimerViewStyles.timerBox}>
        <PieChartTimer />
      </Box>

      {remaining == 0 && !isFinished &&  (
        <Box>
          <Heading>
            OVERTIME!!!
          </Heading>
        </Box>
    )}

      {/* Control Buttons */}
      <Box style={TimerViewStyles.buttonRow}>
        {/* Start Meeting Button */}
        {!isStarted && (
          <Box style={TimerViewStyles.startButtonBox}>
            <Button style={TimerViewStyles.button} onClick={() => startSession(intervals)}>
              Start Meeting
            </Button>
          </Box>
        )}

        {/* Other Buttons */}
        <Box style={TimerViewStyles.otherButtonsBox}>
          {isStarted && isRunning && (
            <Button style={TimerViewStyles.button} onClick={() => pauseSession()}>
              Pause
            </Button>
          )}
          {!isRunning && !isFinished && (
            <Button style={TimerViewStyles.button} onClick={() => resumeSession()}>
              Resume
            </Button>
          )}
          <Button style={TimerViewStyles.button} onClick={() => removeIntervals()}>
            Reset
          </Button>

          {/* Interval Control */}
          {!isFinished && (
            <Button style={TimerViewStyles.button} onClick={() => goToNextInterval()}>
              Next Interval
            </Button>
          )}

          {/* Alarm Control */}
          {remaining == 0 && <Button style={TimerViewStyles.button} onClick={() => audio?.pause()} disabled={!audio}>
            Snooze
          </Button>}
        </Box>
      </Box>
    </Box>
  );
}