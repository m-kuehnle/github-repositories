import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ThemeProvider } from "@/components/theme-provider";

import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import "./App.css";
import { count } from "console";
import { ModeToggle } from "./components/mode-toggle";

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
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [originalRepos, setOriginalRepos] = useState<Repo[] | null>(null);
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter_name, setFilterName] = useState("");
  const [filter_language, setFilterLanguage] = useState("");

  const fetchData = async () => {
    setError(null);

    try {
      const res = await fetch(
        "https://api.github.com/search/users?q=" + userName
      );
      const data = await res.json();

      if (data.items.length === 0) {
        setError("User not found. Please try again.");
        return;
      }

      const userProfile = data.items[0];
      setProfile(userProfile);

      const repoRes = await fetch(userProfile.repos_url);
      const repoData = await repoRes.json();
      setOriginalRepos(repoData);
      setRepos(repoData);
    } catch (error) {
      setError("User not found. Please try again");
    }
  };

  const filterRepos = (name?: string, language?: string) => {
    let filteredRepos = originalRepos || [];

    if (name && name.trim() !== "") {
      filteredRepos = filteredRepos.filter((repo) =>
        repo.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (language && language.trim() !== "") {
      filteredRepos = filteredRepos.filter((repo) =>
        repo.language
          ? repo.language.toLowerCase().includes(language.toLowerCase())
          : false
      );
    }

    setRepos(filteredRepos);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="dark:bg-bg_darkmode min-h-svh">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <p className="text-xl tracking-wider dark:text-white">
              RepoFinder.
            </p>
            <ModeToggle />
          </div>

          <div className="default-container">
            <h1 className="my-14 md:text-5xl text-3xl dark:text-white ">
              Search GitHub User.<br></br> Get{" "}
              <span className="bg-gradient-to-r from-[#ede342] to-[#ff51eb] text-transparent bg-clip-text">
                Repositories
              </span>
              .
            </h1>
            <div className="flex w-full max-w-sm items-center space-x-2 my-8">
              <Input
                type="text"
                placeholder="Username"
                className="dark:text-white"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button type="submit" onClick={fetchData}>
                Find User
              </Button>
            </div>
            {/* Display error message if there is an error */}
            {error && <p className=" text-slate-500">{error}</p>}

            {/* User Profile */}
            {profile && (
              <div className="flex items-center mt-14">
                <Avatar>
                  <AvatarImage src={profile.avatar_url} />
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
            )}

            {/* Filter Repositories */}
            <div className="flex flex-row mt-6 mb-6 justify-start w-full ">
              {originalRepos && (
                <Input
                  type="text"
                  placeholder="Filter by Name"
                  className="mr-2 max-w-fit dark:text-white"
                  value={filter_name}
                  onChange={(e) => {
                    setFilterName(e.target.value);
                    filterRepos(e.target.value, filter_language);
                  }}
                />
              )}
              {originalRepos && (
                <Input
                  type="text"
                  placeholder="Filter by Language"
                  className="max-w-fit dark:text-white"
                  value={filter_language}
                  onChange={(e) => {
                    setFilterLanguage(e.target.value);
                    filterRepos(filter_name, e.target.value);
                  }}
                />
              )}
            </div>

            {/* User Repositories */}
            {repos && (
              <Table>
                <TableCaption>
                  Public repositories of {profile?.login}.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Repository Name</TableHead>
                    <TableHead>Language</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repos.map((repo) => (
                    <TableRow key={repo.name}>
                      <TableCell className="text-left dark:text-white">
                        {repo.name}
                      </TableCell>
                      <TableCell className="text-left dark:text-white">
                        {repo.language}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="dark:text-slate-400">
                      Number of Repositories
                    </TableCell>
                    <TableCell className="text-left dark:text-slate-400">
                      {repos?.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
