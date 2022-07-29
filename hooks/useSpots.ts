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
  limitToLast,
  addDoc,
  updateDoc,
  deleteDoc,
  GeoPoint,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "lib/firebase";
import { Destination } from "lib/types";
import { useCallback, useState } from "react";

export default function useSpots() {
  const [destinations, setDestinaitons] = useState<Destination[]>([]);
  const [paginatedDestinations, setPaginatedDestinaitons] = useState<
    Destination[]
  >([]);
  const [pages, setPages] = useState(0);
  const db = collection(firestore, "spots");

  const getAllSpots = useCallback(async () => {
    const data = await getDocs(db);

    const destinations = data.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Destination)
    );
    setDestinaitons(destinations);
  }, [db]);

  const getPaginatedDestinations = useCallback(async () => {
    const first = query(db, orderBy("name", "asc"), limit(10));
    const docs = await getDocs(db);
    const docSnap = await getDocs(first);
    const destinations = docSnap.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Destination)
    );

    setPages(Math.ceil(docs.docs.length / 10));
    setPaginatedDestinaitons(destinations);
  }, [db]);

  const nextPage = useCallback(
    async (name: string) => {
      const first = query(
        db,
        orderBy("name", "asc"),
        startAfter(name),
        limit(10)
      );
      const docSnap = await getDocs(first);
      const destinations = docSnap.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Destination)
      );

      setDestinaitons(destinations);
      setPaginatedDestinaitons(destinations);
    },
    [db]
  );

  const prevPage = useCallback(
    async (name: string) => {
      const first = query(
        db,
        orderBy("name", "asc"),
        endBefore(name),
        limitToLast(10)
      );
      const docSnap = await getDocs(first);
      const destinations = docSnap.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Destination)
      );

      setPaginatedDestinaitons(destinations);
    },
    [db]
  );

  const getDestinationById: (id: string) => Promise<Destination | null> =
    useCallback(async (id: string) => {
      if (id) {
        const docRef = doc(firestore, "spots", id);
        const docSnap = await getDoc(docRef);

        return docSnap.exists()
          ? ({ ...docSnap.data(), id: docSnap.id } as Destination)
          : null;
      }
      return null;
    }, []);

  const addDestination = useCallback(
    async (data: Destination) => {
      data.position = new GeoPoint(
        data.position.latitude,
        data.position.longitude
      );
      data.numberOfHours = 2;
      const docRef = await addDoc(db, data);

      return docRef.id;
    },
    [db]
  );

  const updateDestination = useCallback(
    async (data: Destination, id: string) => {
      const docRef = doc(firestore, "spots", id);
      data.position = new GeoPoint(
        data.position.latitude,
        data.position.longitude
      );

      await updateDoc(docRef, data);

      return `updated ${docRef.id}`;
    },
    []
  );

  const deleteDestination = useCallback(async (id: string) => {
    const docRef = doc(firestore, "spots", id);

    await deleteDoc(docRef);

    return `deleted ${docRef.id}`;
  }, []);

  const uploadImage = useCallback(async (image: File, name?: string) => {
    const path =
      name === null ? `images/${name}/${image.name}` : `images/${image.name}`;
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, image);
    const imagePath = await getDownloadURL(imageRef);

    return imagePath;
  }, []);

  return {
    destinations,
    paginatedDestinations,
    pages,
    getDestinationById,
    nextPage,
    prevPage,
    getAllSpots,
    getPaginatedDestinations,
    addDestination,
    updateDestination,
    uploadImage,
    deleteDestination,
  };
}
