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

// Applications pages
import Membership from "./pages/apply/Membership";
import DiscoverMeetRegistration from "./pages/apply/DiscoverMeetRegistration";
import DiscoverMeetFeedback from "./pages/apply/DiscoverMeetFeedback";
import MentorRegistration from "./pages/apply/MentorRegistration";
import StartupPitch from "./pages/apply/StartupPitch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/faq" element={<Faq />} />
          
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
          <Route path="/careers/jobs" element={<Jobs />} />
          <Route path="/careers/internships" element={<Internships />} />
          
          {/* Applications routes */}
          <Route path="/apply/membership" element={<Membership />} />
          <Route path="/apply/discover-meet-registration" element={<DiscoverMeetRegistration />} />
          <Route path="/apply/discover-meet-feedback" element={<DiscoverMeetFeedback />} />
          <Route path="/apply/mentor-registration" element={<MentorRegistration />} />
          <Route path="/apply/startup-pitch" element={<StartupPitch />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
