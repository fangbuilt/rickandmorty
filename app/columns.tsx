"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Character = {
  id: number;
  name: string;
  status: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  created: string;
};

export const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      return type.length === 0 ? "-" : type;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "origin",
    header: "Origin",
    cell: ({ row }) => {
      const origin: { name: string; url: string } = row.getValue("origin");
      if (origin.name === "unknown") {
        return "unknown";
      }
      return (
        <a href={origin.url} target="_blank" className="text-indigo-500">
          {origin.name}
        </a>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location: { name: string; url: string } = row.getValue("location");
      return (
        <a href={location.url} target="_blank" className="text-indigo-500">
          {location.name}
        </a>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("image");
      const imageAlt: string = row.getValue("name");
      return (
        <Image
          loader={() => imageUrl}
          src={imageUrl}
          alt={imageAlt}
          width={50}
          height={50}
        />
      );
    },
  },
  {
    accessorKey: "episode",
    header: "Episodes",
    cell: ({ row }) => {
      const episodeCount: string[] = row.getValue("episode");
      return episodeCount.length;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const created: string = row.getValue("created");
      const date = new Date(created);
      const format = date.toDateString().split("T")[0];
      return format;
    },
  },
];
