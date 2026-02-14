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

export interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  type?: 'general' | 'upcoming' | 'past' | 'highlight' | 'gallery';
}

export interface EventGalleryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  media: MediaItem[];
}

export interface MentorTalk {
  id: string;
  title: string;
  speaker: string;
  date: string;
  description: string;
  media: MediaItem[];
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
  { id: "1", title: "Upcoming Tech Summit 2024", date: "2024-12-31", location: "San Francisco, CA", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", type: "upcoming" },
  { id: "2", title: "Past Innovation Conference", date: "2024-06-15", location: "New York, NY", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", type: "past" },
  { id: "3", title: "Annual Awards Gala", date: "2024-03-20", location: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop", type: "highlight" },
  { id: "4", title: "Summer Workshop Series", date: "2024-07-10", location: "Chicago, IL", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", type: "gallery" },
];

export const teamMembers: TeamMember[] = [
  
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
  { 
    id: "5", 
    name: "Ms.Mahima Kalyanam", 
    role: "Cohort Operations Ambassador", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271720/tm_9_hlwfnx.png",
    description: "A recent biotechnology graduate, who aspires to become a scientist in the field of medicine. She is eager to learn more than what is taught in educational institutions and believes that one can learn the most through experiences and failures.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  { 
    id: "6", 
    name: "Mr.Lalith Adla", 
    role: "Cohort Creative Ambassador", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271724/tm_7_ghl3gt.png",
    description: "A Creative Brain. Visual Storyteller. Tech Savvy Dreamer. Meet Lalith, a B. Tech CSE student who’s got one foot in code and the other in creativity. He doesn’t just design visuals,he builds stories that vibe, connect, and stay. Lalith blends innovation, teamwork, and design magic to make every project pop. Curious by nature and fearless with ideas, Lalith believes that visuals aren’t just about aesthetics, they are about energy, emotion, and impact. And that’s exactly what he brings to every frame he creates in YANC.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  { 
    id: "8", 
    name: "Mr.Nisidh Reddy",
    role: "Cohort Chief Financial Officer", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271727/tm_2_mz2b0c.png",
    description: "Nisidh serves as the Cohort Associate Chief Financial Officer at YANC, where he supports strategic financial planning, designing financial templates, reporting, and cohort-level fiscal oversight. Currently pursuing a degree in Computer Science at GITAM University, Hyderabad, he brings a unique blend of technical acumen and financial insight. He has represented Telangana in national-level chess championships and is a Winner of the Southern Railways chess championship, embodying leadership, discipline, and a growth mindset.",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  { 
    id: "7", 
    name: "Ms.Sanviti Reddy", 
    role: "Cohort Social Media Ambassador", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271721/tm_8_i9ebwy.png",
    description: "A recent graduate who enjoys making videos and taking pictures. She loves being creative and sharing stories through her work. She is excited to learn new things and be part of interesting projects..",
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  { 
    id: "9", 
    name: "Ms.Ananya Gadapa", 
    role: "Cohort Operations Ambassador (COA)", 
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271725/tm_6_eke72s.png",
    description: "Ananya is currently pursuing her engineering degree ,Ananya blends strategic thinking with a passion for innovation, creating solutions that connect technology and business. She has experience leading projects from the ground up, ensuring that each one moves smoothly from idea to execution. Known for her creativity and problem-solving mindset, she works closely with teams to turn challenges into opportunities.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
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
  }
];

export const executiveManagement: TeamMember[] = [
  {
    id: "1",
    name: "Mr.Swaminathan Gopal",
    role: "Founder & CEO",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271719/em_1_tnhted.png",
    description: "Swaminathan brings in over two decades of experience spanning technology, business strategy, and entrepreneurship. A hands-on entrepreneur and an IT executive, he has built high-performing engineering teams and spearheaded businesses from the ground up. He has led technology teams for Fortune 100 companies and is an alumnus of IIM-Calcutta. Whether it's leading startups or optimizing enterprise technology, Swami thrives on turning vision into reality.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/swaminathangopal",
      twitter: "https://twitter.com/swaminathangopal"
    }
  },
  {
    id: "2",
    name: "Mr.Ajay Thota",
    role: "Co-Founder & SPV, Technology",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271720/em_3_fm69dl.png",
    description: "Ajay Thota is an IT leader with 20+ years of US experience in leading multiple product development and digital transformation initiatives at MNCs across the globe. He is passionate about building teams by driving cultural change in individuals to become more conscientious and successful at a young age. Ajay holds an MS degree from NIU, USA, and a B.E from Osmania University.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/ajaythota",
      twitter: "https://twitter.com/ajaythota"
    }
  },
  {
    id: "3",
    name: "Mr.Ram Charan",
    role: "Co-Founder & CTO",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769274464/em_4_reayvx.png",
    description: "Ram Charan currently is an entrepreneur and comes with 20+ years of experience building products in the Software Engineering space working with Fortune 500 companies. He is vividly experienced with the Startup space in the roles of Founding Member, Technology Leadership, and Sustainable Product Innovations. For YANC, he is playing the role of CTO.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/ramcharan",
      github: "https://github.com/ramcharan"
    }
  },
  {
    id: "4",
    name: "Ms.Aarti Khandeker",
    role: "Co-Founder, Sales & Marketing",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769274547/em_2_rdyzwd.png",
    description: "Aarti Khandeker is founder of BentDesign Studio, an Entrepreneur and an architect with over a decade of experience in Design and Creativity. Worked on diverse projects - residential, commercial and institutional buildings.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/aartikhandeker",
      twitter: "https://twitter.com/aartikhandeker"
    }
  }
];

// Alias for backward compatibility
export const founders = executiveManagement;

export const mentors: TeamMember[] = [
  {
    id: "1",
    name: "Mr.Daisuke Tanji",
    role: "Founder CEO of Indobox Inc",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271719/gm_1_pgqxbt.png",
    description: "Mr. Daisuke Tanji has over 20 years experience with one of the biggest Japanese trading company as sales and marketing field, trading, investment etc. 5 years working experience in India (Delhi and Mumbai) as General Manager for development new business. Establishing Indo-Japan ecosystem to help young minds of both countries to learn and grow. His vision is The fusion of Japan and India creates new value. YANC and Indobox are collaborating in the space of cross-border education, cultural exchange, internships, workshops, industry exposure, and youth focused learning programs between India and Japan, with the shared vision of empowering young minds to learn, explore, and grow beyond borders.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/daisuketanji",
      twitter: "https://twitter.com/daisuketanji"
    }
  },
  {
    id: "2",
    name: "Mr.Cosme Almeida",
    role: "Abroad Programmes Director,Católica Porto Business School, Portugal",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271718/gm_2_bipsmf.png",
    description: "Cosme Almeida is an experienced professional with a demonstrated history of working in the education management industry, around different Continents, managing international accredited projects. Skilled in Marketing Management, Negotiation, Team Management, Intercultural Communication and Business Planning. Strong marketing professional with skills in Management Control and Finance. Financial Brand Valuation Consultant. Basketball Coach. YANC and Cosme Almeida partnership will open the gates for young minds of India and Portugal to explore both the countries for internships, industry exposure, job opportunities, startup incubation, immersive experiences for the youth and more.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/cosmealmeida",
      github: "https://github.com/cosmealmeida"
    }
  }
];

