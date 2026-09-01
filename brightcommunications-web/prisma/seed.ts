import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=oW9NIapHaFU";

const clientTestimonials = [
  { name: "Arsh Navas", role: "Chief Brand Officer", company: "Gatezone Transport" },
  { name: "Ashik", role: "Marketing Director", company: "Mr Alfred UAE" },
  { name: "Salman Thorop", role: "Founder & CEO", company: "Duvolka" },
  { name: "Jasim SM", role: "CEO", company: "Bosq Ergonomic Living" },
  { name: "Priya Menon", role: "Brand Manager", company: "Kanchana Foods" },
  { name: "Dr. Ramesh Kumar", role: "Director", company: "Renai Medicity" },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@brightcommunications.com";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Admin" },
    create: { email, passwordHash, name: "Admin" },
  });

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: clientTestimonials.map((item, index) => ({
        ...item,
        videoUrl: DEFAULT_VIDEO_URL,
        sortOrder: index,
        isActive: true,
      })),
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
