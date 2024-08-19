import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

async function getData(uid: string) {
  const messagesRef = doc(db, "birthdayMessages", uid);
  const messagesSnap = await getDoc(messagesRef);

  if (messagesSnap.exists()) {
    return messagesSnap.data();
  } else {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json(
      { error: 'Missing "uid" query parameter' },
      { status: 400 }
    );
  }

  try {
    const data = await getData(uid);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
