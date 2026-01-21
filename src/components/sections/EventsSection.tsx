import { events } from "@/data/mockData";
import { Calendar, MapPin } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const EventsSection = () => {
  return (
    <section id="events" className="section section-alt">
      <div className="container">
        <ScrollAnimateWrapper>
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </ScrollAnimateWrapper>

        <div className="events-grid">
          {events.map((event) => (
            <ScrollAnimateWrapper key={event.id}>
              <div className="event-card">
                <div className="event-image">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-meta">
                    <span className="event-meta-item">
                      <Calendar size={14} />
                      {event.date}
                    </span>
                    <span className="event-meta-item">
                      <MapPin size={14} />
                      {event.location}
                    </span>
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

export default EventsSection;
