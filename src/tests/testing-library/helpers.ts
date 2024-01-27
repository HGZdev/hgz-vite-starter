import {screen} from "@testing-library/react";

// findBy*. is the async version of getBy
export const findBtn = async (buttonName: string | RegExp) =>
  await screen.findByRole("button", {name: buttonName});
export const findText = async (id: string | RegExp) =>
  await screen.findByText(id);
export const findId = async (id: string | RegExp) =>
  await screen.findByTestId(id);