export const advisors: TeamMember[] = [
  {
    id: "1",
    name: "Mr.Lieven Cornelis",
    role: "Psychologist & Human Capital Strategist",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271731/ab_1_wmtwxr.png",
    description: "Lieven Cornelis is a seasoned psychologist and human capital strategist specializing in leadership development and behavioral assessment. He is the creator of the Koan-PM platform, a sophisticated tool designed to analyze personality traits and provide actionable insights for personal and professional growth. With extensive experience in 360-degree feedback and psychological safety, Lieven empowers individuals and organizations to enhance performance through self-awareness and targeted development.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/lievencornelis",
      twitter: "https://twitter.com/lievencornelis"
    }
  },
  {
    id: "2",
    name: "Mr.Mac Srinivasan",
    role: "Global Growth Mentor & Certified Franchise Expert",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271731/ab_2_tqsain.png",
    description: "Mac Srinivasan is a Global Growth Mentor and the CEO of ‘The Abundant Group’ , with over 35+ years of business experience across 70+ countries. Mac is a Certified Franchise Executive (International Franchise Association, USA) and a highly sought-after keynote speaker who has inspired over 200,000 entrepreneurs in his journey.As the former Global Markets President of BNI, Mac led global expansion and delivered consistent year-over-year growth, even in challenging times of uncertainty. He now dedicates his time to helping entrepreneurs and global franchises scale exponentially, combining strategic insight with deep.Beyond business, Mac is passionate about education, supporting over 1,000s of underprivileged children.Adventurer at heart:a fire-walker, bungee jumper, skydiver …Mac’s passion and purpose fuels his endless energy to help you achieve exponential results.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/macsrinivasan",
      twitter: "https://twitter.com/macsrinivasan"
    }
  },
  {
    id: "3",
    name: "Dr.Molly Joy",
    role: "Psychologist & Academic Leader. PhD",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271730/ab_3_go3nzf.png",
    description: "Dr. Molly Joy is a distinguished psychologist and academic leader with over two decades of experience in higher education and mental health. She served as the Head of the Department of Psychology at reputed colleges. Dr. Molly's research encompasses areas such as educational psychology, organizational behavior, and ecological intelligence, contributing significantly to both academic literature and practical applications. Her dedication to student counseling and curriculum development has positively impacted numerous learners and professionals in the field.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/drmollyjoy",
      github: "https://github.com/drmollyjoy"
    }
  },
  {
    id: "4",
    name: "Mr.Neil Gogte",
    role: "Chairman:KMIT Group of colleges",
    image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769271729/ab_4_pbozij.png",
    description: "Neil Gogte is a visionary technologist, entrepreneur, and academic leader with over three decades of experience in IT and education. He is the founder and owner of multiple educational institutions, including engineering and junior colleges like Keshav Memorial and NGIT, shaping thousands of student careers. Neil is also the Founder of Genesis Solutions which trained 70K professionals since 1992. Neil’s leadership continues to impact thousands of young professionals and institutions across India.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/neilgogte",
      twitter: "https://twitter.com/neilgogte"
    }
  }
];

