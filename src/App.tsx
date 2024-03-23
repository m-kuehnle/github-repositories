import "./App.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

function App() {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const searchProfile = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/search/users?q=" + userName
      );
      const data = await res?.json();
      console.log(data);
      setProfile(data?.items[0]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="default-container">
        <h1 className="mb-3">Get Repositories from any Github User</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button type="submit" onClick={searchProfile}>
            Find User
          </Button>
        </div>

        {/* User Profile */}
        {profile && (
          <div className="profile-container">
            <Avatar>
              <AvatarImage src={profile.avatar_url} />
            </Avatar>
            <a
              className="p-4"
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {profile.login}
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
