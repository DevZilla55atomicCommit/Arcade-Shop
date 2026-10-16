"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RatingStars } from "./RatingStars";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ReviewFormProps {
  onSubmit: (data: { rating: number; title: string; content: string }) => Promise<void>;
  initialRating?: number;
  className?: string;
}

export function ReviewForm({ onSubmit, initialRating = 0, className }: ReviewFormProps) {
  const [rating, setRating] = useState(initialRating);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string; rating?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Review content is required";
    if (rating === 0) newErrors.rating = "Please select a rating";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ rating, title, content });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-arcade-fg-muted mb-3">YOUR RATING</label>
        <RatingStars
          rating={rating}
          interactive
          onChange={setRating}
          size="lg"
          className="mb-2"
        />
        {errors.rating && <p className="font-mono text-xs text-arcade-accent-pink mt-1">{errors.rating}</p>}
      </div>

      <Input
        label="REVIEW TITLE"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        placeholder="Summarize your experience..."
        className="w-full"
      />

      <Textarea
        label="YOUR REVIEW"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={errors.content}
        placeholder="Share your detailed thoughts about the game..."
        rows={6}
        className="w-full"
      />

      <Button variant="neon" size="lg" type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            SUBMITTING...
          </>
        ) : (
          "SUBMIT REVIEW"
        )}
      </Button>
    </motion.form>
  );
}

import { useState } from "react";