import { Box, Heading } from "@vibe/core";
import MeetingSetupForm from "../components/MeetingSetupForm";

export default function SetupPage() {
  return (
    <Box style={Styles.container}>
      <MeetingSetupForm />
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
    backgroundColor: "#E6F7FF", // Light blue
    borderRadius: '12px',
    padding: '10px 20px',
    color: 'black',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  }
};
