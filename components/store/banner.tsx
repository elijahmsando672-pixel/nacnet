"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerLink = { href: string; text: string };

type BannerProps = {
  message: string;
  link?: BannerLink;
  className?: string;
  id?: string;
};

export function Banner({ message, link, className, id = "announcement" }: BannerProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(`banner-${id}`) === "true");
  }, [id]);

  function handleDismiss() {
    setDismissed(true);
    localStorage.setItem(`banner-${id}`, "true");
  }

  if (dismissed) return null;

  return (
    <div className={cn("flex items-center justify-center gap-4 bg-primary px-4 py-2 text-sm text-primary-foreground", className)}>
      <p className="text-center">
        {message}
        {link && (
          <Link href={link.href} className="ml-1 underline underline-offset-2 hover:no-underline">
            {link.text}
          </Link>
        )}
      </p>
      <button onClick={handleDismiss} className="shrink-0 rounded-sm p-0.5 opacity-70 transition-opacity hover:opacity-100" aria-label="Dismiss">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
