import { PropsWithChildren } from "react";

export type PropsWithChildrenOnly = PropsWithChildren<unknown>;
export type ReactFCWithChildren = React.FC<PropsWithChildrenOnly>;

export type Destination = {
  id?: string;
  name: string;
  description: string;
  image?: string[];
  type: string;
  address: string;
  guideline: string;
  fee: string;
  position: {
    latitude: number;
    longitude: number;
  };
  dates: Schedule[];
};

export type Schedule = {
  date: string;
  timeOpen: string;
  timeClose: string;
};
