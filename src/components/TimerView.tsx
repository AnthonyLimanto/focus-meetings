import { useEffect, useState } from "react";
import { useSessionStore } from "../session/sessionStore";
import { formatSeconds } from "../utils/timeUtils";
import PieChartTimer from "./PieChartTimer";
import { Box, Button, Heading } from "@vibe/core";
import soundFile from '../assets/sounds/s3_spring_rain.mp3';

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
    isFinished
  } = useSessionStore();

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const newAudio = new Audio(soundFile);
    newAudio.volume = 0.1;
  
    const shouldPlay = (isRunning && currentIndex !== 0) || isFinished;
  
    if (shouldPlay) {
      try {
        newAudio.play();
        setAudio(newAudio);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  
    return () => {
      try {
        newAudio.pause();
        newAudio.currentTime = 0;
      } catch (error) {
        console.error('Error stopping sound:', error);
      }
    };
  }, [isRunning, currentIndex, isFinished]);


  if (!intervals.length) return <div>No meeting session found.</div>;

  const currentTopic = intervalsTitle[currentIndex] || "Untitled";

  return (
    <Box>
      <Box style={Styles.topicBox}>
        <Heading type="h2" align="center">Current Topic: {currentTopic}</Heading>
        <Heading type="h3" align="center">Time Left: {formatSeconds(remaining)}</Heading>
      </Box>

      <PieChartTimer />

      <Box style={Styles.buttonRow}>
        <Button onClick={() => { startSession(intervals); }}>Start Meeting</Button>

        {isRunning ? (
          <Button onClick={() => { pauseSession(); }}>Pause</Button>
        ) : (
          <Button onClick={() => { resumeSession(); }}>Resume</Button>
        )}

        <Button onClick={() => { removeIntervals(); }}>Reset</Button>
        <Button onClick={() => { audio?.pause(); }}>Stop Alarm</Button>
      </Box>
    </Box>
  );
}

// --- Styles ---
const Styles = {
    heading: {
      backgroundColor: '#E6F7FF', // very light blue, soft and modern
      padding: '10px',
      borderRadius: '12px',
      marginBottom: '20px',
      width: 'fit-content',
    },
    topicBox: {
      backgroundColor: '#F0F4F8', // clean soft gray-blue
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      width: '80%',
      maxWidth: '600px',
      textAlign: 'center' as const,
    },
    buttonRow: {
      display: 'flex',
      flexDirection: 'row' as const,
      gap: '10px',
      marginTop: '20px',
      flexWrap: 'wrap' as const,
      justifyContent: 'center',
    },
  };
