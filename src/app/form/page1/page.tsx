import FormCard from "@/components/form/FormCard";
import { Button } from "@/components/ui/button";

const mockCardData = [
  { title: "Helse og omsorg" },
  { title: "Utdanning og forskning" },
  { title: "Teknologi og IT" },
  { title: "Salg og service" },
  { title: "Bygg og anlegg" },
  { title: "Kunst og kultur" },
  { title: "Ideell organisasjon / frivillig arbeid" },
  { title: "Offentlig sektor" },
  { title: "Konsulentvirksomhet" },
  { title: "Transport og logistikk" },
  { title: "Landbruk og naturforvaltning" },
  { title: "Finans og forsikring" },
  { title: "Produksjon og industri" },
];

const Page = () => {
  return (
    <>
      <div className="grid grid-cols-[220px_1fr] grid-row-3">
        <div className="row-span-3 bg-blue-100"></div>
        <section className="px-16 font-medium tracking-wide space-y-2 cursor-default pt-16 bg-green-50">
          <p className="text-text-header text-4xl">
            Hvilken bransje jobber din organsiasjon i?
          </p>
        </section>
        <div className="grid grid-cols-5 grid-rows-5 bg-red-100 p-10 w-fit gap-4">
          {mockCardData.map((data, index) => (
            <FormCard key={index} card={{ title: data.title, icon: <></> }} />
          ))}

          <div className="col-start-1 row-start-auto col-span-full m-2">
            <Button className="bg-primary-default text-white">Neste</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
