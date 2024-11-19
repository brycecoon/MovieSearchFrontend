import { useState } from "react";
import { listDTO } from "../Data/DTOs/listDTO";
import { ListMovieDTO } from "../Data/DTOs/listMovieDTO";
import { List } from "../Data/Interfaces/List";
import {
  useAddList,
  useAllLists,
  useDeleteList,
  useEditList,
} from "../Functions/Queries/ListHooks";
import {
  useAddListMovie,
  useAllListMovies,
  useDeleteListMovie,
} from "../Functions/Queries/listMovieHooks";

const MyLists = () => {
  const { data: lists, isLoading: listsLoading } = useAllLists();
  const { data: listMovies, isLoading: listMoviesLoading } = useAllListMovies();
  const addList = useAddList();
  const updateList = useEditList();
  const deleteList = useDeleteList();
  const deleteListMovie = useDeleteListMovie();
  const [listName, setListName] = useState<string>("");

  const addNewList = () => {
    const newList: listDTO = {
      name: listName,
      userid: 18,
    };
    addList.mutate(newList);
    setListName("");
  };

  const deleteFromList = (id: number) => {
    deleteListMovie.mutate(id);
  };

  const deleteWholeList = (id: number) => {
    deleteList.mutate(id);
  };

  if (listsLoading || listMoviesLoading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div>
        {lists?.map((l) => (
          <div key={l.id}>
            {l.name}
            {listMovies
              ?.filter((lm) => lm.listId === l.id)
              .map((lm) => (
                <div key={lm.id}>
                  {lm.listId} {lm.movieId}
                  <button onClick={() => deleteFromList(lm.id)}>
                    Delete this movie
                  </button>
                </div>
              ))}

            <button onClick={() => deleteWholeList(l.id)}>
              Delete Whole List
            </button>
          </div>
        ))}
      </div>

      <input type="text" value={listName} placeholder="My New List" onChange={(e) => setListName(e.target.value)}/>
      <button onClick={addNewList}>Add A List</button>
    </>
  );
};

export default MyLists;
