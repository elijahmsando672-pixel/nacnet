"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate, className }: { targetDate: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const tick = () => setTime(calcTimeLeft(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;

  const boxes: { label: string; value: number }[] = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {boxes.map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-lg font-bold tabular-nums sm:h-14 sm:w-14 sm:text-xl">
            {String(b.value).padStart(2, "0")}
          </div>
          <span className="mt-1 text-xs text-muted-foreground">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
