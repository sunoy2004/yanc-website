import { useState, useEffect } from "react";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const Events = () => {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("🚀 MAIN EVENTS PAGE LOADED");
  console.log("🔄 Component render - events:", events.length, "loading:", loading, "error:", error);

  useEffect(() => {
    console.log("🔄 useEffect triggered - loading data...");
    const loadData = async () => {
      try {
        console.log("🚀 Loading events in main Events page...");
        setLoading(true);
        setError(null);
        const data = await getUpcomingEvents();
        console.log("✅ Got data:", data);
        console.log("📊 Data length:", data.length);
        setEvents(data);
        console.log("💾 State updated");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
        console.error("💥 Error:", err);
      } finally {
        setLoading(false);
        console.log("🏁 Loading finished");
      }
    };
    
    loadData();
  }, []);

  // Monitor state changes
  useEffect(() => {
    console.log("🔄 State changed - events:", events.length, "loading:", loading, "error:", error);
  }, [events, loading, error]);

  if (loading) {
    return (
      <div style={{ padding: "50px", backgroundColor: "yellow", border: "2px solid black", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>LOADING UPCOMING EVENTS...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px", backgroundColor: "red", color: "white", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>ERROR: {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "10px" }}>Events</h1>
        <div style={{ width: "60px", height: "4px", backgroundColor: "#007bff", margin: "0 auto 20px" }}></div>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>Discover our upcoming events and activities</p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ 
          display: "inline-block", 
          padding: "20px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "10px",
          border: "2px solid #007bff"
        }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>{events.length}</div>
          <div style={{ fontSize: "1rem", color: "#666" }}>Upcoming Events</div>
        </div>
      </div>

      <div style={{ marginBottom: "50px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "20px" 
        }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Upcoming Events</h2>
          <a href="/events/upcoming" style={{ color: "#007bff", textDecoration: "none", fontSize: "1rem" }}>
            View All
          </a>
        </div>
        
        {events.length > 0 ? (
          <div style={{ marginTop: "20px" }}>
            {events.map(event => (
              <div 
                key={event.id} 
                style={{ 
                  border: "2px solid #007bff", 
                  margin: "15px 0", 
                  padding: "25px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <h3 style={{ color: "#007bff", fontSize: "1.5rem", marginBottom: "10px" }}>
                  {event.title}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Active:</strong> {event.isActive ? "Yes" : "No"}</p>
                  <p><strong>Type:</strong> {event.type}</p>
                </div>
                <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
                  <strong>Description:</strong> {event.description || "No description available"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: "50px", 
            backgroundColor: "#fff3cd", 
            border: "2px solid #ffc107",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📅</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>
              No Upcoming Events
            </h3>
            <p style={{ color: "#856404" }}>
              Check back soon for exciting upcoming events!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;