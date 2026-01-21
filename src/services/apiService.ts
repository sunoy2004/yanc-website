// Mock API service for testing
export const mockApiService = {
  sendMessage: async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a simulated response based on the user's message
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello there! I'm the YANC Assistant. How can I help you today?";
    } else if (lowerCaseMessage.includes('yanc') || lowerCaseMessage.includes('club')) {
      return "YANC (Yet Another Networking Club) is a vibrant community focused on connecting professionals and fostering networking opportunities. We host events, workshops, and provide resources to help members grow their professional networks.";
    } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('offer')) {
      return "YANC offers various services including networking events, professional workshops, mentorship programs, and industry meetups. We aim to connect professionals across different sectors and facilitate meaningful business relationships.";
    } else if (lowerCaseMessage.includes('join') || lowerCaseMessage.includes('membership')) {
      return "To join YANC, visit our Contact section and fill out the membership form. We welcome professionals from all industries who are interested in expanding their network and contributing to our community.";
    } else if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('meetup')) {
      return "YANC hosts monthly networking events, quarterly workshops, and annual conferences. Check our Events section for upcoming dates and register through our website.";
    } else {
      const responses = [
        `I understand you're asking about "${message}". As a YANC Assistant, I'm here to help with information about our club, services, and events.`,
        `Thanks for your message: "${message}". The YANC community focuses on professional networking and development. How else can I assist you?`,
        `Regarding "${message}", YANC aims to foster meaningful professional connections. Is there a specific aspect of our club you'd like to know more about?`,
        `I've noted your inquiry about "${message}". YANC offers various networking opportunities for professionals. Would you like more specific information?`,
        `That's an interesting question about "${message}". As part of YANC, we're committed to helping professionals connect and grow. Can I provide more details?`
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
};

// Real API service for when CORS is resolved
export const realApiService = {
  sendMessage: async (message: string): Promise<string> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://api.openai.com'}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here'}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for YANC (Yet Another Networking Club). Respond professionally and helpfully to user inquiries about the club, its services, events, and related topics.'
            },
            { 
              role: 'user', 
              content: message 
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error in real API service:', error);
      throw error;
    }
  }
};

// Use mock service by default to avoid CORS issues
// Change to false when you want to use the real API (and CORS is resolved)
const USE_MOCK_SERVICE = true;

export const apiService = USE_MOCK_SERVICE ? mockApiService : realApiService;