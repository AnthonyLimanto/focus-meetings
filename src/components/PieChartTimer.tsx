import React, { FC, useState } from "react";
import { useSessionStore } from "../session/sessionStore";
import { Button } from "@vibe/core";
import { darkenColor, describeArc } from "../utils/timerUtils";

interface PieChartTimerProps {
  radius?: number;
}

type Slice = {
  startAngle: number;
  sweepAngle: number;
  color: string;
  title: string;
};

const getPieSlices = (intervals: number[], titles: string[]): Slice[] => {
  const totalTime = intervals.reduce((acc, curr) => acc + curr, 0);
  const colors = [
    "#00C875", // bright green 
    "#FDAB3D", // soft orange 
    "#4ECCC6", // turquoise 
    "#7859CF", // vibrant purple 
    "#FF7575", // soft red-pink 
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
