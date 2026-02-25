import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { testimonials as mockTestimonials } from '../../data/mockData';
import { MediaItemUI } from '../../lib/cms/types';

// Define the interface for testimonial data
export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  company: string;
  image: string;
  mediaItems?: MediaItemUI[];
}

export const useTestimonialsData = () => {
  const [testimonialsData, setTestimonialsData] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        setLoading(true);
        
        // Attempt to fetch from CMS - we'll need to add this method to the CMS service
        // For now, using mock data as a placeholder
        console.log('ℹ️ Using mock testimonials data (CMS method not yet implemented)');
        setTestimonialsData(mockTestimonials.map(t => ({
          id: t.id,
          quote: t.quote,
          author: t.author,
          company: t.company,
          image: t.image
        })));
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error('⚠️ Error fetching testimonials, using mock data:', err);
        setTestimonialsData(mockTestimonials.map(t => ({
          id: t.id,
          quote: t.quote,
          author: t.author,
          company: t.company,
          image: t.image
        })));
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonialsData();
  }, []);

  return { testimonialsData, loading, error };
};