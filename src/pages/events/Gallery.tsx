import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEventGallery, WebsiteGalleryItem } from "@/services/cms/events-service";

const EventGallery = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<any[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const [galleryItems, setGalleryItems] = useState<WebsiteGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleMediaClick = (media: any[], initialIndex: number) => {
    setLightboxMedia(media);
    setLightboxInitialIndex(initialIndex);
    setLightboxOpen(true);
  };

  // Load gallery items on component mount
  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await getEventGallery();
      setGalleryItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery');
      console.error('Error loading gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Event Gallery
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            

            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : galleryItems.length > 0 ? (
              <div className="space-y-12">
                {/* Gallery Items Grid - Completely Independent */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-6 pb-4 border-b border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Event Gallery</h2>
                        <p className="text-sm text-muted-foreground">
                          Standalone gallery content managed separately via CMS
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {galleryItems.length} items
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {galleryItems.map((item, index) => (
                      <div 
                        key={`${item.id}-${index}`}
                        className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square border border-border hover:border-primary transition-colors"
                        onClick={() => handleMediaClick(
                          galleryItems.map(gItem => ({
                            id: gItem.id,
                            src: gItem.media.url,
                            alt: gItem.media.alt || gItem.title || `Gallery item ${index + 1}`,
                            type: gItem.media.type
                          })), 
                          index
                        )}
                      >
                            {item.media.type === "image" ? (
                              <img
                                src={item.media.url}
                                alt={item.media.alt || item.title || `Gallery item ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="relative bg-gray-900 rounded-lg overflow-hidden w-full h-full">
                                <video
                                  src={item.media.url}
                                  className="w-full h-full object-cover"
                                  muted
                                  preload="metadata"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}
                            {(item.media.alt || item.title) && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                <p className="text-white text-xs line-clamp-2">
                                  {item.media.alt || item.title}
                                </p>
                              </div>
                            )}
                          </div>
                    ))}
                  </div>
                </div>
                
                {/* Gallery Summary */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Gallery Summary</h3>
                    <p className="text-muted-foreground">
                      Displaying {galleryItems.length} standalone gallery items
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Completely isolated from events - managed independently via CMS
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="text-5xl mb-4">🖼️</div>
                <h3 className="text-xl font-semibold mb-2">No Gallery Items Found</h3>
                <p className="text-muted-foreground">
                  No media items available in the gallery yet.
                </p>
              </div>
            )}
            
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                <p className="text-destructive">Error loading gallery: {error}</p>
              </div>
            )}
            
            {/* Simple Lightbox Implementation */}
            {lightboxOpen && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative max-w-4xl max-h-full">
                  <button
                    onClick={() => setLightboxOpen(false)}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {lightboxMedia[lightboxInitialIndex] && (
                    <div>
                      {lightboxMedia[lightboxInitialIndex].type === 'image' ? (
                        <img
                          src={lightboxMedia[lightboxInitialIndex].src}
                          alt={lightboxMedia[lightboxInitialIndex].alt}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <video
                          src={lightboxMedia[lightboxInitialIndex].src}
                          controls
                          className="max-w-full max-h-full"
                          autoPlay
                        />
                      )}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                        {lightboxMedia[lightboxInitialIndex].alt}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventGallery;