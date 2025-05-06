import { Box, Heading } from "@vibe/core";
import SummaryView from "../components/SummaryView";
import TimerViewStyles from "../styles/TimerViewStyles";

export default function SummaryPage() {
  return (
    <Box style={Styles.container}>
      <Box style={Styles.summaryCard}>
        <Heading type="h2" align="center" style={Styles.heading}>
          Meeting Summary
        </Heading>
        <SummaryView />
      </Box>
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
    borderRadius: "12px",
    padding: "10px 20px",
    color: "black",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
   summaryCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "18px 38px",
    backgroundColor: "#CCE7F6", // Slightly darker blue
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};