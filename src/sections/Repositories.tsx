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
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

interface Repo {
  name: string;
  language: string;
}

interface ProfileProps {
  profile: UserProfile;
  repos: Repo[] | null;
}

interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

const Repositories: React.FC<ProfileProps> = ({ profile, repos }) => {
  const [filterName, setFilterName] = useState<string>("");
  const [filterLanguage, setFilterLanguage] = useState<string>("");
  const [filteredRepos, setFilteredRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    // Reset filter inputs when repos prop changes
    setFilterName("");
    setFilterLanguage("");
    setFilteredRepos(repos);
  }, [repos]);

  const filterRepos = (name?: string, language?: string) => {
    let filteredRepos = repos || [];

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

    setFilteredRepos(filteredRepos);
  };

  return (
    <div className="h-full w-full lg:w-4/6">
      {/* Filter Repositories */}
      <div className="flex flex-row mt-6 mb-6 justify-start w-full">
        {repos && (
          <Input
            type="text"
            placeholder="Filter by Name"
            className="mr-2 max-w-fit dark:text-white"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value);
              filterRepos(e.target.value, filterLanguage);
            }}
          />
        )}
        {repos && (
          <Input
            type="text"
            placeholder="Filter by Language"
            className="max-w-fit dark:text-white"
            value={filterLanguage}
            onChange={(e) => {
              setFilterLanguage(e.target.value);
              filterRepos(filterName, e.target.value);
            }}
          />
        )}
      </div>

      {/* User Repositories */}
      {filteredRepos && (
        <div className="min-h-screen">
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
              {filteredRepos.map((repo) => (
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
                  {filteredRepos?.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Repositories;
