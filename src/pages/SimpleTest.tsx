import { useState, useEffect } from "react";

const SimpleTest = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("🚀 Starting fetch...");
        setLoading(true);
        setError(null);
        
        console.log("🔍 Calling fetch('/api/events/upcoming')");
        const response = await fetch("/api/events/upcoming");
        console.log("📊 Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Raw data:", data);
        
        // Transform the data
        const transformed = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.event_date || event.date || "",
          location: event.location,
          image: event.imageUrl || event.image_url || "/placeholder.jpg",
          type: "upcoming" as const,
          isActive: event.is_active !== undefined 
            ? event.is_active 
            : event.isActive !== undefined 
            ? event.isActive 
            : true,
          mediaItems: event.mediaItems || [],
        }));
        
        console.log("🔄 Transformed data:", transformed);
        
        // Filter active events
        const filtered = transformed.filter(
          (event: any) => event.isActive !== false
        );
        console.log("🎯 Filtered data:", filtered);
        
        setEvents(filtered);
      } catch (err) {
        console.error("💥 Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Events Test</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && !error && (
        <div>
          <p className="mb-4">Found {events.length} events</p>
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border p-4 rounded">
                  <h2 className="font-bold">{event.title}</h2>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Description:</strong> {event.description || "None"}</p>
                  <p><strong>Active:</strong> {event.isActive ? "Yes" : "No"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleTest;