import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  profile: UserProfile | null;
}

interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  if (!profile) {
    return null;
  }

  return (
    <div className="flex items-center mt-14">
      <Avatar>
        <AvatarImage src={profile.avatar_url}/>
      </Avatar>
      <a
        className="ml-4 text-2xl dark:text-white"
        href={profile.html_url}
        target="_blank"
        rel="noreferrer"
      >
        {profile.login}
      </a>
    </div>
  );
};

export default Profile;
