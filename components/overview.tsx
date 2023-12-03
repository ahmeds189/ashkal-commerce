import { overview } from "@/lib/constants";

export default function Overview() {
  return (
    <section className="border-t bg-muted/20 py-16 text-center">
      <ul className="container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {overview.map((item) => (
          <li key={item.name} className="">
            <span className="mx-auto mb-5 block w-fit rounded-full border-2 border-blue-600/50 bg-accent p-3">
              <item.icon />
            </span>
            <h3 className="mb-3 font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.details}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
