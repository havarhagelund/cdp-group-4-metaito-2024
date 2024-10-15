// rm -rf .next/cache    -if not updating
import FormCard from "@/components/form/FormCard";
import { Button } from "@/components/ui/button";

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
          {/* random data */}
          <FormCard
            card={{
              title: "Maritime",
              icon: (
                <span role="img" aria-label="ship">
                  🚢
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Health",
              icon: (
                <span role="img" aria-label="hospital">
                  🏥
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Economy",
              icon: (
                <span role="img" aria-label="money">
                  💰
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Technology",
              icon: (
                <span role="img" aria-label="robot">
                  🤖
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Home",
              icon: (
                <span role="img" aria-label="house">
                  🏠
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Maritime",
              icon: (
                <span role="img" aria-label="ship">
                  🚢
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Health",
              icon: (
                <span role="img" aria-label="hospital">
                  🏥
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Economy",
              icon: (
                <span role="img" aria-label="money">
                  💰
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Technology",
              icon: (
                <span role="img" aria-label="robot">
                  🤖
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Home",
              icon: (
                <span role="img" aria-label="house">
                  🏠
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Maritime",
              icon: (
                <span role="img" aria-label="ship">
                  🚢
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Health",
              icon: (
                <span role="img" aria-label="hospital">
                  🏥
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Economy",
              icon: (
                <span role="img" aria-label="money">
                  💰
                </span>
              ),
            }}
          />
          <FormCard
            card={{
              title: "Technology",
              icon: (
                <span role="img" aria-label="robot">
                  🤖
                </span>
              ),
            }}
          />
          <div className="col-start-1 row-start-auto col-span-full m-2">
            <Button className="bg-primary-default text-white">Neste</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
