import { useState } from "react";
import { Box, Text, Button } from "@vibe/core";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Box style={Styles.footer}>
        <Text style={Styles.footerText}>
          Created by <strong>Anthony Limanto :3</strong>
        </Text>
        <Button
          style={Styles.linkedinButton}
          onClick={() => window.open("https://www.linkedin.com/in/anthony-limanto/", "_blank", "noopener,noreferrer")}
        >
          My LinkedIn
        </Button>
        <Button style={Styles.modalButton} onClick={toggleModal}>
          Privacy & Terms
        </Button>
      </Box>

      {isModalOpen && (
        <Box style={Styles.modalOverlay} onClick={toggleModal}>
          <Box
            style={Styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-heading"
          >
            <Text id="privacy-heading" style={Styles.modalHeading}>
              Privacy Policy
            </Text>
            <Text style={Styles.modalText}>
              This app is hosted on Vercel, which may collect some data such as IP addresses and request logs for performance monitoring and analytics.
              For more details, refer to Vercel's{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={Styles.link}
              >
                Privacy Policy
              </a>.
            </Text>

            <Text style={Styles.modalHeading}>Terms of Service</Text>
            <Text style={Styles.modalText}>
              This app is provided as-is without any guarantees. Use it at your own risk. The creator is not responsible for any data loss or misuse.
            </Text>

            <Text style={Styles.modalHeading}>Contact</Text>
            <Text style={Styles.modalText}>
              For inquiries, please contact me via LinkedIn:{" "}
              <Button
                style={Styles.linkedinButton}
                onClick={() => window.open("https://www.linkedin.com/in/anthony-limanto/", "_blank", "noopener,noreferrer")}
              >
                Anthony Limanto
              </Button>
            </Text>

            <Button style={Styles.closeButton} onClick={toggleModal}>
              Close
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

const Styles = {
  footer: {
    width: "100%",
    backgroundColor: "#CCE7F6",
    padding: "10px 20px",
    textAlign: "center" as const,
    marginTop: "40px",
    color: "#333",
  },
  footerText: {
    fontSize: "14px",
    marginBottom: "5px",
    wordWrap: "break-word" as const,
    overflowWrap: "break-word" as const,
    whiteSpace: "normal" as const,
  },
  linkedinButton: {
    backgroundColor: "#0077b5", // LinkedIn blue
    color: "#FFFFFF", // White text
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: "5px",
    marginRight: "15px"
  },
  modalButton: {
    backgroundColor: "#004080",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  },
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "10px",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left" as const,
    overflowWrap: "break-word" as const,
    wordWrap: "break-word" as const,
    whiteSpace: "normal" as const,
  },
  modalHeading: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    marginBottom: "10px",
    color: "#333",
    wordWrap: "break-word" as const,
    overflowWrap: "break-word" as const,
  },
  modalText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
    lineHeight: "1.6",
    whiteSpace: "normal" as const,
    wordWrap: "break-word" as const,
    overflowWrap: "break-word" as const,
  },
  link: {
    color: "#0077b5",
    textDecoration: "underline",
    wordWrap: "break-word" as const,
    overflowWrap: "break-word" as const,
    whiteSpace: "normal" as const,
  },
  closeButton: {
    backgroundColor: "#004080",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  },
};