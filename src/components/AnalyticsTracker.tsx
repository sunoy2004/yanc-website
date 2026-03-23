import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/analytics";

const getRouteTitle = (pathname: string): string => {
  // Normalize to avoid trailing slashes.
  const path = pathname.replace(/\/+$/, "") || "/";

  switch (path) {
    case "/":
      return "YANC";
    case "/signup":
      return "Sign Up";
    case "/signin":
      return "Sign In";
    case "/faq":
      return "FAQ";
    case "/contact":
      return "Contact";
    case "/careers":
      return "Careers";
    case "/apply/membership":
      return "Membership Application";
    case "/apply/discover-meet-registration":
      return "Discover Meet Registration";
    case "/apply/discover-meet-feedback":
      return "Discover Meet Feedback";
    case "/apply/mentor-registration":
      return "Mentor Registration";
    case "/apply/startup-pitch":
      return "Startup Pitch";
    case "/apply/membership-application":
      return "Membership-Application";
    case "/events":
      return "Events";
    case "/events/verification":
      return "Events Verification";
    case "/events/debug-flow":
      return "Events Debug Flow";
    case "/events/upcoming":
      return "Upcoming Events";
    case "/events/test":
      return "Events Test";
    case "/events/test-upcoming":
      return "Test Upcoming Events";
    case "/events/debug":
      return "Events Debug";
    case "/events/simple":
      return "Events Simple";
    case "/events/minimal":
      return "Events Minimal";
    case "/events/past":
      return "Past Events";
    case "/events/gallery":
      return "Events Gallery";
    case "/events/highlights":
      return "Event Highlights";
    case "/legal/terms":
      return "Terms & Conditions";
    case "/legal/privacy":
      return "Privacy Policy";
    case "/legal/cookies":
      return "Cookie Policy";
    case "/legal/refund":
      return "Refund Policy";

    // Offerings
    case "/offerings/value-proposition":
      return "Value Proposition";
    case "/offerings/who-can-join":
      return "Who Can Join";
    case "/offerings/young-minds-mashup":
      return "Young Minds Mashup";
    case "/offerings/mentor-talks":
      return "Mentor Talks";
    case "/offerings/why-us":
      return "Why Us";

    // Team
    case "/team/executive-management":
      return "Executive Management";
    case "/team/cohort-founders":
      return "Cohort Founders";
    case "/team/advisory-board":
      return "Advisory Board";
    case "/team/global-mentors":
      return "Global Mentors";

    default:
      // Fallback: turn `/foo/bar` into `Foo bar`.
      return path
        .split("/")
        .filter(Boolean)
        .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "))
        .join(" ");
  }
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitle = getRouteTitle(location.pathname);
    trackPageView(location.pathname, routeTitle);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
