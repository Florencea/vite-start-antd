import renderer from "react-test-renderer";
import { expect, test } from "vitest";
import { Welcome } from "../src/components/Welcome";

test("renders vite logo", () => {
  const testInstance = renderer.create(<Welcome />).root;
  expect(testInstance.findByType("img").props.alt).toEqual("Vite logo");
});
