import { useState } from "react";
import { useSessionStore } from "../session/sessionStore";
import { Box, Button, Heading, TextField } from "@vibe/core";
import TimerViewStyles from "../styles/TimerViewStyles";

export default function MeetingSetupForm() {
  const [localSlices, setLocalSlices] = useState([{ title: "", durationMinutes: 5 }]);
  const { intervals, addInterval, startSession, removeIntervals } = useSessionStore();

  const handleStartMeeting = () => {
    // Validate slices
    const isValid = localSlices.every((slice) => slice.title.trim() !== "" && slice.durationMinutes > 0 && slice.durationMinutes < 120);
    if (!isValid) {
      alert("Please ensure all slices have a title and a duration between 0 and 120 minutes.");
      return;
    }

    // Clear existing intervals and add new ones
    removeIntervals();
    localSlices.forEach((slice) => {
      addInterval(slice.durationMinutes, slice.title);
    });
    setLocalSlices([]);

    window.location.href = "/";
  };

  return (
    <Box style={TimerViewStyles.container}>
      <Heading type="h2" style={Styles.heading}>
        Meeting Agenda
      </Heading>

      {/* Interval List Container */}
      <Box style={Styles.intervalListContainer}>
        {localSlices.map((slice, idx) => (
          <Box key={idx} style={Styles.intervalRow}>
            <Box style={Styles.inputGroup}>
              <label style={Styles.label}>Topic</label>
              <TextField
                type="text"
                placeholder="e.g., Design Review"
                value={slice.title}
                onChange={(e) => {
                  const updated = [...localSlices];
                  updated[idx].title = e;
                  setLocalSlices(updated);
                }}
                style={Styles.input}
              />
            </Box>

            <Box style={Styles.inputGroup}>
              <label style={Styles.label}>Minutes</label>
              <TextField
                type="number"
                value={String(slice.durationMinutes)}
                onChange={(e) => {
                  const updated = [...localSlices];
                  updated[idx].durationMinutes = Number(e);
                  setLocalSlices(updated);
                }}
                style={Styles.input}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Buttons */}
      <Box style={Styles.buttonRow}>
        <Button
          style={TimerViewStyles.button}
          onClick={() => setLocalSlices([...localSlices, { title: "", durationMinutes: 5 }])}
        >
          Add Slice
        </Button>
        <Button style={TimerViewStyles.button} onClick={handleStartMeeting}>
          Start Meeting
        </Button>
      </Box>
    </Box>
  );
}

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#CCE7F6", // Slightly darker blue
    minHeight: "20vh",
  },
  heading: {
    backgroundColor: "#E6F7FF", // Very light blue
    padding: "10px 20px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "center" as const,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  intervalListContainer: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#FFFFFF", // White background
    padding: "20px",
    borderRadius: "12px", // Rounded edges
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    marginBottom: "20px",
  },
  intervalRow: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "20px",
    marginBottom: "15px",
    backgroundColor: "#F9FAFB", // Light gray for rows
    padding: "15px",
    borderRadius: "8px", // Slightly rounded edges for rows
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for rows
  },
  inputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#333",
  },
  input: {
    padding: "10px",
    border: "1px solid #CCC",
    borderRadius: "8px",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row" as const,
    gap: "15px",
    marginTop: "20px",
    justifyContent: "center",
    width: "100%",
    maxWidth: "600px",
  },
};