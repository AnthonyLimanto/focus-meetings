import React, { FC, useState } from "react";
import { useSessionStore } from "../session/sessionStore";
import { Button } from "@vibe/core";

interface PieChartTimerProps {
  radius?: number;
}

type Slice = {
  startAngle: number;
  sweepAngle: number;
  color: string;
  title: string;
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, sweepAngle: number) => {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, startAngle + sweepAngle);
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  return [
    `M ${x} ${y}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
};

const getPieSlices = (intervals: number[], titles: string[]): Slice[] => {
  const totalTime = intervals.reduce((acc, curr) => acc + curr, 0);
  const colors = [
    "#00C875", // bright green (success vibe)
    "#FDAB3D", // soft orange (friendly)
    "#4ECCC6", // turquoise (calming)
    "#7859CF", // vibrant purple (creative)
    "#FF7575", // soft red-pink (attention grabbing)
  ];

  let currentAngle = 0;
  return intervals.map((interval, index) => {
    const sweepAngle = (interval / totalTime) * 360;
    const slice = {
      startAngle: currentAngle,
      sweepAngle,
      color: colors[index % colors.length],
      title: titles[index],
    };
    currentAngle += sweepAngle;
    return slice;
  });
};

const darkenColor = (hex: string, percent: number): string => {
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

const PieChartTimer: FC<PieChartTimerProps> = ({ radius = 150 }) => {
  const { remainingOverAll, remaining, startSession, resumeSession, pauseSession, isRunning, intervals, intervalsTitle, currentIndex } = useSessionStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const slices = getPieSlices(intervals, intervalsTitle);
  const center = radius;
  const totalTime = intervals.reduce((accumulator, interval) => accumulator + interval, 0);

  let timePassed = totalTime - remainingOverAll;
  let currTimeAngle = (timePassed / totalTime) * 360;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding:23 }}>
      <div style={{ position: "relative", width: radius * 2, height: radius * 2 }}>
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <svg width={radius * 2} height={radius * 2}>
            {slices.map((slice, i) => {
              const isSelected = selectedIndex === i;
              if (intervals.length === 1) {
                return (
                  <React.Fragment key={i}>
                    <circle
                      cx={center}
                      cy={center}
                      r={radius}
                      fill={isSelected ? darkenColor(slice.color, 0.2) : slice.color}
                    />
                    <path
                      d={describeArc(center, center, radius, 0, currTimeAngle)}
                      fill={darkenColor(slice.color, 0.2)}
                    />
                  </React.Fragment>
                );
              }
              return (
                <path
                  key={i}
                  d={describeArc(center, center, radius, slice.startAngle, slice.sweepAngle)}
                  fill={isSelected ? darkenColor(slice.color, 0.2) : slice.color}
                />
              );
            })}
            {slices.slice(0, currentIndex + 1).map((slice, index) => (
              <path
                key={index + 1000}
                d={describeArc(center, center, radius, slice.startAngle, currTimeAngle - slice.startAngle)}
                fill={darkenColor(slice.color, 0.2)}
              />
            ))}
            {currTimeAngle === 360 && (
              <path
                key={10000}
                d={describeArc(center, center, radius, slices[0].startAngle, slices[0].sweepAngle)}
                fill={darkenColor(slices[0].color, 0.2)}
              />
            )}
            {intervals.length === 1 && (
              <circle
                key={"circle-fill"}
                cx={center}
                cy={center}
                r={radius}
                fill={darkenColor(slices[0].color, 0.2)}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PieChartTimer;
