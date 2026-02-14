import { useState, useEffect } from "react";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const EventDebugFlow = () => {
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    console.log("🚀 EventDebugFlow component mounted");
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      console.log("🔄 Loading events in debug flow...");
      setLoading(true);
      setError(null);
      
      // Direct fetch to see raw data
      console.log("🔍 Direct fetch to /api/events/upcoming");
      const directResponse = await fetch("/api/events/upcoming");
      console.log("📊 Direct response status:", directResponse.status);
      const directData = await directResponse.json();
      console.log("📥 Direct raw data:", directData);
      setRawData(directData);
      
      // Using service function
      console.log("🔧 Using service function");
      const serviceData = await getUpcomingEvents();
      console.log("🔧 Service data:", serviceData);
      setEvents(serviceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
      console.error("💥 Error:", err);
    } finally {
      setLoading(false);
      console.log("🏁 Loading finished");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "50px", backgroundColor: "yellow", border: "2px solid black", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>DEBUG: LOADING EVENTS...</h1>
        <p>Check console for detailed logs</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px", backgroundColor: "red", color: "white", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem" }}>DEBUG: ERROR</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "20px" }}>Event Debug Flow</h1>
      
      <div style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <h2 style={{ color: "#007bff" }}>Debug Information</h2>
        <p><strong>Events Count:</strong> {events.length}</p>
        <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
        <p><strong>Error:</strong> {error || "None"}</p>
        <p><strong>Raw Data Items:</strong> {rawData?.length || 0}</p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>Raw API Data</h2>
        <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "5px", maxHeight: "300px", overflow: "auto" }}>
          <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(rawData, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>Transformed Data</h2>
        <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "5px", maxHeight: "300px", overflow: "auto" }}>
          <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(events, null, 2)}
          </pre>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>Rendered Events</h2>
        {events.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {events.map(event => (
              <div 
                key={event.id} 
                style={{ 
                  border: "2px solid #007bff", 
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <h3 style={{ color: "#007bff", fontSize: "1.3rem", marginBottom: "10px" }}>
                  {event.title}
                </h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Active:</strong> {event.isActive ? "Yes" : "No"}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Description:</strong> {event.description || "None"}</p>
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
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>⚠️</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>
              No Events Rendered
            </h3>
            <p style={{ color: "#856404" }}>
              Events were fetched but not rendered. Check the data transformation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDebugFlow;