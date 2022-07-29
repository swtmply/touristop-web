/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import useSpots from "hooks/useSpots";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardTable = () => {
  const {
    paginatedDestinations,
    getPaginatedDestinations,
    nextPage,
    prevPage,
    pages,
    deleteDestination,
  } = useSpots();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (paginatedDestinations.length === 0) {
      getPaginatedDestinations();
    }
  }, [getPaginatedDestinations, paginatedDestinations]);

  return (
    <React.Fragment>
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
              <Link
                href={`/dashboard/t/${destination.id}`}
                key={destination.id}
              >
                <tr className="border-b odd:bg-white even:bg-gray-50 hover:odd:bg-gray-50 hover:even:bg-gray-100 cursor-pointer">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {destination.name}
                  </th>
                  <td className="px-6 py-4">
                    {destination.image?.length ?? 0}
                  </td>
                  <td className="px-6 py-4">{destination.fee}</td>
                  <td className="px-6 py-4">{destination.type}</td>
                  <td className="px-6 py-4 text-right flex gap-2 items-center justify-end">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDestination(destination.id!);
                        location.reload();
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      <TrashIcon className="w-7 h-7 hover:bg-red-50 rounded-full p-1" />
                    </button>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-5 gap-2">
        <button
          className="disabled:text-gray-400 disabled:bg-gray-200 p-1 bg-coldBlue-200 hover:bg-coldBlue-300 text-white rounded-lg"
          disabled={page === 1}
          onClick={() => {
            setPage((prev) => prev - 1);
            prevPage(paginatedDestinations[0]?.name ?? "");
          }}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          disabled={page === pages}
          className="disabled:text-gray-400 disabled:bg-gray-200 p-1 bg-coldBlue-200 hover:bg-coldBlue-300 text-white rounded-lg"
          onClick={() => {
            setPage((prev) => prev + 1);

            nextPage(
              paginatedDestinations[paginatedDestinations.length - 1]?.name ??
                ""
            );
          }}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default DashboardTable;
