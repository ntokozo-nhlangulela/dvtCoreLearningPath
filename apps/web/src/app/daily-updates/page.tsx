import { DailyUpdateForm } from "@/components/daily-update-form";
import { DailyUpdateCard } from "@/components/daily-update-card";
import { getDailyUpdates } from "@/lib/get-daily-updates";

export default async function DailyUpdatesPage() {
  const updates = await getDailyUpdates();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Daily Updates
      </h1>

      <DailyUpdateForm />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Update History
        </h2>

        {updates.map((update) => (
          <DailyUpdateCard
            key={update.id}
            update={update}
          />
        ))}
      </section>
    </main>
  );
}