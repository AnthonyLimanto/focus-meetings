export function formatSeconds(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  

export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
  
// Generates an SVG path string for a circular arc sector.
// (x, y): center of the circle
// radius: radius of the circle
// startAngle: where the arc starts (in degrees)
// sweepAngle: how wide the arc is (in degrees)
export const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  sweepAngle: number
) => {
  // Convert the start angle to Cartesian coordinates
  const start = polarToCartesian(x, y, radius, startAngle);

  // Convert the end angle (startAngle + sweepAngle) to Cartesian coordinates
  const end = polarToCartesian(x, y, radius, startAngle + sweepAngle);

  // The 'large-arc-flag' in the SVG path.
  // It tells SVG whether the arc should be >180 degrees (1) or ≤180 degrees (0)
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  // Return an SVG path string:
  // - Move to the center (M)
  // - Draw a line to the start of the arc (L)
  // - Draw the arc using the 'A' command
  // - Close the path back to center (Z)
  return [
    `M ${x} ${y}`,                           // Move to center
    `L ${start.x} ${start.y}`,              // Line to arc start point
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // Arc to end point
    "Z",                                    // Close path (back to center)
  ].join(" ");
};

// Darkens a hex color string by a given percentage
// hex: color in "#RRGGBB" format
// percent: value from 0 to 1, where 1 darkens the color fully (to black), 0 leaves it unchanged
export const darkenColor = (hex: string, percent: number): string => {
  // Remove the '#' and parse the hex string into a base-16 (hex) number
  const num = parseInt(hex.replace("#", ""), 16);

  // Calculate how much to reduce each RGB component (scales 0–255 by percentage)
  const amt = Math.round(2.55 * percent * 100);

  // Extract red, green, and blue components and subtract amt from each
  let R = (num >> 16) - amt;              // Red component
  let G = ((num >> 8) & 0x00ff) - amt;    // Green component
  let B = (num & 0x0000ff) - amt;         // Blue component

  // Clamp each component between 0 and 255 and recombine into a single hex string
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)  // Convert to hex string
      .slice(1)      // Remove the leading '1' from 0x1000000
  );
};
