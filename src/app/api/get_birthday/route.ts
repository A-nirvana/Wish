import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

async function getUserData(uid: string) {
  const birthdayRef = doc(db, "birthdays", uid);
  const birthdaySnap = await getDoc(birthdayRef);

  if (birthdaySnap.exists()) {
    return birthdaySnap.data();
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
    const data = await getUserData(uid);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
