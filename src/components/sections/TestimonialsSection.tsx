import { useState, useEffect } from 'react';
import { Quote } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";
import { useTestimonialsData } from "@/services/cms/useTestimonialsData";

const TestimonialsSection = () => {
  const { testimonialsData, loading, error } = useTestimonialsData();

  if (loading) {
    return (
      <section className="section section-alt">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            Loading testimonials...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading testimonials:', error);
  }

  return (
    <section className="section section-alt">
      <div className="container">
        <ScrollAnimateWrapper>
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </ScrollAnimateWrapper>

        <div className="testimonials-grid">
          {testimonialsData.map((testimonial) => (
            <ScrollAnimateWrapper key={testimonial.id}>
              <div className="testimonial-card">
                <Quote size={24} className="testimonial-quote-icon" />
                <p className="testimonial-text">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    loading="lazy"
                    className="testimonial-avatar"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />
                  <div>
                    <p className="testimonial-name">{testimonial.author}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
