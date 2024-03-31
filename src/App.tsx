import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import HeaderBar from "./sections/HeaderBar";
import Hero from "./sections/Hero";
import SearchUser from "./sections/SearchUser";
import Profile from "./sections/Profile";
import Repositories from "./sections/Repositories";

interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

interface Repo {
  name: string;
  language: string;
}

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repo[] | null>(null);

  const handleProfileChange = (newProfile: UserProfile | null) =>
    setProfile(newProfile);
  const handleReposChange = (newRepos: Repo[] | null) => setRepos(newRepos);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="dark:bg-bg_darkmode min-h-svh">
        <div className="container mx-auto py-4">
          <HeaderBar />
          <div className="flex flex-col items-center justify-center">
            <Hero />
            <SearchUser
              onProfileChange={handleProfileChange}
              onReposChange={handleReposChange}
            />
            <Profile profile={profile} />
            {profile && <Repositories profile={profile} repos={repos} />}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