export const testimonials: Testimonial[] = [
  { id: "1", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", author: "Person Name", company: "Company Name", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&facepad=2" },
  { id: "2", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", author: "Person Name", company: "Company Name", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&facepad=2" },
  { id: "3", quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.", author: "Person Name", company: "Company Name", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&facepad=2" },
];

// Indian States data
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh"
];

// Event gallery items
export const eventGalleryItems: EventGalleryItem[] = [
  {
    id: "1",
    title: "Annual Tech Conference 2024",
    date: "2024-11-15",
    description: "Our flagship annual tech conference featuring industry leaders and innovative startups.",
    media: [
      { id: "1", type: "image", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", alt: "Tech conference audience" },
      { id: "2", type: "image", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", alt: "Speaker presenting" },
      { id: "3", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271732/vid4_vbbn9h.mp4", alt: "Conference highlights video" },
      { id: "4", type: "image", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", alt: "Networking session" },
      { id: "5", type: "image", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", alt: "Workshop session" },
      { id: "6", type: "image", src: "https://images.unsplash.com/photo-1434494878194-7e9ce75f380f?w=800&h=600&fit=crop", alt: "Panel discussion" },
    ]
  },
  {
    id: "2",
    title: "Women in Tech Summit",
    date: "2024-10-22",
    description: "Celebrating women's contributions to technology and innovation.",
    media: [
      { id: "7", type: "image", src: "https://images.unsplash.com/photo-1556761222-9d6ecab38ec6?w=800&h=600&fit=crop", alt: "Women in tech panel" },
      { id: "8", type: "image", src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop", alt: "Female engineers discussing" },
      { id: "9", type: "image", src: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&h=600&fit=crop", alt: "Tech workshop" },
      { id: "10", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271735/vid1_tho4y2.mp4", alt: "Summit highlights" },
    ]
  },
  {
    id: "3",
    title: "Startup Pitch Night",
    date: "2024-09-18",
    description: "Showcasing innovative startups and connecting entrepreneurs with investors.",
    media: [
      { id: "11", type: "image", src: "https://images.unsplash.com/photo-1552664100-c2f8dc44b03f?w=800&h=600&fit=crop", alt: "Startup pitch presentation" },
      { id: "12", type: "image", src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop", alt: "Entrepreneurs networking" },
      { id: "13", type: "image", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", alt: "Investor meeting" },
    ]
  }
];

// Mentor talks
export const mentorTalks: MentorTalk[] = [
  {
    id: "1",
    title: "Navigating Your Career Path",
    speaker: "Emma Rodriguez",
    date: "2024-11-05",
    description: "Learn how to strategically plan and navigate your professional journey with industry expert Emma Rodriguez.",
    media: [
      { id: "14", type: "image", src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop", alt: "Emma Rodriguez speaking" },
      { id: "15", type: "image", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop", alt: "Audience listening" },
      { id: "16", type: "image", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop", alt: "Q&A session" },
      { id: "17", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271734/vid2_fprt1h.mp4", alt: "Talk highlights" },
    ]
  },
  {
    id: "2",
    title: "Building Resilient Teams",
    speaker: "David Park",
    date: "2024-10-15",
    description: "Insights on creating strong, adaptable teams that thrive in challenging environments.",
    media: [
      { id: "18", type: "image", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop", alt: "David Park presenting" },
      { id: "19", type: "image", src: "https://images.unsplash.com/photo-1552664100-c2f8dc44b03f?w=800&h=600&fit=crop", alt: "Team building activity" },
      { id: "20", type: "image", src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop", alt: "Collaboration session" },
    ]
  },
  {
    id: "3",
    title: "Innovation in Startups",
    speaker: "Mr.Daisuke Tanji",
    date: "2024-09-25",
    description: "Exploring how startups can drive innovation and create sustainable competitive advantages.",
    media: [
      { id: "21", type: "image", src: "https://images.unsplash.com/photo-1556761222-9d6ecab38ec6?w=800&h=600&fit=crop", alt: "Daisuke Tanji speaking" },
      { id: "22", type: "image", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop", alt: "Innovation workshop" },
      { id: "23", type: "video", src: "https://res.cloudinary.com/dzjot5f7d/video/upload/v1769271733/vid3_zqqyvf.mp4", alt: "Innovation showcase" },
    ]
  }
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
