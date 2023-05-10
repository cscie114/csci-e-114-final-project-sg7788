import * as React from "react";
import Layout from "../layout";
import { render } from "@testing-library/react";

test("Search displays", () => {
  const { getAllByText } = render(<Layout />);
  expect(getAllByText("Search:")).toBeInTheDocument;
});
