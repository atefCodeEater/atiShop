import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

test("for header", () => {
  render(<Home />);
});

const header = screen.findByRole("heading", { name: "atiShop" });

expect(header).toBeInTheDocument();
