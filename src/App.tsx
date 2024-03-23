import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import "./App.css";

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
    <div className="default-container">
      <h1 className="mb-8 md:text-5xl text-2xl">
        Get Repositories from any Github User
      </h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Username"
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

      {/* Filter Repositories */}
      <div className="flex">
        {originalRepos && (
          <Input
            type="text"
            placeholder="Filter by Name"
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
          <TableCaption>Public Repositories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Repository Name</TableHead>
              <TableHead>Language</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repos.map((repo) => (
              <TableRow key={repo.name}>
                <TableCell className="text-left">{repo.name}</TableCell>
                <TableCell className="text-left">{repo.language}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default App;
