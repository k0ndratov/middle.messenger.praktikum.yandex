import Block from "./Block";
import render from "./utils/render";

export interface BlockConstructable {
  new (props: Record<string, unknown>): Block<Record<string, unknown>>;
}

export default class Route {
  private _blockClass: BlockConstructable;

  private _block: Block<Record<string, unknown>> | null = null;

  private _rootQuery: string;

  public path: string | null = null;

  constructor(path: string, blockClass: BlockConstructable, rootQuery: string) {
    this._blockClass = blockClass;
    this._rootQuery = rootQuery;
    this.path = path;
  }

  match(path: string) {
    return this.path === path;
  }

  // navigate(path: string) {
  //   if (this.match(path)) {
  //     this.path = path;
  //     this.render();
  //   }
  // }

  render() {
    this._block = new this._blockClass({});
    render(this._rootQuery, this._block);
  }
}
