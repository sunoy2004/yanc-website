import { useState, useEffect } from "react";

const DebugEvents = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        addLog("🚀 Starting fetch...");
        setLoading(true);
        setError(null);
        
        addLog("🔍 Calling fetch('/api/events/upcoming')");
        const response = await fetch('/api/events/upcoming');
        addLog(`📊 Response status: ${response.status}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        addLog("📄 Parsing JSON...");
        const jsonData = await response.json();
        addLog(`✅ Received ${jsonData.length} events`);
        addLog(`📦 Raw data: ${JSON.stringify(jsonData, null, 2)}`);
        
        setData(jsonData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        addLog(`❌ Error: ${errorMessage}`);
        setError(errorMessage);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
        addLog("🏁 Fetch completed");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Events Debug Page</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Status</h2>
          <div className="space-y-2">
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error || 'None'}</p>
            <p><strong>Data items:</strong> {data ? data.length : 'N/A'}</p>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Raw Response</h2>
          <pre className="text-sm bg-muted p-3 rounded overflow-auto max-h-60">
            {data ? JSON.stringify(data, null, 2) : 'No data'}
          </pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Events Display</h2>
        {loading && <p className="text-muted-foreground">Loading events...</p>}
        {error && <p className="text-destructive">Error: {error}</p>}
        {data && data.length > 0 && (
          <div className="space-y-4">
            {data.map((event: any) => (
              <div key={event.id} className="border p-4 rounded">
                <h3 className="font-bold">{event.title}</h3>
                <p><strong>ID:</strong> {event.id}</p>
                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Active:</strong> {event.is_active ? 'Yes' : 'No'}</p>
                <p><strong>Description:</strong> {event.description || 'None'}</p>
              </div>
            ))}
          </div>
        )}
        {data && data.length === 0 && (
          <p className="text-muted-foreground">No events found</p>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Debug Logs</h2>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-sm font-mono">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebugEvents;