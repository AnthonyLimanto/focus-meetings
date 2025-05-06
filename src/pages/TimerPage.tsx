import { Box, Button, Text, Heading } from "@vibe/core";
import TimerView from "../components/TimerView";
import IntervalList from "../components/IntervalList";
import { useSessionStore } from "../session/sessionStore";

export default function TimerPage() {
  const handleGoToSummary = () => {
    window.location.href = "/summary";
  };
  const { isFinished } = useSessionStore();

  return (
    <Box style={Styles.container}>
      {/* Main Content */}
      <Box style={Styles.content}>
        <TimerView />
        <IntervalList />
      </Box>

      {/* Summary Button */}
      {isFinished && (
        <Button style={Styles.summaryButton} onClick={handleGoToSummary}>
          Summary
        </Button>
      )}

      {/* Information Section */}
      <Box style={Styles.infoSection}>
        <Heading type="h3" style={Styles.infoHeading}>
          What is FocusMeetings?
        </Heading>
        <Text style={Styles.infoText}>
          FocusMeetings is a timer that helps you stay focused during your meetings by breaking them into manageable intervals. 
          Each interval is designed to keep discussions on track and ensure that every topic gets the attention it deserves.
        </Text>

        <Heading type="h3" style={Styles.infoHeading}>
          How to Use the Timer
        </Heading>
        <Text style={Styles.infoText}>
          To get started, clear the placeholder timer by clicking "Clear". In the "Set Up" page you can add intervals with a title and the duration of the interval.
          Then click "Start Meeting" to start the timer. 
        </Text>
        <Text style={Styles.infoText}>
          While the timer is ticking down, you can click "Next Interval" to skip to the next interval.
          After the timer has finished going through every interval, click "Summary" to go to the summary page and see the details of your meeting.
        </Text>
        <Heading type="h3" style={Styles.infoHeading}>
          Benefits of using the timer:
        </Heading>
        <ul style={Styles.infoList}>
          <li>Improves time management during meetings.</li>
          <li>Keeps discussions focused and productive.</li>
          <li>Ensures all topics are covered within the allocated time.</li>
          <li>Helps avoid overruns and keeps meetings on schedule.</li>
        </ul>
      </Box>
    </Box>
  );
}

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#E6F7FF",
    overflowY: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "40px",
  },
  summaryButton: {
    backgroundColor: "#004080",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textAlign: "center" as const,
    marginTop: "20px",
  },
  infoSection: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  infoHeading: {
    marginBottom: "10px",
    color: "#333",
    whiteSpace: "normal",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  infoText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
    lineHeight: "1.6",
    whiteSpace: "normal",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    maxWidth: "100%",
  },
  infoList: {
    paddingLeft: "20px",
    color: "#555",
    fontSize: "16px",
    lineHeight: "1.6",
    whiteSpace: "normal",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    maxWidth: "100%",
  },
};
