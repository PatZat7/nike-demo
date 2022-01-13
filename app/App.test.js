import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./";
import store from "store";

test("renders App", () => {
  render(



        <App />



  );
  const titleElement = screen.getByText(/commentor/i);
  expect(titleElement).toBeInTheDocument();
});
