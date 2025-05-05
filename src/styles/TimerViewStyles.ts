const TimerViewStyles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "18px 38px",
      backgroundColor: "#CCE7F6", // Slightly darker blue
      minHeight: "20vh",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    noSession: {
      fontSize: "18px",
      color: "#555",
      textAlign: "center" as const,
      marginTop: "50px",
    },
    topicBox: {
      backgroundColor: "#E6F7FF", // Light blue
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      marginTop: "10px",
      width: "90%",
      maxWidth: "600px",
      textAlign: "center" as const,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    topicHeading: {
      marginBottom: "10px",
      color: "#333",
    },
    finishedHeading: {
      color: "#FF4D4F", // Red for finished
      marginBottom: "10px",
    },
    timeLeft: {
      color: "#555",
    },
    timerBox: {
      width: "100%",
      maxWidth: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonRow: {
      display: "flex",
      flexDirection: "row" as const,
      gap: "10px",
      flexWrap: "wrap" as const,
      justifyContent: "center",
      marginTop: "20px",
      backgroundColor: "#E6F7FF", // Light blue
      borderRadius: "12px",
      padding: "20px",
    },
    button: {
        backgroundColor: "#63BBDE", // Dark blue
        color: "#FFFFFF", // White text
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        textAlign: "center" as const,
    },
  };
  
  export default TimerViewStyles;