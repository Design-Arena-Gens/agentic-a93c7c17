import { IntelBoard } from "@/components/IntelBoard";
import { generateDailyHorrorIntel } from "@/lib/horrorData";

export const dynamic = "force-dynamic";

export default async function Page() {
  const intel = generateDailyHorrorIntel();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14">
      <IntelBoard initialData={intel} />
      <footer className="text-center text-xs uppercase tracking-[0.4em] text-neutral-500">
        Updated daily • Optimized for US Horror Audience • {new Date().toLocaleDateString("en-US", {
          timeZone: "America/New_York",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </footer>
    </main>
  );
}
