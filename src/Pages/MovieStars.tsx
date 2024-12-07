import { useState } from "react";
import { useGetAllActors } from "../Functions/Queries/ActorHooks";
import ActorCard from "../Components/ActorCard";
import MoviesLoadingSkeleton from "../Components/LoadingSkeletons/MoviesLoadingSkeleton";

const ActorDirector = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { data: actors, isLoading, isError, error } = useGetAllActors(pageNum);

  const pageChange = (changeNum: number) => {
    if (pageNum + changeNum > 0) {
      setPageNum((prevPage) => prevPage + changeNum);
    }
  };

  if (isLoading) {
    <MoviesLoadingSkeleton />;
  }
  if(isError)
  {
    throw error;
  }

  return (
    <div>
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
        <h1 className="text-4xl font-extrabold tracking-wide mb-7 animate-fade-in">
          All Actors
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 lg:mx-16">
        {actors?.map((a) => (
            <ActorCard actor={a} key={a.id} />
          ))}
        </div>
        <div className="flex justify-center items-center my-4">
          <button
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            onClick={() => pageChange(-1)}
          >
            Previous Page
          </button>
          <div className="text-lg font-semibold mx-6">Page: {pageNum}</div>
          <button
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
            onClick={() => pageChange(1)}
          >
            Next Page
          </button>
        </div>
      </section>
    </div>
  );
};

export default ActorDirector;
