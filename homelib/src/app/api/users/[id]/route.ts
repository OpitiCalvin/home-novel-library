import { getUserWithId } from "@/dal/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not Authorized!" }, { status: 401 });
  }
  const { id: userId } = await params;
  const user = getUserWithId(userId);

  if (!user) {
    return NextResponse.json({ message: "Author not found!" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "user info successfully retrieved", user: user },
    { status: 200 }
  );
};
