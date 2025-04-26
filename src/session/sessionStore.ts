import { create } from "zustand";
import { persist } from "zustand/middleware";

type SessionState = {
  intervals: number[];
  intervalsTitle: string[];
  currentIndex: number;
  remaining: number;
  remainingOverAll: number;
  isRunning: boolean;
  timer: NodeJS.Timeout | null;
  isFinished: boolean,
  startSession: (intervals: number[]) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  tick: () => void;
  nextInterval: () => void;
  addInterval: (mins: number, title: string) => void;
  removeIntervals: () => void;
};

// 👇 Wrap your logic inside `persist`
export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      intervals: [],
      intervalsTitle: [],
      currentIndex: 0,
      remaining: 0,
      remainingOverAll: 0,
      isRunning: false,
      timer: null,
      isFinished: false,

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
          isFinished: false
        });

        const timer = setInterval(() => get().tick(), 1000);
        set({ timer });
      },

      tick: () => {
        const { remaining, nextInterval } = get();
        if (remaining <= 1) {
          nextInterval();
        } else {
          set((state) => ({
            remaining: state.remaining - 1,
            remainingOverAll: state.remainingOverAll - 1,
          }));
        }
      },

      nextInterval: () => {
        const { intervals, currentIndex, timer } = get();

        if (timer) clearInterval(timer);

        const nextIndex = currentIndex + 1;
        if (nextIndex >= intervals.length) {
          if (timer) clearInterval(timer);
          set({ isRunning: false, timer: null, remaining: 0, remainingOverAll: 0, isFinished:true });
        } else {
          const newTime = intervals[nextIndex];
          const newTimer = setInterval(() => get().tick(), 1000);
          set({
            remaining: newTime,
            currentIndex: nextIndex,
            isRunning: true,
            timer: newTimer,
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
        const { intervals, intervalsTitle, remainingOverAll } = get();
        set({
          intervals: [...intervals, mins * 60],
          intervalsTitle: [...intervalsTitle, title],
          remainingOverAll: remainingOverAll + mins * 60,
        });
        const updatedState = get();
        console.log("Updated intervals:", updatedState.intervals);
        console.log("Updated intervalsTitle:", updatedState.intervalsTitle);
      },

      removeIntervals: () => {
        const { timer } = get();
        if (timer) clearInterval(timer);
        set({
          intervals: [],
          intervalsTitle: [],
          remainingOverAll: 0,
          isRunning: false,
          timer: null,
        });
      },
    }),
    {
      name: "session-storage", // key for localStorage
      partialize: (state) => ({
        intervals: state.intervals,
        intervalsTitle: state.intervalsTitle,
        currentIndex: state.currentIndex,
        remaining: state.remaining,
        remainingOverAll: state.remainingOverAll,
        isRunning: state.isRunning,
        // 🧠 don't persist the timer itself!
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
