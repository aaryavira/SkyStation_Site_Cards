/* ==========================================================
   SkyStation Site Repository
   Firestore Service
========================================================== */

import { db } from "../lib/firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { mapSite } from "./siteMapper";

/* ==========================================================
   COLLECTION
========================================================== */

const COLLECTION = "sites";

/* ==========================================================
   GET ALL SITES
========================================================== */

export async function getSites() {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

 const sites = snapshot.docs.map((document) =>
  mapSite({
    id: document.id,
    ...document.data(),
  })
);

return sites;
}

/* ==========================================================
   GET SINGLE SITE
========================================================== */

export async function getSiteById(siteId) {
  const snapshot = await getDoc(
    doc(db, COLLECTION, siteId)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return mapSite({
    id: snapshot.id,
    ...snapshot.data(),
  });
}

/* ==========================================================
   UPDATE SITE
========================================================== */

export async function updateSite(siteId, updates) {
  await updateDoc(
    doc(db, COLLECTION, siteId),
    updates
  );
}