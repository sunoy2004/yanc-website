import { testimonials } from "@/data/mockData";
import { Quote } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const TestimonialsSection = () => {
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
          {testimonials.map((testimonial) => (
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
