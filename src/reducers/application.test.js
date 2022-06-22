import reducer from "./application";

describe("Application reducer", () => {
  it("throws an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null }))
      .toThrowError("Tried to reduce with unsupported action type:");
  });
});
