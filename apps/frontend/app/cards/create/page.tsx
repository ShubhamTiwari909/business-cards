import Form from "@/components/form/Form";
import { Suspense } from "react";
const CreateCard = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 min-h-screen md:py-20 bg-gray-900">
      <div className="mx-auto max-w-10xl">
        <Suspense fallback={<div>Loading...</div>}>
          <Form />
        </Suspense>
      </div>
    </section>
  );
};

export default CreateCard;
