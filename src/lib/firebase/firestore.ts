import { db, storage } from "./firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { upload } from "./storage";

import { v4 as uuidv4 } from "uuid";

export const setBirthDay = async (
  name: string,
  date: string,
  photo: File | null
) => {
  let photoURL: string | unknown =
    "https://firebasestorage.googleapis.com/v0/b/wish-dd104.appspot.com/o/HAPPY_BD_KID.jpeg?alt=media&token=c290fd65-266b-4d17-b8a9-7edd70b1d780";
  if (photo) photoURL = await upload(photo, "photo");
  const uid = uuidv4();
  await setDoc(doc(db, "birthdays", uid), {
    name,
    date,
    photoURL,
    uid,
  });
  await setDoc(doc(db, "birthdayMessages", uid), {
    messages: [],
  });
  return uid;
};
export const addMessage = async (
  uid: string,
  name: string,
  message: string,
  photo: File | null
) => {
  const msgRef = collection(db, "birthdayMessages");
  console.log(photo)
  try {
    const photoURL = photo ? await upload(photo, "photo/") : "";
    await updateDoc(doc(msgRef, uid), {
      messages: arrayUnion({
        name,
        message,
        photoURL,
      }),
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
