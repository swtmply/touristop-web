/* eslint-disable @typescript-eslint/no-non-null-assertion */
import DashboardLayout from "@/components/dashboard/Layout";
import { XIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import useSpots from "hooks/useSpots";
import { Destination, Schedule } from "lib/types";
import moment from "moment";
import Image from "next/image";
import Router from "next/router";
import { ChangeEvent, useState } from "react";

interface ImageWithPreview {
  file: File;
  preview: string;
}

const AddTouristSpot = () => {
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [schedules, setSchedules] = useState<number[]>([]);

  const { addDestination, uploadImage } = useSpots();
  const form = useForm({
    initialValues: {
      name: "",
      latitude: 0,
      longitude: 0,
      description: "",
      guideline: "",
      type: "",
      fee: "",
      address: "",
    },
  });

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files!;
    const files: ImageWithPreview[] = [];

    if (files.length === 1) {
      files.push({
        file: fileList[0]!,
        preview: URL.createObjectURL(fileList[0] as Blob),
      });
    } else {
      for (let i = 0; i < fileList.length; i++) {
        const element = fileList[i];
        files.push({
          file: element!,
          preview: URL.createObjectURL(element as Blob),
        });
      }
    }

    setImages((prev) => [...prev, ...files]);
  };

  const onScheduleChange = (i: number, s: Schedule) => {
    const exists = schedule[i];

    if (!exists) {
      setSchedule((prev) => [...prev, s]);
    } else {
      setSchedule((prev) => prev.map((p, idx) => (idx === i ? s : p)));
    }
  };

  return (
    <DashboardLayout>
      <form
        className="py-4 w-10/12 flex gap-4"
        onSubmit={form.onSubmit(async (values) => {
          const imagePaths: string[] = [];

          for (const item of images) {
            const path = await uploadImage(item.file, values.name);

            imagePaths.push(path);
          }

          const destination: Destination = {
            name: values.name,
            address: values.address,
            dates: schedule,
            description: values.description,
            fee: values.fee,
            guideline: values.guideline,
            position: {
              latitude: values.latitude,
              longitude: values.longitude,
            },
            type: values.type,
            image: imagePaths,
          };

          const message = await addDestination(destination);

          showNotification({
            title: `Added ${message}`,
            message: "Tourist Spot successfully added",
          });
        })}
      >
        <div className="max-w-2xl w-96">
          <h1 className="font-bold text-3xl flex gap-2 items-center relative">
            <span className="absolute -left-10 top-1">
              <button onClick={() => Router.back()} type="button">
                <ArrowLeftIcon className="w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded-full" />
              </button>
            </span>{" "}
            Add Tourist Spot
          </h1>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 max-w-sm">
              Name:
            </p>
            <TextInput required {...form.getInputProps("name")} />
          </div>
          <div className="flex flex-col max-w-sm">
            <p className="font-bold text-gray-400 uppercase text-sm mt-5">
              Position:{" "}
            </p>
            <NumberInput
              required
              label="Latitude"
              hideControls
              min={-90}
              max={90}
              noClampOnBlur
              {...form.getInputProps("latitude")}
            />
            <NumberInput
              required
              label="Longitude"
              hideControls
              min={-180}
              max={180}
              noClampOnBlur
              {...form.getInputProps("longitude")}
            />
          </div>

          <div className="mt-5 flex flex-col gap-1">
            <p className="font-bold text-gray-400 uppercase text-sm">Images:</p>
            <div className="flex gap-4">
              {images.map((image, idx) => (
                <div key={idx} className="relative w-24 h-24 isolate">
                  <button
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((item) => item.preview !== image.preview)
                      )
                    }
                    className="absolute right-2 top-2 z-10"
                  >
                    <XIcon className="w-4 h-4 text-white" />
                  </button>
                  <Image
                    src={image.preview}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    className="rounded-lg"
                  />
                </div>
              ))}
              <label
                htmlFor="image-upload"
                className="w-24 h-24 flex justify-center items-center border border-dashed border-gray-400 rounded-lg"
              >
                <PlusIcon className="w-10 h-10 text-gray-400" />
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={onImageUpload}
                  accept="image/*"
                  multiple
                />
              </label>
            </div>
          </div>
          <div className="mt-5 max-w-sm">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1">
              Description:{" "}
            </p>
            <Textarea
              placeholder="Description"
              required
              {...form.getInputProps("description")}
            />
          </div>
          <div className="mt-5 max-w-sm">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1">
              Guideline:{" "}
            </p>
            <Textarea
              placeholder="Guideline"
              required
              {...form.getInputProps("guideline")}
            />
          </div>
        </div>
        <aside className="bg-gray-100 px-4 py-8 w-96">
          <div className="mt-5 max-w-sm">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 ">
              Type:{" "}
            </p>
            <TextInput required {...form.getInputProps("type")} />
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 max-w-sm">
              Address:{" "}
            </p>
            <TextInput required {...form.getInputProps("address")} />
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 max-w-sm">
              Fee:{" "}
            </p>
            <TextInput required {...form.getInputProps("fee")} />
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex gap-1">
              Schedule:{" "}
              <button
                type="button"
                onClick={() => setSchedules((prev) => [...prev, prev.length])}
              >
                <PlusIcon className="w-6 h-6 p-1 rounded-full text-black hover:bg-gray-100" />
              </button>
            </p>
            <ScheduleInput onScheduleChange={onScheduleChange} index={0} />

            {schedules.map((_, idx) => (
              <ScheduleInput
                key={idx + 1}
                index={idx + 1}
                onScheduleChange={onScheduleChange}
              />
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-coldBlue-300 text-white rounded mt-5"
          >
            Submit
          </button>
        </aside>
      </form>
    </DashboardLayout>
  );
};

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ScheduleInput = ({
  onScheduleChange,
  index,
}: {
  onScheduleChange: (i: number, schedule: Schedule) => void;
  index: number;
}) => {
  const [schedule, setSchedule] = useState({
    date: "",
    timeClose: "",
    timeOpen: "",
  });

  return (
    <div className="flex gap-2">
      <Select
        data={WEEK}
        placeholder="Select day"
        label="Day"
        required
        onChange={(e) => {
          setSchedule({
            ...schedule,
            date: e!,
          });
          onScheduleChange(index, schedule);
        }}
      />
      <TimeInput
        defaultValue={new Date()}
        label="Opening Time"
        format="12"
        required
        onChange={(e) => {
          setSchedule({
            ...schedule,
            timeOpen: moment(e).format("LT"),
          });
          onScheduleChange(index, schedule);
        }}
        classNames={{
          wrapper: "w-32",
          timeInput: "focus-visible:outline-none",
        }}
      />
      <TimeInput
        defaultValue={new Date()}
        label="Closing Time"
        format="12"
        required
        onChange={(e) => {
          setSchedule({
            ...schedule,
            timeClose: moment(e).format("LT"),
          });
          onScheduleChange(index, schedule);
        }}
        classNames={{
          wrapper: "w-32",
          timeInput: "focus-visible:outline-none",
        }}
      />
    </div>
  );
};

export default AddTouristSpot;
