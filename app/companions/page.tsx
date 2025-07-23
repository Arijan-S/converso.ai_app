import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  try {
    const companions = await getAllCompanions({ subject, topic });

    console.log("Fetched companions:", companions);

    return (
      <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>Companion Library</h1>
          <div className="flex gap-4">
            <SearchInput />
            <SubjectFilter />
          </div>
        </section>

        <section className="companions-grid">
          {companions && companions.length > 0 ? (
            companions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p>No companions found.</p>
            </div>
          )}
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error fetching companions:", error);
    return (
      <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>Companion Library</h1>
          <div className="flex gap-4">Filters</div>
        </section>

        <section className="companions-grid">
          <div className="text-center py-8">
            <p>
              Error loading companions. Please check your database connection.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Make sure your environment variables are properly configured.
            </p>
          </div>
        </section>
      </main>
    );
  }
};

export default CompanionsLibrary;
