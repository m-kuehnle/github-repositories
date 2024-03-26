import { render, screen, fireEvent } from "@testing-library/react";
import Repositories from "./Repositories";

describe("Repositories", () => {
  const profileMock = {
    login: "m-kuehnle",
    avatar_url: "https://avatars.githubusercontent.com/u/74116720?v=4",
    html_url: "https://github.com/m-kuehnle",
    repos_url: "https://api.github.com/users/m-kuehnle/repos",
  };

  const reposMock = [
    { name: "Repo 1", language: "JavaScript" },
    { name: "Repo 2", language: "TypeScript" },
    { name: "Repo 3", language: "Python" },
  ];

  it("renders filter input fields", () => {
    render(<Repositories profile={profileMock} repos={reposMock} />);

    const nameFilterInput = screen.getByPlaceholderText("Filter by Name");
    expect(nameFilterInput).toBeInTheDocument();

    const languageFilterInput =
      screen.getByPlaceholderText("Filter by Language");
    expect(languageFilterInput).toBeInTheDocument();
  });

  it("renders repositories list", () => {
    render(<Repositories profile={profileMock} repos={reposMock} />);

    const repoNames = reposMock.map((repo) => repo.name);
    repoNames.forEach((name) => {
      const repoNameElement = screen.getByText(name);
      expect(repoNameElement).toBeInTheDocument();
    });

    const languageElements = screen.getAllByText(
      /JavaScript|TypeScript|Python/i
    );
    expect(languageElements.length).toBe(3);
  });

  it("updates filtered repositories list when filter inputs change", () => {
    render(<Repositories profile={profileMock} repos={reposMock} />);

    const nameFilterInput = screen.getByPlaceholderText("Filter by Name");
    fireEvent.change(nameFilterInput, { target: { value: "Repo 1" } });

    const filteredRepoName = screen.getByText("Repo 1");
    expect(filteredRepoName).toBeInTheDocument();

    const repo2Element = screen.queryByText("Repo 2");
    expect(repo2Element).toBeNull();

    const languageElements = screen.queryAllByText(/TypeScript|Python/i);
    expect(languageElements.length).toBe(0);
  });
});
