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

export const darkenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent * 100);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
