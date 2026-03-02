import { addDoc, collection, getDocs, limit, query, serverTimestamp } from "firebase/firestore";
import db from "./firestoreService";

export async function testFirestoreConnection() {
  const ref = collection(db, "connectionTests");
  const writeResult = await addDoc(ref, {
    source: "mobile-app",
    status: "connected",
    createdAt: serverTimestamp(),
  });

  const checkQuery = query(ref, limit(1));
  const snapshot = await getDocs(checkQuery);

  return {
    ok: true,
    writeId: writeResult.id,
    docsFound: snapshot.size,
  };
}
