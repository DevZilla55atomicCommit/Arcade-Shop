"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RatingStars } from "./RatingStars";
import { formatPrice } from "@/lib/utils";

interface ReviewCardProps {
  review: {
    id: string;
    username: string;
    avatar?: string;
    rating: number;
    title: string;
    content: string;
    helpful: number;
    createdAt: string;
  };
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      className={cn("bg-arcade-bg-card rounded-arcade p-6 card-glow", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-arcade-accent-pink/20 flex items-center justify-center flex-shrink-0">
          {review.avatar ? (
            <img src={review.avatar} alt="" className="w-full h-full rounded-full" />
          ) : (
            <span className="font-display font-bold text-arcade-accent-pink text-lg">{review.username[0].toUpperCase()}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <h4 className="font-display text-heading-sm text-arcade-fg-primary">{review.username}</h4>
              <span className="font-mono text-xs text-arcade-fg-muted">{date}</span>
            </div>
            <RatingStars rating={review.rating} size="sm" />
          </div>
          <h5 className="font-medium text-arcade-fg-primary mb-1">{review.title}</h5>
        </div>
      </div>
      <p className="text-body-md text-arcade-fg-muted leading-relaxed mb-4">{review.content}</p>
      <div className="flex items-center gap-4 pt-4 border-t border-arcade-fg-muted/10">
        <button className="flex items-center gap-1 font-mono text-xs text-arcade-fg-muted hover:text-arcade-accent-pink transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>{review.helpful}</span>
        </button>
        <button className="flex items-center gap-1 font-mono text-xs text-arcade-fg-muted hover:text-arcade-accent-pink transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          REPORT
        </button>
      </div>
    </motion.article>
  );
}

export function ReviewList({ reviews, className }: { reviews: ReviewCardProps["review"][]; className?: string }) {
  return (
    <div className={cn("space-y-4", className)} role="list" aria-label="Reviews">
      {reviews.map((review, index) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      {reviews.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-arcade-fg-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="font-display text-heading-md text-arcade-fg-primary mb-2">No reviews yet</h3>
          <p className="text-body-md text-arcade-fg-muted">Be the first to review this game!</p>
        </div>
      )}
    </div>
  );
}