import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

export interface Repo {
  name: string;
  language: string;
}

interface Props {
  onProfileChange: (newProfile: UserProfile | null) => void;
  onReposChange: (newRepos: Repo[] | null) => void;
}

const SearchUser = ({ onProfileChange, onReposChange }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (userName: string) => {
    try {
      setError(null);
      const res = await fetch(
        "https://api.github.com/search/users?q=" + userName
      );
      const data = await res.json();

      if (data.items.length === 0) {
        throw new Error("User not found.");
      }

      const userProfile = data.items[0];
      onProfileChange(userProfile);

      const repoRes = await fetch(userProfile.repos_url);
      const repoData = await repoRes.json();
      onReposChange(repoData);
    } catch (error) {
      setError("User not found.");
      console.error(error);
    }
  };

  return (
    <div className="w-full md:max-w-sm">
      <div className="flex w-full items-center space-x-2 my-2">
        <Input
          type="text"
          placeholder="Username"
          className="dark:text-white"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            // Clear error message when input changes
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData(userName);
            }
          }}
        />
        <Button type="submit" onClick={() => fetchData(userName)}>
          Find User
        </Button>
      </div>
      {/* Display error message if there is an error */}
      {error && (
        <Alert className="w-full">
          <Terminal className="h-4 w-4" />
          <AlertTitle>User not found.</AlertTitle>
          <AlertDescription>
            Please try again with a valid username.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SearchUser;
