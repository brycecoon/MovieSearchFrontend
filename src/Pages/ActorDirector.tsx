import { useState } from "react";
import { useGetAllActors } from "../Functions/Queries/ActorHooks";
import ActorCard from "../Components/ActorCard";

const ActorDirector = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { data: actors, isLoading } = useGetAllActors(pageNum);

  const pageChange = (changeNum: number) => {
    if (pageNum + changeNum > 0) {
      setPageNum((prevPage) => prevPage + changeNum);
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => pageChange(-1)}
        >
          Previous Page
        </button>
        <div className="text-lg font-semibold">Current Page: {pageNum}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => pageChange(1)}
        >
          Next Page
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actors?.map((a) => (
          <ActorCard actor={a} key={a.id} />
        ))}
      </div>
    </div>
  );
};

export default ActorDirector;