import { useState } from "react";
import { listDTO } from "../Data/DTOs/listDTO";
import { useAddList, useAllLists } from "../Functions/Queries/ListHooks";

import MovieList from "../Components/MovieList";

const MyLists = () => {
  const { data: lists, isLoading: listsLoading } = useAllLists();
  const addList = useAddList();

  const [listName, setListName] = useState<string>("");

  const addNewList = () => {
    const newList: listDTO = {
      name: listName,
      userid: 18,
    };
    addList.mutate(newList);
    setListName("");
  };

  if (listsLoading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div>
        {lists?.map((l) => (
          <div key={l.id}>
            <div className="text-3xl pt-7 pb-3">{l.name}</div>
            <div key={l.id}>
              <MovieList key={l.id} listId={l.id} />
            </div>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={listName}
        placeholder="My New List"
        className="pt-6"
        onChange={(e) => setListName(e.target.value)}
      />
      <button className="bg-green-300 text-green-700" onClick={addNewList}>
        Add A List
      </button>
    </>
  );
};

export default MyLists;
