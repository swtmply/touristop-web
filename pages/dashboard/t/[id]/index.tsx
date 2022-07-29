import React from "react";

import { GetStaticProps, GetStaticPaths } from "next";
import { firestore } from "lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Destination } from "lib/types";
import DashboardLayout from "@/components/dashboard/Layout";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Router from "next/router";

const TouristSpotInformation = ({
  destination,
}: {
  destination: Destination;
}) => {
  return (
    <DashboardLayout>
      <div className="py-4 w-10/12 flex gap-4">
        <div className="max-w-2xl">
          <h1 className="font-bold text-3xl flex gap-2 items-center relative">
            <span className="absolute -left-10 top-1">
              <button onClick={() => Router.back()}>
                <ArrowLeftIcon className="w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded-full" />
              </button>
            </span>{" "}
            {destination.name}{" "}
            <button
              onClick={() => Router.push(`/dashboard/t/${destination.id}/edit`)}
            >
              <PencilIcon className="w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded-full" />
            </button>
          </h1>
          <p className="font-bold text-gray-400 uppercase text-sm ">
            Position:{" "}
            <span className="text-coldBlue-300 font-semibold">
              {destination.position.latitude.toFixed(3)},{" "}
              {destination.position.longitude.toFixed(3)}
            </span>
          </p>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-gray-400 uppercase text-sm">Images:</p>
            <div className="mt-5 flex gap-4">
              {destination.image?.map((link) => (
                <Image
                  src={link}
                  width={100}
                  height={100}
                  alt=""
                  key={link}
                  className="rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm">
              Description:
            </p>
            <p>{destination.description}</p>
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm">
              Guideline:
            </p>
            <p>{destination.guideline}</p>
          </div>
        </div>
        <aside className="bg-gray-100 p-4">
          <p className="font-bold text-gray-400 uppercase text-sm">
            Type:{" "}
            <span className="text-slime-400 font-semibold normal-case">
              {destination.type}
            </span>
          </p>
          <p className="font-bold text-gray-400 uppercase text-sm mt-5">
            Address:{" "}
            <span className="italic normal-case font-normal text-black">
              {destination.address}
            </span>
          </p>
          <p className="font-bold text-gray-400 uppercase text-sm mt-5">
            Fee:{" "}
            <span className="text-slime-400 font-semibold">
              {destination.fee}
            </span>
          </p>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm ">
              Schedule:
            </p>
            {destination.dates.map((schedule) => (
              <div key={schedule.date}>
                <p className="mt-2 flex justify-between w-10/12">
                  {schedule.date}
                  {": "}
                  <span className="text-slime-400 font-semibold">
                    {schedule.timeOpen}-{schedule.timeClose}
                  </span>{" "}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = collection(firestore, "spots");
  const data = await getDocs(db);

  const destinations = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return {
    paths: destinations.map((destination) => ({
      params: { id: destination.id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = collection(firestore, "spots");
  const docRef = doc(db, ctx.params?.id as string);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      destination: JSON.parse(
        JSON.stringify({ ...docSnap.data(), id: docSnap.id })
      ),
    },
  };
};

export default TouristSpotInformation;
