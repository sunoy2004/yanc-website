import { useState, useEffect } from "react";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const TestEvents = () => {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🧪 TestEvents component mounted');
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🧪 Calling getUpcomingEvents...');
      const data = await getUpcomingEvents();
      console.log('🧪 Raw data received:', data);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('🧪 Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('🧪 Rendering events:', events);

  return (
    <div>
      <h1>Test Events</h1>
      <p>Events count: {events.length}</p>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.date} - {event.type}
              <br/>
              Active: {event.isActive ? 'Yes' : 'No'}
              <br/>
              Image: {event.image}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default TestEvents;