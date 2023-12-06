import renderer from "react-test-renderer";
import { expect, test } from "vitest";
import Index from "../src/pages/index";

test("renders vite logo", () => {
  const testInstance = renderer.create(<Index />).root;
  expect(testInstance.findByType("img").props.alt).toEqual("Vite logo");
});
