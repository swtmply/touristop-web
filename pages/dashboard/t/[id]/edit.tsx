/* eslint-disable @typescript-eslint/no-non-null-assertion */
import DashboardLayout from "@/components/dashboard/Layout";
import { XIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import useSpots from "hooks/useSpots";
import { Destination, Schedule } from "lib/types";
import moment from "moment";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

interface ImageWithPreview {
  file: File;
  preview: string;
}

const EditTouristSpot = () => {
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const { getDestinationById, updateDestination, uploadImage } = useSpots();

  const [form, setForm] = useState({
    name: "",
    latitude: 0,
    longitude: 0,
    description: "",
    guideline: "",
    type: "",
    fee: "",
    address: "",
    image: [] as string[],
  });

  useEffect(() => {
    const getDoc = async () => {
      const doc = await getDestinationById(id as string);
      if (doc) {
        setForm({
          name: doc.name,
          latitude: doc.position.latitude,
          longitude: doc.position.longitude,
          description: doc.description,
          guideline: doc.guideline,
          type: doc.type,
          fee: doc.fee,
          address: doc.address,
          image: doc.image ?? [],
        });
        setSchedule(doc.dates);
      }
    };

    getDoc();
  }, [getDestinationById, id]);

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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const formatTime = (time: string) => {
    let dateString;
    if ((time.split(" ")[0] as string).length === 4) {
      dateString = `2019-01-01T0${time.split(" ")[0]!}:00.000Z`;
    } else {
      dateString = `2019-01-01T${time.split(" ")[0]!}:00.000Z`;
    }

    const date = new Date(dateString);
    const dateHours = date.getHours() - 8;

    date.setHours(dateHours);

    return date;
  };

  return (
    <DashboardLayout>
      <form
        className="py-4 w-10/12 flex gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const imagePaths: string[] = [];

          for (const item of images) {
            const path = await uploadImage(item.file, form.name);

            imagePaths.push(path);
          }

          const message = await updateDestination(
            {
              ...form,
              position: { latitude: form.latitude, longitude: form.longitude },
              dates: schedule,
              image: [...form.image, ...imagePaths],
            },
            id as string
          );
          showNotification({
            title: `Added ${message}`,
            message: "Tourist Spot successfully added",
          });
        }}
      >
        <div className="max-w-2xl w-96">
          <h1 className="font-bold text-3xl flex gap-2 items-center relative">
            <span className="absolute -left-10 top-1">
              <button onClick={() => Router.back()} type="button">
                <ArrowLeftIcon className="w-8 h-8 cursor-pointer p-1 hover:bg-gray-200 rounded-full" />
              </button>
            </span>{" "}
            Edit Tourist Spot
          </h1>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 max-w-sm">
              Name:
            </p>
            <TextInput
              required
              value={form?.name}
              name="name"
              onChange={onChange}
            />
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
              value={form?.latitude}
            />
            <NumberInput
              required
              label="Longitude"
              hideControls
              min={-180}
              max={180}
              noClampOnBlur
              value={form?.longitude}
            />
          </div>

          <div className="mt-5 flex flex-col gap-1">
            <p className="font-bold text-gray-400 uppercase text-sm">Images:</p>
            <div className="flex gap-4">
              {form.image.map((image, idx) => (
                <div key={idx} className="relative w-24 h-24 isolate">
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((item) => item))
                    }
                    className="absolute right-2 top-2 z-10"
                  >
                    <XIcon className="w-4 h-4 text-white" />
                  </button>
                  <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    className="rounded-lg"
                  />
                </div>
              ))}
              {images.map((image, idx) => (
                <div key={idx} className="relative w-24 h-24 isolate">
                  <button
                    type="button"
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
              value={form?.description}
              name="description"
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
            />
          </div>
          <div className="mt-5 max-w-sm">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1">
              Guideline:{" "}
            </p>
            <Textarea
              placeholder="Guideline"
              required
              value={form?.guideline}
              name="guideline"
              onChange={(event) =>
                setForm({ ...form, [event.target.name]: event.target.value })
              }
            />
          </div>
        </div>
        <aside className="bg-gray-100 px-4 py-8 w-96">
          <div className="mt-5 max-w-sm">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 ">
              Type:{" "}
            </p>
            <TextInput required value={form?.type} onChange={onChange} />
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 max-w-sm">
              Address:{" "}
            </p>
            <TextInput required value={form?.address} onChange={onChange} />
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex flex-col gap-1 max-w-sm">
              Fee:{" "}
            </p>
            <TextInput required value={form?.fee} onChange={onChange} />
          </div>
          <div className="mt-5">
            <p className="font-bold text-gray-400 uppercase text-sm flex gap-1">
              Schedule:{" "}
            </p>

            {schedule.map((s, idx) => {
              return (
                <div className="flex gap-2" key={idx}>
                  <Select
                    data={WEEK}
                    placeholder="Select day"
                    label="Day"
                    required
                    onChange={(e) => {
                      s.date = e!;
                      onScheduleChange(idx, s);
                    }}
                    value={s.date}
                  />
                  <TimeInput
                    defaultValue={new Date()}
                    label="Opening Time"
                    format="12"
                    required
                    onChange={(e) => {
                      s.timeOpen = moment(e).format("LT");
                      onScheduleChange(idx, s);
                    }}
                    classNames={{
                      wrapper: "w-32",
                      timeInput: "focus-visible:outline-none",
                    }}
                    value={formatTime(s.timeOpen)}
                  />
                  <TimeInput
                    defaultValue={new Date()}
                    label="Closing Time"
                    format="12"
                    required
                    onChange={(e) => {
                      s.timeClose = moment(e).format("LT");
                      onScheduleChange(idx, s);
                    }}
                    classNames={{
                      wrapper: "w-32",
                      timeInput: "focus-visible:outline-none",
                    }}
                    value={formatTime(s.timeClose)}
                  />
                </div>
              );
            })}
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

export default EditTouristSpot;
