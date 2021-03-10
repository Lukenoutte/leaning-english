import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import HeaderandFooter from "../components/headerAndFooter/headerAndFooter";

afterEach(() => {
  cleanup();
});

it("check header and footer not authenticated", () => {
  var authenticated = false;
  render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          authenticated,
        }}
      >
        <HeaderandFooter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const header = screen.getByTestId("header");
  const footer = screen.getByTestId("footer");
  
  expect(header).toBeInTheDocument();
  expect(header).toMatchSnapshot();
  expect(footer).toBeInTheDocument();
  expect(footer).toMatchSnapshot();
});

it("check header and footer authenticated", () => {
  var authenticated = true;
  render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          authenticated,
        }}
      >
        <HeaderandFooter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const header = screen.getByTestId("header");
  const footer = screen.getByTestId("footer");

  expect(header).toBeInTheDocument();
  expect(header).toMatchSnapshot();
  expect(footer).toBeInTheDocument();
  expect(footer).toMatchSnapshot();
});
