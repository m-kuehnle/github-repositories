import { describe, expect, it } from "vitest";
import SearchUser from "./SearchUser";
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "../utils/test-utils";

describe("#SearchUser", () => {
  it("shows username input field", async () => {
    render(<SearchUser onProfileChange={() => {}} onReposChange={() => {}} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("show find user button", async () => {
    render(<SearchUser onProfileChange={() => {}} onReposChange={() => {}} />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/Find User/)).toBeInTheDocument();
  });

  it("displays error message when button is clicked without entering valid username", async () => {
    render(<SearchUser onProfileChange={() => {}} onReposChange={() => {}} />);

    const findUserButton = screen.getByRole("button");
    fireEvent.click(findUserButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("User not found.");
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it("clears error message when user starts typing in the username field", async () => {
    render(<SearchUser onProfileChange={() => {}} onReposChange={() => {}} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Expect error message to be displayed
    const errorMessage = await screen.findByText("User not found.");
    expect(errorMessage).toBeInTheDocument();

    // Enter text in the username input field
    const usernameInput = screen.getByRole("textbox");
    fireEvent.change(usernameInput, { target: { value: "example-user" } });

    // Expect error message to be cleared
    expect(errorMessage).not.toBeInTheDocument();
  });
});
