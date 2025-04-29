import { useState } from "react";
import { useSessionStore } from "../session/sessionStore"; // <-- your store
import { Box, Button, Heading, TextField } from "@vibe/core";

export default function MeetingSetupForm() {
  const [localSlices, setLocalSlices] = useState([{ title: "", durationMinutes: 5 }]);
  const {intervals, intervalsTitle, addInterval, startSession, removeIntervals} = useSessionStore();

  const handleStartMeeting = () => {
    // Validate slices
    const isValid = localSlices.every(slice => slice.title.trim() !== "" && slice.durationMinutes > 0);
    if (!isValid) {
      alert("Please ensure all slices have a title and a duration greater than 0.");
      return;
    }
  
    // // Clear existing intervals and add new ones
    removeIntervals();
    
    localSlices.forEach(slice => {
      addInterval(slice.durationMinutes, slice.title);
    });
    setLocalSlices([]);
  
    // Access updated intervals directly from the store
    console.log("Saved intervals:", intervals);
  };
  const handleGoToTimer = () => {
    console.log(intervalsTitle);
    window.location.href = "/timer";
  }

  return (
    <Box className="p-4">
      {localSlices.map((slice, idx) => (
        <Box key={idx} style={Styles.intervalRow}>
          <Box style={Styles.inputGroup}>
            <label>Topic</label>
            <TextField 
              type="text"
              placeholder="e.g., Design Review"
              value={slice.title}
              onChange={(e) => {
                const updated = [...localSlices];
                updated[idx].title = e.target.value;
                setLocalSlices(updated);
              }}
            />
          </Box>

          <Box style={Styles.inputGroup}>
            <label>Minutes</label>
            <TextField 
              type="number"
              value={slice.durationMinutes}
              onChange={(e) => {
                const updated = [...localSlices];
                updated[idx].durationMinutes = Number(e.target.value);
                setLocalSlices(updated);
              }}
            />
          </Box>
        </Box>
      ))}
      <Box style={Styles.buttonRow}>
        <Button onClick={() => setLocalSlices([...localSlices, { title: "", durationMinutes: 5 }])}>
          Add Slice
        </Button>
        <Button onClick={handleStartMeeting}>
          Save
        </Button>
        <Button onClick={handleGoToTimer}>
          Go to meeting
        </Button>
      </Box>
      
    </Box>
  );
}

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
  intervalRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
    width: 'fit-content',
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly', // <-- Key property
    gap: '10px',
    marginBottom: '15px',
    width: '100%', // Allow it to stretch across parent container
  },

};
