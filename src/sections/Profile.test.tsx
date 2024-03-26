import Profile from "./Profile";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

interface UserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

describe("#Profile", () => {
  const exampleProfile: UserProfile = {
    login: "m-kuehnle",
    avatar_url: "https://avatars.githubusercontent.com/u/74116720?v=4",
    html_url: "https://github.com/m-kuehnle",
    repos_url: "https://api.github.com/users/m-kuehnle/repos",
  };

  it("renders username", () => {
    render(<Profile profile={exampleProfile} />);

    const usernameText = screen.getByText(exampleProfile.login);
    expect(usernameText).toBeInTheDocument();
  });

  it("renders nothing when profile prop is null", () => {
    render(<Profile profile={null} />);

    const usernameLink = screen.queryByText(exampleProfile.login);
    expect(usernameLink).not.toBeInTheDocument();
  });
});
