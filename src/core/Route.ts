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

  public isLoginRequired;

  constructor(path: string, blockClass: BlockConstructable, rootQuery: string, isLoginRequired: boolean) {
    this._blockClass = blockClass;
    this._rootQuery = rootQuery;
    this.isLoginRequired = isLoginRequired;
    this.path = path;
  }

  match(path: string) {
    return this.path === path;
  }

  render() {
    this._block = new this._blockClass({});
    render(this._rootQuery, this._block);
  }
}
