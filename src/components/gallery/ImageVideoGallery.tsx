import React from "react";
import { MediaItem } from "@/data/mockData";
import { PlayCircle } from "lucide-react";

interface ImageVideoGalleryProps {
  media: MediaItem[];
  onMediaClick?: (media: MediaItem, index: number) => void;
  className?: string;
  columns?: number; // Number of columns for masonry layout
  maxVisible?: number; // Maximum number of items to show initially
  showViewMore?: boolean; // Whether to show the view more button
  onViewMoreClick?: () => void; // Callback when view more is clicked
  onViewLessClick?: () => void; // Callback when view less is clicked
}

const ImageVideoGallery: React.FC<ImageVideoGalleryProps> = ({
  media,
  onMediaClick,
  className = "",
  columns = 3,
  maxVisible,
  showViewMore = false,
  onViewMoreClick,
  onViewLessClick,
}) => {
  const displayMedia = maxVisible !== undefined && media.length > maxVisible 
    ? media.slice(0, maxVisible)
    : media;
  
  const handleMediaClick = (item: MediaItem, index: number) => {
    if (onMediaClick) {
      onMediaClick(item, index);
    }
  };

  const getGridClass = () => {
    let baseClasses = `grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`;
    
    switch(columns) {
      case 1:
        return `${baseClasses} md:grid-cols-1`;
      case 2:
        return `${baseClasses} md:grid-cols-2`;
      case 3:
        return `${baseClasses} md:grid-cols-3`;
      case 4:
        return `${baseClasses} md:grid-cols-4`;
      case 5:
        return `${baseClasses} md:grid-cols-5`;
      default:
        return `${baseClasses} md:grid-cols-3`;
    }
  };

  return (
    <div className={getGridClass()}>
      {displayMedia.map((item, index) => (
        <div 
          key={item.id}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          onClick={() => handleMediaClick(item, index)}
        >
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                src={item.src}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                muted
                preload="metadata"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                <PlayCircle className="text-white w-12 h-12" />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xs truncate">{item.alt}</p>
          </div>
        </div>
      ))}


    </div>
  );
};

export default ImageVideoGallery;