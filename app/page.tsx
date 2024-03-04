"use client";

import { useEffect, useState } from "react";
import { Character, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.results;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Character[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const fetched = await getData();
        setData(fetched);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-6">Rick and Morty Characters</h1>
      {loading ? (
        <p>loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </main>
  );
}
