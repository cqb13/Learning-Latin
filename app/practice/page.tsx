import Button from "@/components/shared/button";
import { practiceRoutes } from "@/lib/routes";

export default function Practice() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)] text-center">
        Practice Charts
      </h1>
      <section className="mt-6 flex flex-wrap justify-center items-center gap-3 w-full max-md:flex-col">
        {practiceRoutes.map((route, i) => (
          <Button
            link={`/practice/chart?type=${route[0].toLowerCase().replace(" ", "-")}`}
            class=" w-1/4 max-md:w-3/4 max-xs:w-11/12"
            key={i}
          >
            {route[0]}
          </Button>
        ))}
      </section>
    </section>
  );
}
