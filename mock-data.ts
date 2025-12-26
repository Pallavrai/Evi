import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.eventsModel.createMany({
    data: [
      {
        title: "HackFrost Reunion 2025",
        description:
          "A comeback meetup for HackFrost 2024 hackers, demos, networking, and chaotic debugging stories.",
      },
      {
        title: "Vultr Cloud Day",
        description:
          "Deploy at scale, break at scale, fix at scale. A deep dive into cloud infra and edge workloads.",
      },
      {
        title: "Smart India Showcase",
        description:
          "Top SIH 2024 projects presented live, judges, awards, and production horror tales.",
      },
      {
        title: "Backend Beasts Meetup",
        description:
          "A meetup focused on Go, Node, Rust, databases, idempotency, and scaling without crying.",
      },
      {
        title: "AI x Systems Conflux",
        description:
          "Where AI meets low-level systems. WASM, SIMD, compilers, GPUs, and future tech discussions.",
      },
    ],
  });

  console.log("Mock events inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
