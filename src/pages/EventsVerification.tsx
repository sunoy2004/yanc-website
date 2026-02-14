import { useState, useEffect } from "react";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const EventsVerification = () => {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center", backgroundColor: "yellow" }}>
        <h1>LOADING EVENTS FOR VERIFICATION...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px", textAlign: "center", backgroundColor: "red", color: "white" }}>
        <h1>ERROR: {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Events Verification</h1>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "30px", 
        marginBottom: "30px" 
      }}>
        {/* Main Events Page Preview */}
        <div style={{ border: "2px solid blue", padding: "20px", borderRadius: "8px" }}>
          <h2 style={{ color: "blue", marginBottom: "15px" }}>Main Events Page (/events)</h2>
          <div style={{ backgroundColor: "#f0f8ff", padding: "15px", borderRadius: "5px" }}>
            <h3>Events Count: {events.length}</h3>
            <p>All upcoming events should appear here in a list format</p>
          </div>
        </div>

        {/* Upcoming Events Page Preview */}
        <div style={{ border: "2px solid green", padding: "20px", borderRadius: "8px" }}>
          <h2 style={{ color: "green", marginBottom: "15px" }}>Upcoming Events Page (/events/upcoming)</h2>
          <div style={{ backgroundColor: "#f0fff0", padding: "15px", borderRadius: "5px" }}>
            <h3>Filtered Events: {events.filter(e => e.isActive && (e.category === 'upcoming' || e.type === 'upcoming')).length}</h3>
            <p>Only active upcoming events should appear here</p>
          </div>
        </div>
      </div>

      {/* Event List */}
      <div>
        <h2>All Events ({events.length})</h2>
        {events.map(event => (
          <div 
            key={event.id} 
            style={{ 
              border: "1px solid #ccc", 
              margin: "10px 0", 
              padding: "15px",
              backgroundColor: "#fafafa"
            }}
          >
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Active:</strong> {event.isActive ? "Yes" : "No"}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Category:</strong> {event.category || "Not set"}</p>
            <p><strong>Description:</strong> {event.description || "None"}</p>
          </div>
        ))}
      </div>

      {/* Navigation Links */}
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        backgroundColor: "#ffffe0", 
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h3>Quick Navigation</h3>
        <div style={{ marginTop: "15px" }}>
          <a 
            href="/events" 
            style={{ 
              display: "inline-block",
              margin: "0 10px",
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px"
            }}
          >
            Main Events Page
          </a>
          <a 
            href="/events/upcoming" 
            style={{ 
              display: "inline-block",
              margin: "0 10px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px"
            }}
          >
            Upcoming Events Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventsVerification;