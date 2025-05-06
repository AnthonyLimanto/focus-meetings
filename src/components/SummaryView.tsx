import { useSessionStore } from "../session/sessionStore";
import { formatSeconds } from "../utils/timerUtils";
import { Box, Heading, Text } from "@vibe/core";

export default function SummaryView() {
  const {
    intervals,
    intervalsTitle,
    actualTimeTakenForSlice,
    isFinished,
  } = useSessionStore();

  if (!isFinished) {
    return (
      <Box style={Styles.container}>
        <Text style={Styles.message}>The meeting hasn't finished yet.</Text>
      </Box>
    );
  }

  return (
    <Box style={Styles.container}>
      {intervals.map((planned, i) => {
        const title = intervalsTitle[i] || `Slice ${i + 1}`;
        const actual = actualTimeTakenForSlice[i] || 0;
        const diff = actual - planned;
        const isOver = diff > 0;

        return (
          <Box
            key={i}
            style={{
              ...Styles.sliceBox,
              backgroundColor: isOver ? "#FFEAEA" : "#E8F5E9",
              borderLeft: `5px solid ${isOver ? "#E53935" : "#43A047"}`,
            }}
          >
            <Heading type="h4" style={Styles.sliceTitle}>
              {title}
            </Heading>
            <Text style={Styles.sliceDetails}>
              ⏱ Planned: {formatSeconds(planned)}
              <br />
              ✅ Actual: {formatSeconds(actual)}
              <br />
              {isOver ? "⏳ Over by" : "✔️ Under by"} {formatSeconds(Math.abs(diff))}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}

const Styles = {
  container: {
    padding: "20px",
    backgroundColor: "#F9FAFB", // Light background for the summary
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for the container
    maxWidth: "800px",
    margin: "20px auto", // Center the container
  },
  heading: {
    marginBottom: "20px",
    color: "#333", // Dark text for the heading
  },
  message: {
    fontSize: "16px",
    color: "#555", // Neutral text color for the message
    textAlign: "center" as const,
  },
  sliceBox: {
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px", // Rounded edges for each slice box
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for each slice
  },
  sliceTitle: {
    marginBottom: "10px",
    color: "#333", // Dark text for the slice title
  },
  sliceDetails: {
    fontSize: "14px",
    color: "#555", // Neutral text color for the slice details
  },
};