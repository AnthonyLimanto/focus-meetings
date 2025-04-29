import { useState } from "react";
import { useSessionStore } from "../session/sessionStore"; // <-- your store
import { Box, Button, Heading } from "@vibe/core";

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
      <Heading type="h2">Create Meeting Agenda</Heading>
      {localSlices.map((slice, idx) => (
        <Box key={idx}>
          <input
            type="text"
            placeholder="Topic"
            value={slice.title}
            onChange={(e) => {
              const updated = [...localSlices];
              updated[idx].title = e.target.value;
              setLocalSlices(updated);
            }}
          />
          <input
            type="number"
            value={slice.durationMinutes}
            onChange={(e) => {
              const updated = [...localSlices];
              updated[idx].durationMinutes = Number(e.target.value);
              setLocalSlices(updated);
            }}
          />
        </Box>
      ))}
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
  buttonRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
};
