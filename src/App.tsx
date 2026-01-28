import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Chatbot from "./components/Chatbot";

// Our Offerings pages
import ValueProposition from "./pages/offerings/ValueProposition";
import WhoCanJoin from "./pages/offerings/WhoCanJoin";
import YoungMindsMashup from "./pages/offerings/YoungMindsMashup";
import MentorTalks from "./pages/offerings/MentorTalks";
import WhyUs from "./pages/offerings/WhyUs";

// Team pages
import ExecutiveManagement from "./pages/team/ExecutiveManagement";
import CohortFounders from "./pages/team/CohortFounders";
import AdvisoryBoard from "./pages/team/AdvisoryBoard";
import GlobalMentors from "./pages/team/GlobalMentors";

// Careers pages
import Jobs from "./pages/careers/Jobs";
import Internships from "./pages/careers/Internships";
import Careers from "./pages/Careers";

// Applications pages
import Membership from "./pages/apply/Membership";
import DiscoverMeetRegistration from "./pages/apply/DiscoverMeetRegistration";
import DiscoverMeetFeedback from "./pages/apply/DiscoverMeetFeedback";
import MentorRegistration from "./pages/apply/MentorRegistration";
import StartupPitch from "./pages/apply/StartupPitch";
import MembershipApplication from "./pages/apply/MembershipApplication";

// Events pages
import UpcomingEvents from "./pages/events/Upcoming";
import PastEvents from "./pages/events/Past";
import EventGallery from "./pages/events/Gallery";
import EventHighlights from "./pages/events/Highlights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Our Offerings routes */}
            <Route path="/offerings/value-proposition" element={<ValueProposition />} />
            <Route path="/offerings/who-can-join" element={<WhoCanJoin />} />
            <Route path="/offerings/young-minds-mashup" element={<YoungMindsMashup />} />
            <Route path="/offerings/mentor-talks" element={<MentorTalks />} />
            <Route path="/offerings/why-us" element={<WhyUs />} />
            
            {/* Team routes */}
            <Route path="/team/executive-management" element={<ExecutiveManagement />} />
            <Route path="/team/cohort-founders" element={<CohortFounders />} />
            <Route path="/team/advisory-board" element={<AdvisoryBoard />} />
            <Route path="/team/global-mentors" element={<GlobalMentors />} />
            
            {/* Careers routes */}
            <Route path="/careers" element={<Careers />} />
            {/* <Route path="/careers/jobs" element={<Jobs />} */}
            {/* <Route path="/careers/internships" element={<Internships />} */}
            
            {/* Applications routes */}
            <Route path="/apply/membership" element={<Membership />} />
            <Route path="/apply/discover-meet-registration" element={<DiscoverMeetRegistration />} />
            <Route path="/apply/discover-meet-feedback" element={<DiscoverMeetFeedback />} />
            <Route path="/apply/mentor-registration" element={<MentorRegistration />} />
            <Route path="/apply/startup-pitch" element={<StartupPitch />} />
            <Route path="/apply/membership-application" element={<MembershipApplication />} />
            
            {/* Events routes */}
            <Route path="/events/upcoming" element={<UpcomingEvents />} />
            {/* <Route path="/events/discover-meet-registration" element={<DiscoverMeetRegistration />} /> */}
            <Route path="/events/past" element={<PastEvents />} />
            <Route path="/events/gallery" element={<EventGallery />} />
            <Route path="/events/highlights" element={<EventHighlights />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;