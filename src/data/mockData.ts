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
  socialLinks?: SocialLinks;
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  socialLinks?: SocialLinks;
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
  { id: "1", type: "image", src: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271737/3_mcyjpp.jpg", alt: "Tech workspace" },
  { id: "2", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271732/vid4_vbbn9h.mp4", alt: "Community event video" },
  { id: "3", type: "image", src: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271736/5_kyixex.jpg", alt: "Team collaboration" },
  { id: "4", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271734/vid2_fprt1h.mp4", alt: "Startup office video" },
  { id: "5", type: "image", src: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271737/2_ft3bye.jpg", alt: "Coding session" },
  { id: "6", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271733/vid3_zqqyvf.mp4", alt: "Working remotely video" },
  { id: "7", type: "image", src: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769272876/7_xdv4gd.jpg", alt: "Developer setup" },
  { id: "8", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271735/vid1_tho4y2.mp4", alt: "Innovation lab video" },
  { id: "9", type: "image", src: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769272882/6_xlueja.jpg", alt: "Mentor talks" },
];

export const programs: Program[] = [
  { id: "1", title: "Mentorship Programs", description: "Connect with experienced professionals who guide your career journey and personal growth.", icon: "rocket" },
  { id: "2", title: "Skill Development", description: "Enhance your abilities through workshops, training sessions, and practical exercises.", icon: "users" },
  { id: "3", title: "Networking Events", description: "Build valuable connections with peers, industry leaders, and potential collaborators.", icon: "lightbulb" },
  { id: "4", title: "Leadership Training", description: "Develop leadership qualities and learn to inspire others in professional settings.", icon: "target" },
];

export const events: Event[] = [
  { id: "1", title: "Event Title", date: "2025-02-15", location: "City, Country", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop" },
  { id: "2", title: "Event Title", date: "2025-03-20", location: "City, Country", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop" },
  { id: "3", title: "Event Title", date: "2025-04-10", location: "City, Country", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop" },
];

export const teamMembers: TeamMember[] = [
  { 
    id: "1", 
    name: "Ms.Hasini Kanumuru", 
    role: "Cohort Alumni Ambassador", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271721/tm_1_bmw2xm.png",
    description: "Hasini is a Alumni Ambassador at YANC,She is a dynamic young changemaker with a passion for purposeful innovation and community empowerment. As the founder of Sama and Pratirodha, she embodies an entrepreneurial mindset driven to solve real-world challenges and make an impact. With leadership experience as Secretary General at ACC MUN and accolades in debates, elocution, and performing arts, Hasini seamlessly blends intellect, creativity, and social consciousness. A performer of 16 dance forms, she continues to shine across academic, artistic, and leadership platforms.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  { 
    id: "2", 
    name: "Mr.Mohana Karingula", 
    role: "Cohort Chief Financial Officer", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271726/tm_3_wxlfdv.png",
    description: "Mohana is a Cohort CFO at YANC, he is an aspiring commerce student from Hyderabad. Having interned in both digital marketing and real estate documentation, he brings a unique blend of creativity and analytical thinking. A two-time state medalist in swimming and a district-level gymnastics achiever, Mohana exemplifies discipline, focus, and versatility. With strong commitment level and a flair for quick learning, he is eager to learn and make his mark in the world of finance and beyond",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  { 
    id: "3", 
    name: "Ms.Riana Agrawal", 
    role: "Cohort Marketing Ambassador (CMA)", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271725/tm_4_dy8vof.png",
    description: "Riana is an enthusiastic YANC team member with a strong commitment to learning beyond traditional education and empowering others to do the same. As the co-founder of a student led organisation, Aequitas, and organiser of events like Pitch Perfect, Riana brings hands-on experience in leadership, planning, and teamwork. Passionate about finance, and building real-world skills, she believes in the power of meaningful conversations and growth. At YANC, she aims to help create a community where young people think bigger, lead confidently, and turn ideas into action.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  { 
    id: "4", 
    name: "Mr.Uday Pothalaraju",
    role: "Cohort Launch Ambassador", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271725/tm_5_x521f2.png",
    description: "Uday is a student at BITS Pilani, Hyderabad, driven by curiosity, community, and the belief that ideas can create real-world impact.As YANC’s Cohort Launch Ambassador, he leads the launch of new cohorts from the ground up — building networks, engaging institutions, and inspiring members to join a growing movement.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
];

export const founders: Founder[] = [
  {
    id: "1",
    name: "Ms.Aarti Khandeker",
    title: "Co-Founder, Sales & Marketing",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769274547/em_2_rdyzwd.png",
    bio: "Aarti Khandeker is founder of BentDesign Studio, an Entrepreneur and an architect with over a decade of experience in Design and Creativity. Worked on diverse projects - residential, commercial and institutional buildings.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johnsmith",
      twitter: "https://twitter.com/johnsmith"
    }
  },
  {
    id: "2",
    name: "Mr.Ajay Thota",
    title: "Co-Founder & SPV, Technology",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271720/em_3_fm69dl.png",
    bio: "Ajay Thota is an IT leader with 20+ years of US experience in leading multiple product development and digital transformation initiatives at MNCs across the globe. He is passionate about building teams by driving cultural change in individuals to become more conscientious and successful at a young age. Ajay holds an MS degree from NIU, USA, and a B.E from Osmania University.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mariagarcia",
      twitter: "https://twitter.com/mariagarcia"
    }
  },
  {
    id: "3",
    name: "Mr.Ram Charan",
    title: "Co-Founder & CTO",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769274464/em_4_reayvx.png",
    bio: "Ram Charan currently is an entrepreneur and comes with 20+ years of experience building products in the Software Engineering space working with Fortune 500 companies. He is vividly experienced with the Startup space in the roles of Founding Member, Technology Leadership, and Sustainable Product Innovations. For YANC, he is playing the role of CTO.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim"
    }
  },
  {
    id: "4",
    name: "Mr.Swaminathan Gopal",
    title: "Founder & CEO",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271719/em_1_tnhted.png",
    bio: "Swaminathan brings in over two decades of experience spanning technology, business strategy, and entrepreneurship. A hands-on entrepreneur and an IT executive, he has built high-performing engineering teams and spearheaded businesses from the ground up. He has led technology teams for Fortune 100 companies and is an alumnus of IIM-Calcutta. Whether it's leading startups or optimizing enterprise technology, Swami thrives on turning vision into reality.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasharma",
      twitter: "https://twitter.com/priyasharma"
    }
  }
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
