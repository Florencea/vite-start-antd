import { get } from "lodash-es";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";
import Index from "../src/pages/index";

test("renders vite logo", () => {
  const component = renderer.create(<Index />).toJSON();
  expect(
    get(component, ["children", 0, "children", 0, "props", "alt"]),
  ).toEqual("Vite logo");
});
