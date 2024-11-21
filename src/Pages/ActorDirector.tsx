import { useState } from "react";
import { useGetAllActors } from "../Functions/Queries/ActorHooks"
import ActorCard from "../Components/ActorCard";

const ActorDirector = () => {
    const [pageNum, setPageNum] = useState<number>(1);
    const {data:actors, isLoading} = useGetAllActors(pageNum);

if(isLoading)
{
    return <div>...Loading</div>
}

  return (
    <div>
        {actors?.map((a) => <ActorCard actor={a} key={a.id}/>)}
    </div>
  )
}

export default ActorDirector