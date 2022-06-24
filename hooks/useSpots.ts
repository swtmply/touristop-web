/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { firestore } from "lib/firebase";
import { Destination } from "lib/types";
import { useCallback, useEffect, useState } from "react";

export default function useSpots() {
  const [destinations, setDestinaitons] = useState<Destination[]>([]);
  const [firstDoc, setFirstDoc] = useState<Destination | null>(null);
  const [paginatedDestinations, setPaginatedDestinaitons] = useState<
    Destination[]
  >([]);
  const db = collection(firestore, "spots");

  const getSpots = useCallback(async () => {
    const data = await getDocs(db);

    const destinations = data.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Destination)
    );
    setDestinaitons(destinations);
  }, [db]);

  const getPaginatedDestinations = useCallback(async () => {
    const first = query(db, orderBy("name", "asc"), limit(10));
    const docSnap = await getDocs(first);
    const destinations = docSnap.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Destination)
    );

    setPaginatedDestinaitons(destinations);
    setFirstDoc(destinations[0]!);
  }, [db]);

  const nextPage = useCallback(async () => {
    const first = query(
      db,
      orderBy("name", "asc"),
      startAfter(paginatedDestinations[paginatedDestinations.length - 1]?.name),
      limit(10)
    );
    const docSnap = await getDocs(first);
    const destinations = docSnap.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Destination)
    );

    setPaginatedDestinaitons(destinations);
  }, [db, paginatedDestinations]);

  const prevPage = useCallback(async () => {
    console.log(firstDoc?.name);

    if (firstDoc?.name === paginatedDestinations[0]?.name) {
      return;
    }

    const first = query(
      db,
      orderBy("name", "asc"),
      endBefore(paginatedDestinations[0]?.name),
      limit(10)
    );
    const docSnap = await getDocs(first);
    const destinations = docSnap.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Destination)
    );

    setPaginatedDestinaitons(destinations);
  }, [db, firstDoc?.name, paginatedDestinations]);

  const getDestinationById: (
    id: string
  ) => Promise<Destination | null> = async (id: string) => {
    const docRef = doc(db, "spots", id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists()
      ? ({ ...docSnap.data(), id: docSnap.id } as Destination)
      : null;
  };

  useEffect(() => {
    if (destinations.length === 0 && paginatedDestinations.length === 0) {
      getSpots();
      getPaginatedDestinations();
    }
  }, [
    destinations.length,
    paginatedDestinations.length,
    getPaginatedDestinations,
    getSpots,
  ]);

  return {
    destinations,
    paginatedDestinations,
    disabledPrev: firstDoc?.name === paginatedDestinations[0]?.name,
    getDestinationById,
    nextPage,
    prevPage,
  };
}
