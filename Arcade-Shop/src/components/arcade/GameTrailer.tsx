"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RatingStars } from "./RatingStars";
import Image from "next/image";

interface GameTrailerProps {
  trailerUrl: string;
  thumbnail: string;
  title: string;
  className?: string;
}

export function GameTrailer({ trailerUrl, thumbnail, title, className }: GameTrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(trailerUrl);

  function getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  if (!videoId) return null;

  return (
    <div className={cn("relative aspect-[16/9] rounded-arcade overflow-hidden bg-arcade-bg-elevated", className)}>
      <Image
        src={thumbnail}
        alt={`${title} trailer thumbnail`}
        fill
        className="w-full h-full object-cover transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, 100%"
        style={{ opacity: isPlaying ? 0 : 1 }}
      />
      {!isPlaying && (
        <motion.button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-arcade-bg-deep/50 backdrop-blur-sm hover:bg-arcade-bg-deep/70 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Play ${title} trailer`}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-arcade-accent-pink/20 flex items-center justify-center border-2 border-arcade-accent-pink/50 neon-glow-pink"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-8 h-8 text-arcade-accent-pink ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.button>
      )}
      {isPlaying && (
        <div className="absolute inset-0">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${title} trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";