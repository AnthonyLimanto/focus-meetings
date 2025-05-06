import { Box, Heading } from "@vibe/core";

export default function Banner() {
  return (
    <Box style={Styles.banner}>
      <Heading type="h1" style={Styles.bannerHeading}>
        FocusMeetings
      </Heading>
    </Box>
  );
}

const Styles = {
  banner: {
    width: "100%",
    backgroundColor: "#CCE7F6", // Slightly darker blue
    padding: "20px",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  bannerHeading: {
    fontSize: "24px",
    fontWeight: "bold" as const,
  },
};