"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Slide = {
  title: string;
  description: string;
  cta?: { href: string; text: string };
  image?: string;
};

type HeroSliderProps = {
  slides: Slide[];
  className?: string;
};

export function HeroSlider({ slides, className }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)), [slides.length]);
  const next = useCallback(() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)), [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [slides.length, next]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-muted", className)}>
      {slide.image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      )}
      <div className={cn("relative flex h-[300px] flex-col items-center justify-center text-center px-6 sm:h-[400px] lg:h-[500px]", slide.image && "bg-black/40")}>
        <h2 className={cn("max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl", slide.image && "text-white")}>
          {slide.title}
        </h2>
        <p className={cn("mt-4 max-w-xl text-base sm:text-lg", slide.image ? "text-white/90" : "text-muted-foreground")}>
          {slide.description}
        </p>
        {slide.cta && (
          <Button asChild className="mt-6" size="lg">
            <Link href={slide.cta.href}>{slide.cta.text}</Link>
          </Button>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
