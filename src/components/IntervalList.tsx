import React from "react";
import { useSessionStore } from "../session/sessionStore";
import { Box, Heading, Text } from "@vibe/core";
import TimerViewStyles from "../styles/TimerViewStyles";

const IntervalList: React.FC = () => {
  const { intervals, intervalsTitle, intervalsColour } = useSessionStore();

  return (
    <Box style={TimerViewStyles.container}>
      <Heading type="h2" align="center" style={TimerViewStyles.topicBox}>
        Slice List
      </Heading>
      {intervals.length === 0 ? (
        <Text style={Styles.noSlicesText}>No slices added yet.</Text>
      ) : (
        <Box style={Styles.listContainer}>
          {intervals.map((interval, index) => (
            <Box
              key={index}
              style={{
                ...Styles.intervalBox,
                backgroundColor: intervalsColour[index] || "#FFFFFF", // Use interval color or fallback to white
              }}
            >
              <Text style={Styles.intervalText}>
                {intervalsTitle[index] || `Interval ${index + 1}`}
              </Text>
              <Text style={Styles.intervalDuration}>
                {Math.ceil(interval / 60)} minutes
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const Styles = {
  noSlicesText: {
    fontSize: "16px",
    color: "#555",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  listContainer: {
    ...TimerViewStyles.topicBox, // Reuse topicBox for consistent styling
    padding: "15px",
    backgroundColor: "#E6F7FF", // Light blue 
  },
  intervalBox: {
    padding: "15px",
    borderRadius: "8px", // Rounded edges for each interval box
    marginBottom: "10px",
    color: "#FFFFFF", // Default text color for contrast
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for interval boxes
  },
  intervalText: {
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#FFFFFF", // Ensure text is visible on colored backgrounds
  },
  intervalDuration: {
    fontSize: "14px",
    color: "#FFFFFF", // Ensure text is visible on colored backgrounds
  },
};

export default IntervalList;