import { collection, getDocs, limit, query } from "firebase/firestore";
import db from "./firestoreService";

export async function testFirestoreConnection() {
  // Use a public read path defined in firestore.rules to validate connectivity.
  const ref = collection(db, "exercises");
  const checkQuery = query(ref, limit(1));
  const snapshot = await getDocs(checkQuery);

  return {
    ok: true,
    source: "exercises",
    docsFound: snapshot.size,
  };
}
