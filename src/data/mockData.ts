// Mock data structures - designed for easy CMS replacement
// Replace these arrays with Sanity/CMS queries later

export interface HeroMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  bio?: string;
  socialLinks?: SocialLinks;
}

export interface Founder extends TeamMember {
  bio?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  image: string;
}

export interface AboutUsContent {
  headline: string;
  description: string;
  vision: {
    title: string;
    description: string;
    icon: string;
  };
  mission: {
    title: string;
    description: string;
    icon: string;
  };
}

// Hero carousel media - replace src with actual CMS URLs
export const heroMedia: HeroMediaItem[] = [
  { id: "1", type: "image", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop", alt: "Tech workspace" },
  { id: "2", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", alt: "Community event video" },
  { id: "3", type: "image", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop", alt: "Team collaboration" },
  { id: "4", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", alt: "Startup office video" },
  { id: "5", type: "image", src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop", alt: "Coding session" },
  { id: "6", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", alt: "Working remotely video" },
  { id: "7", type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop", alt: "Developer setup" },
  { id: "8", type: "video", src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", alt: "Innovation lab video" },
];

export const programs: Program[] = [
  { id: "1", title: "Program Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: "rocket" },
  { id: "2", title: "Program Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: "users" },
  { id: "3", title: "Program Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: "lightbulb" },
  { id: "4", title: "Program Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", icon: "target" },
];

export const events: Event[] = [
  { id: "1", title: "Event Title", date: "2025-02-15", location: "City, Country", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop" },
  { id: "2", title: "Event Title", date: "2025-03-20", location: "City, Country", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop" },
  { id: "3", title: "Event Title", date: "2025-04-10", location: "City, Country", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop" },
];

export const teamMembers: TeamMember[] = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    role: "Chief Executive Officer", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&facepad=2",
    description: "Alex leads our team with over 10 years of experience in tech innovation. Passionate about building sustainable solutions for tomorrow.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  { 
    id: "2", 
    name: "Sarah Williams", 
    role: "Lead Designer", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&facepad=2",
    description: "Sarah brings creativity and vision to our products. She specializes in user-centered design principles.Sarah brings creativity and vision to our products. She specializes in user-centered design principles.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  { 
    id: "3", 
    name: "Michael Chen", 
    role: "CTO & Lead Developer", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&facepad=2",
    description: "Michael drives our technical strategy and ensures our products are scalable and secure.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  { 
    id: "4", 
    name: "Emma Rodriguez", 
    role: "Marketing Director", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&facepad=2",
    description: "Emma connects our products with the world. She crafts compelling narratives that resonate with our audience.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
];

export const testimonials: Testimonial[] = [
  { id: "1", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", author: "Person Name", company: "Company Name", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&facepad=2" },
  { id: "2", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", author: "Person Name", company: "Company Name", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&facepad=2" },
  { id: "3", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", author: "Person Name", company: "Company Name", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&facepad=2" },
];

// About Us content - CMS-driven
export const aboutUsContent: AboutUsContent = {
  headline: "About Us",
  description: "Empowering Young Minds through Life Skills\n\nNetworking and life skills are crucial in today's fast-paced world. Networking helps you connect with diverse individuals, opening doors to job opportunities, partnerships, and mentorships. It fosters knowledge sharing and skill development, enhancing your professional growth. Life skills, such as communication, problem-solving, and emotional intelligence, are essential for navigating daily challenges and building meaningful relationships. Together, these skills enable you to adapt to changing environments, make informed decisions, and achieve personal and professional success. Embracing networking and life skills ensures you stay relevant, resilient, and ready to seize new opportunities.",
  vision: {
    title: "Vision",
    description: "Empowering young minds together.",
    icon: "eye"
  },
  mission: {
    title: "Mission",
    description: "Building better people for better Tomorrow.",
    icon: "target"
  }
};
