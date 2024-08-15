import Block from "../Block";

export default function render(query: string, block: Block<Record<string, unknown>>) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = "";

  if (block.element) {
    root.appendChild(block.element);
  }

  return root;
}
