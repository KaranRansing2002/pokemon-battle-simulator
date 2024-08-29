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
      <div className="grid place-items-center grid-rows-1">
        <div className="grid row-span-1 p-20">
          <Loader />
          <h2 className="text-xl text-white">Loading...</h2>
        </div>
      </div>
    );
  }


  return (
    <div className="grid place-items-center p-4 text-white">
      <h2 className="font-bold text-xl text-white underline">Leaderboard</h2>

      <table className="border p-4 rounded " border="1">
        <thead className="">
          <tr>
            <th className="border p-2">Rank</th>
            <th className="border">Name</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, ind) => (
              <tr className="border ">
                <td className="border px-8 text-red-500 p-4">{ind + 1}</td>
                <td className="border px-8">{row.username}</td>
                <td className="px-4 text-green-400">{row.elo}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
