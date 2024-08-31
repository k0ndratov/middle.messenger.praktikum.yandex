import Block from "../Block.ts";

const template = "<div><h1>Template</h1></div>";

class Component extends Block<Record<string, unknown>> {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

describe("Block", () => {
  let block: Component;

  const createBlock = (props = {}) => {
    block = new Component(props);
  };

  it("should create div tag", () => {
    createBlock();

    expect(block.element?.tagName).toBe("DIV");
  });

  it("should have text content", () => {
    createBlock();

    expect(block.element?.textContent).toBe("Template");
  });

  it("should have a default props", () => {
    createBlock();

    expect(block.props).toHaveProperty("__id");
  });

  it("should have a custom prop", () => {
    createBlock({ author: "Andrey Kondratov" });

    expect(block.props?.author).toBe("Andrey Kondratov");
  });

  it("should respond to change props", () => {
    createBlock();
    block.setProps({ some_date: 2402 });

    expect(Object.keys(block.props).length).toBe(2);
  });
});
