import "dotenv/config";
import prisma from "../src/lib/prisma";

const blogs = [
  {
    title:
      "GDIL Achieves Milestone in Indigenous Artillery Shell Production",

    slug:
      "gdil-achieves-milestone-indigenous-artillery-shell-production",

    type: "PRESS_RELEASE" as const,

    excerpt:
      "Successfully completed the first batch of high-tonnage forged shells under the Atmanirbhar Bharat initiative.",

    content:
      "GDIL has successfully completed the first batch of high-tonnage forged shells as part of its indigenous defence manufacturing capabilities.",

    image: "/images/home/insights.jpg",

    date: new Date("2026-08-22"),

    isPublished: true,
  },

  {
    title:
      "Strategic Partnership Announced for Advanced Energetic Materials",

    slug:
      "strategic-partnership-advanced-energetic-materials",

    type: "PRESS_RELEASE" as const,

    excerpt:
      "GDIL enters into a MOU with global defense partners to enhance chemical synthesis capabilities.",

    content:
      "GDIL continues to expand its strategic partnerships and advanced manufacturing capabilities.",

    image: "/images/home/insights.jpg",

    date: new Date("2026-07-10"),

    isPublished: true,
  },

  {
    title:
      "State-of-the-art Manufacturing Wing Inauguration",

    slug:
      "state-of-the-art-manufacturing-wing-inauguration",

    type: "INAUGURATION" as const,

    excerpt:
      "A landmark event for India's defense self-reliance.",

    content:
      "GDIL successfully inaugurated its advanced 155mm Shell manufacturing capacity and energetic material technology lines at Shirdi MIDC.",

    image: "/images/about/company-1.jpg",

    date: new Date("2026-05-01"),

    location: "Shirdi MIDC",

    tags: [
      "155mm Artillery Shell",
      "TNT",
      "RDX",
      "HMX",
      "Defence Manufacturing",
    ],

    eventName:
      "Inauguration of Artillery Shell & Energetics Technology Facility",

    isPublished: true,
  },

  {
    title:
      "High-Level Defense Delegation Visit",

    slug:
      "high-level-defense-delegation-visit",

    type: "LEADERSHIP_VISIT" as const,

    excerpt:
      "Reviewing the scalability of ordnance systems and energetic material filling lines.",

    content:
      "GDIL hosted a high-level defence delegation to review production standards and strategic manufacturing progress.",

    image: "/images/about/defence_offi.jpg",

    date: new Date("2026-05-01"),

    personName: "Shri Rajnath Singh",

    personRole: "Hon. Defence Minister of India",

    eventName:
      "Facility Inspection & Shell Capacity Review",

    location: "GDIL Manufacturing Facility",

    isPublished: true,
  },

  {
    title:
      "Technology Line Inauguration Ceremony",

    slug:
      "technology-line-inauguration-ceremony",

    type: "LEADERSHIP_VISIT" as const,

    excerpt:
      "Leadership visit and technology line inauguration ceremony.",

    content:
      "GDIL welcomed senior leadership during the inauguration of its advanced technology lines.",

    image: "/images/about/devendra.jpg",

    date: new Date("2026-05-01"),

    personName: "Shri Devendra Fadnavis",

    personRole: "Hon. Deputy CM of Maharashtra",

    eventName:
      "Technology Line Inauguration Ceremony",

    location: "Shirdi MIDC",

    isPublished: true,
  },

  {
    title:
      "Strategic Review of Energetics Production",

    slug:
      "strategic-review-energetics-production",

    type: "LEADERSHIP_VISIT" as const,

    excerpt:
      "Strategic review of GDIL energetic material production capabilities.",

    content:
      "A strategic review was conducted to evaluate GDIL's energetic material production capabilities.",

    image: "/images/home/chauhan.jpg",

    date: new Date("2026-05-01"),

    personName: "Gen. Anil Chauhan",

    personRole: "Chief of Defence Staff (CDS)",

    eventName:
      "Strategic Review of Energetics Production",

    location: "GDIL Manufacturing Facility",

    isPublished: true,
  },

  {
    title: "DefExpo 2024",

    slug: "defexpo-2024",

    type: "INDUSTRY_EVENT" as const,

    excerpt:
      "Presenting GDIL high-tonnage forged shell capabilities and TNT technology to global delegations.",

    content:
      "GDIL participated in DefExpo and showcased its indigenous manufacturing and engineering capabilities.",

    image: "/images/home/defence.jpg",

    date: new Date("2024-02-01"),

    location: "Gandhinagar, India",

    tags: [
      "Artillery Systems",
      "Energetics",
    ],

    eventName: "DefExpo 2024",

    isPublished: true,
  },

  {
    title: "Aero India 2025",

    slug: "aero-india-2025",

    type: "INDUSTRY_EVENT" as const,

    excerpt:
      "Showcasing advanced sub-systems and critical components for next-generation aerospace defense.",

    content:
      "GDIL showcased advanced engineering capabilities and defence-related components.",

    image: "/images/home/ctaa.png",

    date: new Date("2025-02-01"),

    location: "Bengaluru, India",

    tags: [
      "Precision Engineering",
      "Innovation",
    ],

    eventName: "Aero India 2025",

    isPublished: true,
  },

  {
    title: "Global Defense Forum",

    slug: "global-defense-forum",

    type: "INDUSTRY_EVENT" as const,

    excerpt:
      "Engaging in high-level discussions on indigenous supply chain resilience and technology transfer.",

    content:
      "GDIL participated in discussions focused on indigenous defence manufacturing, technology transfer and supply-chain resilience.",

    image: "/images/home/global_defence.jpg",

    date: new Date("2025-01-01"),

    location: "International Venue",

    tags: [
      "Strategic Partnerships",
    ],

    eventName: "Global Defense Forum",

    isPublished: true,
  },
];

async function main() {
  for (const blog of blogs) {
    await prisma.blogPost.upsert({
      where: {
        slug: blog.slug,
      },

      update: blog,

      create: blog,
    });
  }

  console.log(
    "Blog data seeded successfully.",
  );
}

main()
  .catch((error) => {
    console.error(
      "Blog seed failed:",
      error,
    );

    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });