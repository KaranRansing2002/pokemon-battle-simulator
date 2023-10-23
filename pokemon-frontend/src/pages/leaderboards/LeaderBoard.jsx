import React from "react";
import useSWR from "swr";
import api from "../../helper/api";
import axios from "axios";
import Loader from "../../components/Loaders/Loader";

const fetcher = async (...args) => {
  const resp = await axios.get(...args);
  return resp.data;
}

const LeaderBoard = () => {
  const { data, isLoading, error } = useSWR(`${api}/user/all`, fetcher);

  if (error) {
    return (
      <div className="grid place-items-center grid-rows-1 h-full ">
        <div className="grid row-span-1 p-20">
          <Loader />
          <h2 className="text-xl text-white">{error.message}</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid place-items-center bg-[#1E2021] grid-rows-1">
        <div className="grid row-span-1 p-20">
          <Loader />
          <h2 className="text-xl text-white">Loading...</h2>
        </div>
      </div>
    );
  }


  return (
    <div className="grid place-items-center mt-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rank
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Elo
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((obj, idx) => (
                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                  </th>
                  <td className="px-6 py-4">{obj.username}</td>
                  <td className="px-6 py-4">500</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
