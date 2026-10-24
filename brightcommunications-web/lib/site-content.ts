export { services } from "@/lib/service-content";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/clients", label: "Clients" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const marqueeServices = [
  "Brand Strategy & Identity",
  "Advertising & Creative",
  "360° Integrated Campaigns",
  "Digital Marketing",
  "Performance Marketing",
  "Website Design & Development",
  "Video Production & Ad Films",
  "Social Media Management",
] as const;

export const legacyHighlights = [
  { value: "29+", label: "Years Of Excellence" },
  { value: "40+", label: "Creative Professionals" },
  { value: "360°", label: "Integrated Communication Solutions" },
  { value: "Multi", label: "Serving Brands Across Diverse Industries" },
  { value: "India & GCC", label: "Market Exposure" },
] as const;

export const aboutValues = [
  {
    title: "Mission",
    desc: "To help businesses build meaningful connections, create lasting impressions, and achieve sustainable growth through strategic communication.",
  },
  {
    title: "Vision",
    desc: "To remain one of India's most trusted integrated communications partners — innovative, adaptable, and future-ready.",
  },
  {
    title: "Values",
    desc: "Trust, creativity, consistency, and results — the foundations of every client relationship and every campaign we deliver.",
  },
  {
    title: "Culture",
    desc: "A collaborative agency environment where strategists, creators, and technologists work as one team to deliver measurable impact.",
  },
] as const;

export const workCategories = [
  "Case Studies",
  "Campaigns",
  "Branding Projects",
  "Digital Projects",
  "Video Projects",
] as const;

export const whyChooseBright = [
  {
    title: "Curiosity comes first.",
    desc: "We ask questions, push back on assumptions, and go looking for the idea everyone else missed.",
  },
  {
    title: "People before projects.",
    desc: "We listen, we work with you rather than at you, and we never forget there are real people behind every brand.",
  },
  {
    title: "Creativity with a purpose.",
    desc: "A clever idea is nice. One that solves the right problem is better.",
  },
  {
    title: "Always ready to rethink.",
    desc: "Experience gives us perspective. Curiosity keeps us moving.",
  },
] as const;

export const processSteps = [
  {
    num: "01 / DISCOVER",
    title: "Discover",
    desc: "Understanding your business, audience, and opportunities.",
  },
  {
    num: "02 / STRATEGISE",
    title: "Strategise",
    desc: "Developing communication and growth strategies.",
  },
  {
    num: "03 / CREATE",
    title: "Create",
    desc: "Crafting compelling ideas and experiences.",
  },
  {
    num: "04 / EXECUTE",
    title: "Execute",
    desc: "Launching campaigns across the right channels.",
  },
  {
    num: "05 / OPTIMISE",
    title: "Optimise",
    desc: "Tracking performance and continuously improving outcomes.",
  },
] as const;

export const industries = [
  {
    name: "Healthcare",
    desc: "Communication that builds trust and connects patients with care.",
  },
  {
    name: "Education",
    desc: "Branding and campaigns that inspire learning and engagement.",
  },
  {
    name: "Real Estate & Construction",
    desc: "Positioning developments and building buyer confidence.",
  },
  {
    name: "Retail & Lifestyle",
    desc: "Campaigns that drive footfall, loyalty, and brand desire.",
  },
  {
    name: "Hospitality",
    desc: "Experiences that capture the essence of your destination.",
  },
  {
    name: "Finance & Technology",
    desc: "Clear, credible communication for complex sectors.",
  },
  {
    name: "Manufacturing & Industrial",
    desc: "B2B storytelling that strengthens market presence.",
  },
  {
    name: "Automotive",
    desc: "Brand and campaign work for mobility and automotive brands.",
  },
  {
    name: "FMCG",
    desc: "High-impact creative for fast-moving consumer markets.",
  },
] as const;

export const clientIndustryTags = [
  "Healthcare",
  "Education",
  "Real Estate",
  "Construction",
  "Retail",
  "Hospitality",
  "Finance",
  "Technology",
  "Manufacturing",
  "Lifestyle",
] as const;

