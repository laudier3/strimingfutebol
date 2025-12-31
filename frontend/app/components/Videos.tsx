"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

function getYouTubeEmbedUrl(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}` : null;
}

export default function YouTubePlayer({ url }: { url: string }) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) {
    return <p className="text-red-500">URL do YouTube inválida</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="bg-neutral-900/80 border-neutral-800 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
