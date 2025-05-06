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
          <strong>FocusMeetings</strong> is a timer-based productivity tool that helps you stay on track during meetings by breaking them into clear, manageable intervals. Each interval is designed with a purpose — to keep discussions focused, ensure all topics are covered, and make the most of your scheduled time.
        </Text>

        <Heading type="h3" style={Styles.infoHeading}>
          How to Use the Timer
        </Heading>
        <Text style={Styles.infoText}>
          1. <strong>Clear the Placeholder:</strong> Start fresh by clicking "Clear" to remove any default intervals.{" "}
          <br />
          2. <strong>Set Up Intervals:</strong> Navigate to the "Set Up" page and add each meeting topic as an interval. Assign a title and a time duration for each one.{" "}
          <br />
          3. <strong>Start Your Meeting:</strong> Click "Start Meeting" to launch the timer.{" "}
          <br />
          4. <strong>Progress Through Intervals:</strong> Click "Next Interval" anytime to skip ahead.{" "}
          <br />
          5. <strong>View the Summary:</strong> Once all intervals are complete, go to the "Summary" page to review the meeting’s structure and outcomes.
        </Text>

        <Heading type="h3" style={Styles.infoHeading}>
          Benefits of using the timer:
        </Heading>
        <ul style={Styles.infoList}>
          <li>⏱️ Improves time management during meetings.</li>
          <li>🎯 Keeps discussions focused and productive.</li>
          <li>✅ Ensures all topics are covered within the allocated time.</li>
          <li>🧠 Reduces cognitive overload by breaking content into chunks.</li>
          <li>📈 Lets you review and improve future meetings using summaries.</li>
        </ul>

        <Heading type="h3" style={Styles.infoHeading}>
          Use FocusMeetings for Studying Too!
        </Heading>
        <Text style={Styles.infoText}>
          FocusMeetings isn’t just for meetings — it's also perfect for studying using a method called <strong>micro time-blocking</strong>. Break down your study session into intervals like “Read notes,” “Practice problems,” or “Review flashcards.”
          <br /><br />
          <strong>Here’s how it helps students:</strong>
          <br />
          • 📚 Keeps study sessions structured and goal-oriented.{" "}
          <br />
          • 🔄 Avoids burnout with short, built-in breaks.{" "}
          <br />
          • 🎯 Improves focus and task completion by eliminating multitasking.{" "}
          <br />
          • 🧩 Builds momentum with small wins each interval.{" "}
          <br />
          • 📋 Lets you reflect on your session and adapt for next time.
        </Text>
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
