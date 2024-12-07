import { useState } from "react";
import { listDTO } from "../Data/DTOs/listDTO";
import {
  useAddList,
  useAllLists,
  useDeleteList,
  useEditList,
} from "../Functions/Queries/ListHooks";

import MovieList from "../Components/MovieList";
import { List } from "../Data/Interfaces/List";
import MovieListSkeleton from "../Components/LoadingSkeletons/MovieListSkeleton";
import { useGTextInput } from "../Components/Generics/gTextInput";
import GTextInput from "../Components/Generics/gTextInputController";

const MyLists = () => {
  const {
    data: lists,
    isLoading: listsLoading,
    isError,
    error,
  } = useAllLists();
  const addList = useAddList();
  const updateList = useEditList();
  const deleteList = useDeleteList();
  const {value:updatedListName, setValue:setUpdatedListName} = useGTextInput()
  const { value: listName, setValue: setListName } = useGTextInput();
  const [editingList, setEditingList] = useState<number>(0);

  const addNewList = () => {
    const newList: listDTO = {
      name: listName,
      userid: 18,
    };
    addList.mutate(newList);
    setListName("");
  };

  const deleteWholeList = (id: number) => {
    deleteList.mutate(id);
  };

  const updateListName = (id: number) => {
    if (updatedListName) {
      const updatedList: List = {
        id: id,
        name: updatedListName,
        userid: 18,
      };
      updateList.mutate(updatedList);
      setUpdatedListName("");
      setEditingList(0);
    }
  };

  if (listsLoading) {
    <MovieListSkeleton />;
  }
  if (isError) {
    throw error;
  }

  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Create a New List</h2>
          <GTextInput
            placeHolder="Enter list name..."
            className="w-full p-4 text-lg rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-300 placeholder-gray-500 transition duration-300"
            control={{ value: listName, setValue: setListName }}
          />
          <button
            className="w-full mt-4 p-4 bg-green-800 text-white rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition duration-300"
            onClick={addNewList}
          >
            Add A List
          </button>
        </div>
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2 justify-center">
          <h2 className="text-5xl font-semibold mb-4 mt-12 text-center">
            My Lists
          </h2>
        </section>
        <div>
          {lists?.map((l) => (
            <div key={l.id} className="w-full ">
              <div
                key={l.id}
                className="bg-slate-500 rounded-lg shadow-lg shadow-gray-700"
              >
                <div className="text-3xl pt-7 pb-3 bg-black text-white flex pl-5 capitalize font-semibold rounded-t-lg mt-5 shadow-[0_4px_10px_2px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-4">
                    {editingList == l.id ? (
                      <div className="flex items-center">
                        {" "}
                        <GTextInput
                          placeHolder={l.name}
                          className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-200 text-gray-800"
                          control={{value:updatedListName,setValue:setUpdatedListName}}
                        />
                        <i
                          className={`bi bi-x hover:cursor-pointer hover:scale-110 text-red-700 relative top-[-30px] right-[5px]`}
                          onClick={() => setEditingList(0)}
                        ></i>
                        <i
                          className={`bi bi-floppy hover:cursor-pointer hover:scale-110 text-emerald-700 mr-3`}
                          onClick={() => updateListName(l.id)}
                        ></i>
                        <i
                          className={`bi bi-trash mr-2 hover:cursor-pointer hover:scale-110 text-red-700`}
                          onClick={() => deleteWholeList(l.id)}
                        ></i>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {l.name}{" "}
                        <div className="hover:cursor-pointer hover:scale-110 text-yellow-200 relative transform scale-75 top-[-20px] right-[0px]">
                          <i
                            className={"bi bi-pencil-square "}
                            onClick={() => setEditingList(l.id)}
                          ></i>
                        </div>
                        <i
                          className={`bi bi-trash mr-2 hover:cursor-pointer hover:scale-110 text-red-700 relative top-[-20px] right-[5px] scale-75`}
                          onClick={() => deleteWholeList(l.id)}
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
                <MovieList key={l.id} list={l} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MyLists;
