import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
const SESSION_STORAGE = "session-storage";

const colors = [
  "#00C875", // bright green 
  "#FDAB3D", // soft orange 
  "#4ECCC6", // turquoise 
  "#7859CF", // vibrant purple 
  "#FF7575", // soft red-pink 
];

type SessionState = {
  intervals: number[];
  intervalsTitle: string[];
  intervalsColour: string[];
  actualTimeTaken: number;
  actualTimeTakenForSlice: number[];
  currentIndex: number;
  remaining: number;
  remainingOverAll: number;
  isRunning: boolean;
  timer: NodeJS.Timeout | null;
  isFinished: boolean,
  isExtension: boolean,
  isStarted: boolean,
  isExtended: boolean,
  startSession: (intervals: number[]) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  tick: () => void;
  nextInterval: () => void;
  addInterval: (mins: number, title: string) => void;
  removeIntervals: () => void;
  goToNextInterval: () => void;
  stayInCurrentInterval: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      intervals: [300, 600, 900, 1200], // Example intervals in seconds (5 min, 10 min, 15 min)
      intervalsTitle: ["Introduction", "Discussion", "Q&A", "Conclusion"], // Example titles
      intervalsColour: ["#00C875", "#FDAB3D", "#4ECCC6", "#7859CF"], // Example colors
      actualTimeTaken: 0,
      actualTimeTakenForSlice: [],
      currentIndex: 0,
      remaining: 300, // Start with the first interval's time
      remainingOverAll: 3000, // Total time for all intervals (5 + 10 + 15 + 20 minutes)
      isRunning: false,
      timer: null,
      isFinished: false,
      isExtension: true,
      isStarted: false,
      isExtended: false,

      startSession: (intervals) => {
        const { isRunning } = get();
        if (isRunning) return;
        if (!intervals.length) {
          console.error("No intervals to start the session.");
          return;
        }
        const firstInterval = intervals[0];
        const total = intervals.reduce((acc, interval) => acc + interval, 0);
        set({
          intervals,
          currentIndex: 0,
          remaining: firstInterval,
          isRunning: true,
          remainingOverAll: total,
          isFinished: false,
          isStarted: true,
          isExtension: true,
        });

        const timer = setInterval(() => get().tick(), 1000);
        set({ timer });
      },

      tick: () => {
        const { remaining, nextInterval, isExtension, actualTimeTaken } = get();
        console.log("Extension mode:" + isExtension);
        if (remaining < 1) {
          if (!isExtension) {
            nextInterval();
          } else {
            console.log("Extended, actual time is :" + actualTimeTaken);
            set((state) => ({
              actualTimeTaken: state.actualTimeTaken + 1,
              isExtended: true,
            }));
          }
        } else {
          set((state) => ({
            remaining: state.remaining - 1,
            remainingOverAll: state.remainingOverAll - 1,
            actualTimeTaken: state.actualTimeTaken + 1,
          }));
        }
      },

      goToNextInterval: () => {
        const { nextInterval } = get();
        set((state) => ({
          isExtension: false,
        }));
        nextInterval();
      },

      stayInCurrentInterval: () => {
        set((state) => ({
          isExtension: true,
        }));
      },

      nextInterval: () => {
        const { intervals, currentIndex, timer, actualTimeTaken, actualTimeTakenForSlice, remainingOverAll, remaining } = get();

        if (timer) clearInterval(timer);

        const updatedTimeTakenForSlice = [...actualTimeTakenForSlice];
        if (currentIndex === 0) {
          updatedTimeTakenForSlice.push(actualTimeTaken);
        } else {
          const previousTime = actualTimeTakenForSlice.reduce((acc, time) => acc + time, 0);
          updatedTimeTakenForSlice.push(actualTimeTaken - previousTime);
        }
        const newRemainingOverAll = remainingOverAll - remaining;
        const nextIndex = currentIndex + 1;
        if (nextIndex >= intervals.length) {
          set({
            isRunning: false,
            isExtension: true,
            timer: null,
            remaining: 0,
            remainingOverAll: 0,
            isFinished: true,
            actualTimeTakenForSlice: updatedTimeTakenForSlice,
            isExtended: false,
          });
        } else {
          const newTime = intervals[nextIndex];
          const newTimer = setInterval(() => get().tick(), 1000);
          set({
            remaining: newTime,
            currentIndex: nextIndex,
            isRunning: true,
            timer: newTimer,
            actualTimeTakenForSlice: updatedTimeTakenForSlice,
            isExtended: true,
            isExtension: true,
            remainingOverAll: newRemainingOverAll,
          });
        }
      },

      pauseSession: () => {
        const { timer } = get();
        if (timer) clearInterval(timer);
        set({
          isRunning: false,
          timer: null,
        });
      },

      resumeSession: () => {
        const { isRunning } = get();
        if (!isRunning) {
          const timer = setInterval(() => get().tick(), 1000);
          set({
            isRunning: true,
            timer,
          });
        }
      },

      addInterval: (mins: number, title: string) => {
        const { intervals, intervalsTitle, remainingOverAll, intervalsColour } = get();
        const index = intervals.length;
        set({
          intervals: [...intervals, mins * 60],
          intervalsTitle: [...intervalsTitle, title],
          intervalsColour: [...intervalsColour, colors[index % colors.length]],
          remainingOverAll: remainingOverAll + mins * 60,
        });
        const updatedState = get();
        console.log("Updated intervals:", updatedState.intervals);
        console.log("Updated intervalsTitle:", updatedState.intervalsTitle);
        console.log("Updated intervalsColour:", updatedState.intervalsColour);
      },

      removeIntervals: () => {
        const { timer } = get();
        if (timer) clearInterval(timer);
        localStorage.removeItem(SESSION_STORAGE);
        set({
          intervals: [],
          intervalsTitle: [],
          intervalsColour: [],
          actualTimeTaken: 0,
          actualTimeTakenForSlice: [],
          currentIndex: 0,
          remaining: 999,
          remainingOverAll: 0,
          isRunning: false,
          timer: null,
          isFinished: false,
          isExtension: true,
          isStarted: false,
          isExtended: false,
        });
      },
    }),
    {
      name: SESSION_STORAGE, // key for localStorage
      partialize: (state) => ({
        intervals: state.intervals,
        intervalsTitle: state.intervalsTitle,
        intervalsColour: state.intervalsColour,
        actualTimeTaken: state.actualTimeTaken,
        actualTimeTakenForSlice: state.actualTimeTakenForSlice,
        currentIndex: state.currentIndex,
        remaining: state.remaining,
        remainingOverAll: state.remainingOverAll,
        isRunning: state.isRunning,
        isExtension: state.isExtension,
        isFinished: state.isFinished,
        isStarted: state.isStarted,
        isExtended: state.isExtended,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.isRunning) {
          const timer = setInterval(() => state.tick(), 1000);
          state.timer = timer;
        }
      },
    }
  )
);