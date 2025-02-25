import { EventBus } from "./EventBus";
import { ProxyProps } from "./ProxyProps";

export interface BlockProps {
  [key: string]: any;
}

export abstract class Block<P extends BlockProps = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement | null = null;
  protected _meta: { tagName: string; props: P };

  public props: P;
  private _eventBus: EventBus;

  constructor(tagName: string = "div", props: P = {} as P) {
    this._eventBus = new EventBus();
    this.props = new ProxyProps(props, this._eventBus).get();
    this._meta = { tagName, props };
    this._registerEvents(this._eventBus);
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  protected _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    console.log(this._element, "thisle");
  }

  protected init(): void {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(oldProps?: P): void {}

  public dispatchComponentDidMount(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }

  public setProps = (nextProps: Partial<P>): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  protected _render(): void {
    if (this._element) {
      this._element.textContent = this.props.text || "";
      if (this.props.id) this._element.setAttribute("id", this.props.id);
      if (this.props.class)
        this._element.setAttribute("class", this.props.class);
      if (this.props.type) this._element.setAttribute("type", this.props.type);
      if (this.props.form) this._element.setAttribute("form", this.props.form);
    }
  }

  // protected abstract render(): string;

  public getContent(): HTMLElement | null {
    return this.element;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}
