import { Heading, Box, Button } from "@vibe/core";
import TimerView from "../components/TimerView";
import IntervalList from "../components/IntervalList";

export default function TimerPage() {
  const handleGoToSummary = () => {
    window.location.href = "/summary";
  }
  return (
    <Box style={Styles.container}>
        <Heading style={Styles.heading}>Meeting Timer</Heading>
        <TimerView />
        <IntervalList></IntervalList>
        <Button onClick={handleGoToSummary}>Summary</Button>
    </Box>
  );
}

const Styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: 'medium',
      backgroundColor: '#E6F7FF',
      gap: '20px',
    },
    heading: {
      backgroundColor: 'azure',
      borderRadius: '12px',
      padding: '10px 20px',
      color: 'black',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    }
  };
