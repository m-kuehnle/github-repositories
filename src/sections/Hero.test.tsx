import Hero from "./Hero";
import { render, screen } from "../utils/test-utils";

describe("Hero", () => {
  it("renders the header text", () => {
    render(<Hero />);
    const headerText = screen.getByRole("heading", { level: 1 });

    expect(headerText).toBeInTheDocument();
    expect(headerText).toHaveTextContent(
      "Search GitHub Users. Get Repositories."
    );
  });

  it("renders repositories text with gradient", () => {
    render(<Hero />);
    const gradientSpan = screen.getByText("Repositories");

    expect(gradientSpan).toBeInTheDocument();
    expect(gradientSpan).toHaveClass("bg-gradient-to-r");
  });
  it("renders the gradient span element", () => {
    render(<Hero />);
    const gradientSpan = screen.getByText("Repositories");

    expect(gradientSpan).toBeInTheDocument();
    expect(gradientSpan.tagName).toBe("SPAN");
  });
});
