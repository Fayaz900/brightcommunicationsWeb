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
  "Advertising & Creative Campaigns",
  "Digital Marketing",
  "Performance Marketing",
  "Website Design & Development",
  "Video Production",
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
    desc: "We start by listening: your business, your audience, and where the opportunities are.",
  },
  {
    num: "02 / STRATEGISE",
    title: "Strategise",
    desc: "We turn what we've learned into a clear plan for how to communicate and grow.",
  },
  {
    num: "03 / CREATE",
    title: "Create",
    desc: "Ideas, words, and designs that people notice and remember.",
  },
  {
    num: "04 / EXECUTE",
    title: "Execute",
    desc: "We take the work live on the right channels at the right time.",
  },
  {
    num: "05 / OPTIMISE",
    title: "Optimise",
    desc: "We track what's working, learn from what isn't, and keep improving.",
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
      "We offer six services: brand strategy and identity, advertising and creative campaigns, digital marketing, performance marketing, website design and development, and video production. Between them, they cover branding and logo design, print and outdoor ads, SEO, social media, content, AEO, Google, Meta, and YouTube ads, lead generation, websites, e-commerce, and video. One in-house team looks after all of it.",
  },
  {
    question: "How long has Bright Communications been operating?",
    answer:
      "Since 1996. That's three decades of watching the industry change, and we're still curious about what comes next.",
  },
  {
    question: "Do you work with businesses outside Kerala?",
    answer:
      "Yes. We're based in Kochi, Kerala, and we're happy to work with brands wherever they are. Tell us where you want to go, and we'll work out the best way to get there together.",
  },
  {
    question: "Can Bright manage digital marketing campaigns?",
    answer:
      "Yes. Between digital marketing and performance marketing, we plan and run campaigns from start to finish: SEO, social media, content, Google, Meta, and YouTube ads, and lead generation, with tracking so you can see what's working. If you're looking for a digital marketing company in Kerala that treats creativity and data as equals, we'd like to hear from you.",
  },
  {
    question: "Do you provide website development services?",
    answer:
      "Yes. We design and build websites that feel like your brand and are easy to use, from full websites and online stores to landing pages for a single campaign.",
  },
  {
    question: "Do you offer video production services?",
    answer:
      "Yes. We make brand films, product videos, and reels, from the first idea to the final edit.",
  },
  {
    question: "Can Bright execute 360° integrated campaigns?",
    answer:
      "Yes. A 360° campaign is one idea running across every channel that matters, such as print, outdoor, digital, social, and video, so people meet the same brand wherever they look. We plan it, create it, and run it.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work across nine industries: healthcare, education, real estate and construction, retail and lifestyle, hospitality, finance and technology, manufacturing and industrial, automotive, and FMCG. Whatever the industry, we start the same way, by listening, because a hospital, a hotel, and a car showroom don't talk to the same people in the same way. You'll find more on our Industries page.",
  },
  {
    question: "How can I start a project with Bright?",
    answer:
      "Tell us what you have in mind through the contact page, on WhatsApp, or by email. A rough idea is fine. We'll set up a conversation, ask a lot of questions, and suggest where to start.",
  },
  {
    question: "How do I choose the right advertising agency in Kochi?",
    answer:
      "Look for a team that asks about your business before it talks about its own ideas, shows work that solved real problems, and is honest about what will and won't work. The best advertising agency in Kochi for you is the one you'd happily sit across the table from for years. We'd like to be that one.",
  },
  {
    question: "What is AEO, and do I need it?",
    answer:
      "AEO stands for Answer Engine Optimisation. It's about making your brand easy for AI tools and answer engines to find, understand, and recommend, alongside traditional SEO. If your customers ask questions online before they buy, it's worth having.",
  },
] as const;

export const contactInfo = {
  location: "Kochi, Kerala",
  email: "hello@brightcommunications.com",
  phone: "+91 XXXXX XXXXX",
  whatsapp: "+91 XXXXX XXXXX",
} as const;
