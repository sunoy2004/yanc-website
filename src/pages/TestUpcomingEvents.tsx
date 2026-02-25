import { useState, useEffect } from "react";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const TestUpcomingEvents = () => {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Loading upcoming events...');
      const data = await getUpcomingEvents();
      console.log('📥 Raw data received:', data);
      console.log('📊 Data type:', typeof data);
      console.log('📏 Data length:', data.length);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('💥 Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading events...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  console.log('🎯 Rendering events:', events);
  console.log('📊 Events count:', events.length);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Upcoming Events</h1>
      <p>Events found: {events.length}</p>
      
      {events.length > 0 ? (
        <div className="space-y-4 mt-4">
          {events.map(event => (
            <div key={event.id} className="border p-4 rounded">
              <h2 className="font-bold">{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description || 'No description'}</p>
              <p>Active: {event.isActive ? 'Yes' : 'No'}</p>
              <p>Type: {event.type}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p>No events found</p>
        </div>
      )}
    </div>
  );
};

export default TestUpcomingEvents;