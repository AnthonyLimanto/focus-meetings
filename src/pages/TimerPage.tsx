import { Heading, Box, Button } from "@vibe/core";
import TimerView from "../components/TimerView";
import IntervalList from "../components/IntervalList";
import { useSessionStore } from "../session/sessionStore";

export default function TimerPage() {
  const handleGoToSummary = () => {
    window.location.href = "/summary";
  };
  const {isFinished} = useSessionStore();
  return (
    <Box style={Styles.container}>
      {/* Main Content */}
      <Box style={Styles.content}>
        <TimerView />
        <IntervalList />
      </Box>

      {/* Summary Button */}
      {isFinished &&  
        (<Button style={Styles.summaryButton} onClick={handleGoToSummary}>
          Summary
        </Button>)}
    </Box>
  );
}

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const, // Stack content vertically
    justifyContent: "space-between", // Space between main content and button
    alignItems: "center",
    minHeight: "10vh",
    padding: "20px",
    backgroundColor: "#E6F7FF", // Light blue background
  },
  content: {
    display: "flex",
    flexDirection: "row" as const, // Place TimerView and IntervalList side by side
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px", // Space between TimerView and IntervalList
    width: "100%",
    maxWidth: "1200px", // Limit the width of the content
  },
  summaryButton: {
    backgroundColor: "#004080", // Dark blue
    color: "#FFFFFF", // White text
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textAlign: "center" as const,
    marginTop: "20px",
  },
};