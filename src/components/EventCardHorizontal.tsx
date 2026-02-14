import React from 'react';
import { Button } from '@/components/ui/button';
import { EventData } from '../services/eventsService';
import { Star } from 'lucide-react';

interface EventCardHorizontalProps {
  event: EventData;
}

const EventCardHorizontal: React.FC<EventCardHorizontalProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex gap-6 bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-80 h-56 object-cover"
        />
      )}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {formatDate(event.date)} • {event.location}
          </p>
          <p className="mt-2 text-base text-gray-700">
            {event.description}
          </p>
          {/* COMMENTED OUT: Highlights display - temporarily disabled */}
          {/* {event.highlights && event.highlights.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-foreground">Highlights:</span>
              </div>
              <ul className="space-y-1">
                {event.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
                {event.highlights.length > 3 && (
                  <li className="text-sm text-muted-foreground italic">
                    +{event.highlights.length - 3} more highlights
                  </li>
                )}
              </ul>
            </div>
          )} */}
        </div>
        <div className="mt-4">
          <Button>View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default EventCardHorizontal;