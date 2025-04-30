import React from "react";
import { useSessionStore } from "../session/sessionStore";
import { Box, Button, Heading, List, ListItem, Text } from "@vibe/core";
import { formatSeconds } from "../utils/timerUtils";

const IntervalList: React.FC = () => {
  const { intervals, intervalsTitle, removeIntervals } = useSessionStore();

  return (
    <Box padding="medium" border="1px solid #ccc" borderRadius="small">
      <Heading type='h1' align="center">Slice List</Heading>
      {intervals.length === 0 ? (
        <Text>No Slices added yet.</Text>
      ) : (
        <List>
          {intervals.map((interval, index) => (
            <ListItem key={index}>
              <Text>
                {intervalsTitle[index] || `Interval ${index + 1}`}: {formatSeconds(interval)} minutes
              </Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default IntervalList;