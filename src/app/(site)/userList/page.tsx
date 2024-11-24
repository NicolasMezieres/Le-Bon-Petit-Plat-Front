"use client";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/table/Table";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import { allUser, deleteUser, searchUser, updateUserByAdmin } from "@/Service/user";
import { userListType } from "@/utils/type";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { push } = useRouter();
  const { setIsLoading, isLoading } = useContext(ContextLoading);
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [listUser, setListUser] = useState<userListType[]>([]);
  const [isNextPage, setIsNextPage] = useState<boolean>();
  useEffect(() => {
    const delay = setTimeout(() => {
      findUsers();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, page, isLoading]);
  function findUsers() {
    if (!search) {
      allUser(page).then((res) => {
        if (res.status === 200) {
          setListUser(res?.data.data);
          setIsNextPage(res?.data.isNextPage);
          setIsLoading(false);
        } else if (res.status === 401) {
          window.localStorage.removeItem("token");
          push("/signin");
        }
      });
    } else {
      searchUser(search, page).then((res) => {
        if (res.status === 200) {
          setListUser(res?.data.data);
          setIsNextPage(res?.data.isNextPage);
          setIsLoading(false);
        } else if (res.status === 401) {
          window.localStorage.removeItem("token");
          push("/signin");
        }
      });
    }
  }
  function updateUser(user: userListType, id: string) {
    updateUserByAdmin(user, id).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsLoading(true);
      } else if (res.status === 401) {
        window.localStorage.removeItem("token");
        push("/signin");
      }
    });
  }
  function removeUser(id: string) {
    deleteUser(id).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsLoading(true);
      } else if (res.status === 401) {
        window.localStorage.removeItem("token");
        push("/signin");
      }
    });
  }
  return (
    <main className="grow pt-5 pb-4 flex flex-col gap-5 font-['Lato']">
      <ThirdTitle text="Liste des utilisateurs" additionalCSS="text-2xl" />
      <SearchBar setSearch={setSearch} setPage={setPage} search={search} />
      {!isLoading && (
        <div>
          <div className="overflow-x-auto w-screen md:flex md:justify-center px-5">
            <Table
              colData={["Nom", "Prénom", "Nom d'utilisateur", "Email", "Actif"]}
              caseCSS="border-[1px] border-[#212121] px-2"
            >
              {listUser &&
                listUser.map((user) => {
                  return (
                    <tr key={user.id}>
                      <th className="border-[1px] border-[#212121] px-2">{user.firstName}</th>
                      <th className="border-[1px] border-[#212121] px-2">{user.lastName}</th>
                      <th className="border-[1px] border-[#212121] px-2">{user.username}</th>
                      <th className="border-[1px] border-[#212121] px-2">{user.email}</th>
                      <th className="border-[1px] border-[#212121] px-2">
                        <select
                          defaultValue={user.isActive ? "true" : "false"}
                          onChange={(e) => {
                            user.isActive =
                              e.target.value === "true"
                                ? true
                                : e.target.value === "false"
                                ? false
                                : user.isActive;
                          }}
                        >
                          <option value={"true"}>Oui</option>
                          <option value={"false"}>Non</option>
                        </select>
                      </th>
                      <th className="bgBlue text-white border-[1px] border-[#212121] px-2">
                        <p
                          onClick={() => {
                            updateUser(user, user.id);
                          }}
                          className="cursor-pointer"
                        >
                          Editer
                        </p>
                      </th>
                      <th className="bg-[#DC3838] border-[1px] border-[#212121] px-2">
                        <p onClick={() => removeUser(user.id)} className="cursor-pointer">
                          Supprimer
                        </p>
                      </th>
                    </tr>
                  );
                })}
            </Table>
          </div>
          <Pagination isNextPage={isNextPage} page={page} setPage={setPage} />
        </div>
      )}
    </main>
  );
};

export default page;
