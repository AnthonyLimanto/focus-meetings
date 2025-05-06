import React from "react";
import { useSessionStore } from "../session/sessionStore";
import { Box, Heading, Text } from "@vibe/core";
import TimerViewStyles from "../styles/TimerViewStyles";

const IntervalList: React.FC = () => {
  const { intervals, intervalsTitle, intervalsColour, currentIndex } = useSessionStore();

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
            <Box key={index} style={Styles.intervalWrapper}>
              {/* Downward Arrow for Current Interval */}
              {currentIndex === index && (
                <Box style={Styles.arrow}>
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    width="40px"
                    height="40px"
                  >
                    <path d="M12 16L6 10h12z" />
                  </svg>
                </Box>
              )}
              <Box
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
    display: "flex",
    flexDirection: "column" as const, // Stack intervals vertically
    alignItems: "flex-end", // Align intervals to the right
    gap: "10px", // Add spacing between intervals
  },
  intervalWrapper: {
    position: "relative" as const, // Enable positioning for the arrow
    width: "100%", // Ensure the wrapper takes full width
    display: "flex",
    flexDirection: "column" as const, // Stack arrow and interval box vertically
    alignItems: "center", // Align everything to the right
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
    width: "80%", // Ensure the interval box doesn't take up the full width
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
  arrow: {
    // position: "absolute" as const, // Position the arrow relative to the interval wrapper
    alignItems: "center",
  },
};

export default IntervalList;