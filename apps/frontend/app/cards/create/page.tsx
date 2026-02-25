import { Suspense } from "react";
import CreateCardClient from "./create-card-client";

const CreateCard = async () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen md:py-24 bg-gray-900">
            <div className="mx-auto max-w-10xl">
                <Suspense fallback={<div>Loading...</div>}>
                    <CreateCardClient />
                </Suspense>
            </div>
        </section>
    );
};

export default CreateCard;
