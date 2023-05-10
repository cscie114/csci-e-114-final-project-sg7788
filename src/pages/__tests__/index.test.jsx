import * as React from "react";
// import Card from "../../components/Card";
import { render } from "@testing-library/react";

test("Image in card displays", () => {
  const { findAllByTestId } = render(<img />);
  expect(findAllByTestId("image")).toBeInTheDocument;
});
