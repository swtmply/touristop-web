import Image from "next/image";
import React from "react";
import Button from "./Button";

export interface ProjectCardProps {
  type?: string;
  image: string;
  title: string;
  description?: string;
  buttonTitle?: string;
  projectLink?: string;
  projectNumber?: number;
}

const ProjectCard = ({
  title,
  description,
  buttonTitle,
  projectLink,
  projectNumber,
  image,
}: ProjectCardProps) => {
  return (
    <div className="flex gap-3 odd:flex-row-reverse">
      <div className="w-1/2 aspect-[16/6] border border-black p-4 flex justify-between">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-bold text-3xl mb-1">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>
          <Button onClick={() => window.open(projectLink, "_blank")}>
            {buttonTitle}
          </Button>
        </div>
        <div className="w-52 aspect-square relative rounded">
          <Image src={image} layout="fill" objectFit="fill" alt="" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 mt-4">
        <p className="font-mono font-semibold rotate-[90deg] w-3 text-lg">
          {`00${projectNumber}`}
        </p>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-px h-16 bg-black" />
          <div className="h-2 aspect-square bg-black" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
