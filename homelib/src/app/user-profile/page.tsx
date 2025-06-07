import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Metadata } from "next";
import Image from "next/image";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified?: string;
    image?: string;
    role?: string;
  } | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        User profile
      </h1>
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <div className="flex items-center space-x-6">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt={`${user?.name}'s avatar`}
            className="w-24 h-24 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h1 className="text-gray-800">{user?.id}</h1>
            <p className="text-gray-600">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {user?.role && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Role</h2>
            <p className="text-gray-600 mt-2">{user?.role}</p>
          </div>
        )}

        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "User Profile",
    description: "View and manage your profile.",
  };
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    const user = session.user
    if (user) {
      return <UserProfile user={user} />;
    }
  }
}
