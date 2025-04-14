import React from "react";
import { useAuth } from "../context/useAuth";
import Layout from "../components/layout/Layout";
import Avatar from "../components/ui/Avatar";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout>
    <div className="p-6 md:p-10 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="card shadow-lg p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <Avatar username={user?.name} />
            </div>
            <div className="text-center md:text-start">
              <h2 className="text-2xl font-bold capitalize">{user?.name}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;
