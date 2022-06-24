import { TrashIcon } from "@heroicons/react/outline";
import useSpots from "hooks/useSpots";
import React from "react";

const DashboardTable = () => {
  const { paginatedDestinations, prevPage, nextPage, disabledPrev } =
    useSpots();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-coldBlue-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Images count
            </th>
            <th scope="col" className="px-6 py-3">
              Fee
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedDestinations.map((destination) => (
            <tr
              key={destination.id}
              className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {destination.name}
              </th>
              <td className="px-6 py-4">{destination.image.length}</td>
              <td className="px-6 py-4">{destination.fee}</td>
              <td className="px-6 py-4">{destination.type}</td>
              <td className="px-6 py-4 text-right flex gap-2 items-center justify-end">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  <TrashIcon className="w-7 h-7 hover:bg-red-50 rounded-full p-1" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="disabled:text-gray-300"
        disabled={disabledPrev}
        onClick={() => prevPage()}
      >
        prev
      </button>
      <button onClick={() => nextPage()}>next</button>
    </div>
  );
};

export default DashboardTable;