/** TODO: Replace with real client logos when assets are provided */
export const clientLogoSlots = 12;

export const brightsydePillars = [
  {
    title: "About Brightsyde",
    desc: "An industry-led educational initiative connecting aspiring professionals with real agency experience.",
  },
  {
    title: "Courses",
    desc: "Practical programmes for marketers, designers, content creators, and communication professionals.",
  },
  {
    title: "Success Stories",
    desc: "Graduates and participants who have built careers through hands-on industry exposure.",
  },
  {
    title: "Industry Mentorship",
    desc: "Guidance from experienced strategists, creatives, and digital specialists at Bright.",
  },
] as const;

export const teamRoles = [
  { role: "Founder", name: "K. V. Shaji", featured: true },
  { role: "Leadership Team", name: "Leadership", featured: false },
  { role: "Creative Team", name: "Creative", featured: false },
  { role: "Content Creators", name: "Content", featured: false },
  { role: "Digital Strategists", name: "Digital", featured: false },
  { role: "Performance Marketing", name: "Performance", featured: false },
  { role: "Video Production", name: "Production", featured: false },
  { role: "Developers & Technology", name: "Technology", featured: false },
] as const;

export const awards = [
  "Industry Awards",
  "Creative Excellence Awards",
  "Marketing Awards",
  "Google Partner Badge",
  "Meta Partner Badge",
  "Professional Certifications",
  "Industry Association Memberships",
  "Media Features",
] as const;

/** TODO: Replace with real job listings when provided */
export const careerOpenings = [
  { title: "Creative Designer", dept: "Creative" },
  { title: "Digital Marketing Specialist", dept: "Digital" },
  { title: "Content Writer", dept: "Content" },
] as const;

export const insightCategories = [
  "Branding Insights",
  "Marketing Trends",
  "Digital Innovation",
  "Communication Strategies",
  "Industry Perspectives",
] as const;

export const faqItems = [
  {
    question: "What services does Bright Communications offer?",
    answer:
      "Bright Communications offers brand strategy & identity, advertising & creative communication, 360° integrated campaigns, digital marketing, performance marketing, website design & development, video production & ad films, and social media management — all delivered by our in-house team.",
  },
  {
    question: "How long has Bright Communications been operating?",
    answer:
      "Bright Communications was founded in 1996 by K.V. Shaji. With nearly three decades of experience, we have evolved from a traditional advertising agency into a fully integrated communications partner.",
  },
  {
    question: "Do you work with businesses outside Kerala?",
    answer:
      "Yes. While we are based in Kochi, Kerala, we serve clients across India and the GCC region, delivering communication solutions for diverse markets and audiences.",
  },
  {
    question: "Can Bright manage digital marketing campaigns?",
    answer:
      "Absolutely. Our digital marketing and performance marketing teams manage end-to-end campaigns focused on visibility, engagement, and measurable ROI.",
  },
  {
    question: "Do you provide website development services?",
    answer:
      "Yes. We design and develop websites that combine creativity, functionality, and performance — from brand-aligned UI/UX to full development and optimisation.",
  },
  {
    question: "Do you offer video production services?",
    answer:
      "Yes. We have in-house video production capabilities, including ad films and visual storytelling for campaigns across platforms.",
  },
  {
    question: "Can Bright execute 360° integrated campaigns?",
    answer:
      "Yes. We build seamless brand experiences across every customer touchpoint — from strategy and creative to digital, production, and performance.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve healthcare, education, real estate & construction, retail & lifestyle, hospitality, finance & technology, manufacturing & industrial, automotive, and FMCG sectors.",
  },
  {
    question: "How can I start a project with Bright?",
    answer:
      "Reach out via our contact form, email hello@brightcommunications.com, or call us. Share your project brief and our team will connect with you to discuss scope, timeline, and next steps.",
  },
] as const;

export const contactInfo = {
  location: "Kochi, Kerala",
  email: "hello@brightcommunications.com",
  phone: "+91 XXXXX XXXXX",
  whatsapp: "+91 XXXXX XXXXX",
} as const;
