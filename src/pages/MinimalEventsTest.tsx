import { useState, useEffect } from "react";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const MinimalEventsTest = () => {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("🚀 Loading events in minimal test...");
        setLoading(true);
        setError(null);
        const data = await getUpcomingEvents();
        console.log("✅ Got data:", data);
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
        console.error("💥 Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  console.log("🔄 Component render - events:", events.length, "loading:", loading);

  if (loading) {
    return (
      <div style={{ padding: "20px", backgroundColor: "yellow", border: "2px solid black" }}>
        <h1>LOADING...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", backgroundColor: "red", color: "white" }}>
        <h1>ERROR: {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", border: "3px solid green" }}>
      <h1 style={{ color: "blue" }}>MINIMAL EVENTS TEST</h1>
      <h2>Found {events.length} events</h2>
      
      {events.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          {events.map(event => (
            <div 
              key={event.id} 
              style={{ 
                border: "2px solid blue", 
                margin: "10px 0", 
                padding: "15px",
                backgroundColor: "lightblue"
              }}
            >
              <h3 style={{ color: "darkblue" }}>TITLE: {event.title}</h3>
              <p><strong>ID:</strong> {event.id}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Description:</strong> {event.description || "None"}</p>
              <p><strong>Active:</strong> {event.isActive ? "YES" : "NO"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "20px", backgroundColor: "orange" }}>
          <h2>NO EVENTS FOUND</h2>
          <p>eventsData length: {events.length}</p>
          <p>Loading: {loading.toString()}</p>
          <p>Error: {error || "None"}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalEventsTest;