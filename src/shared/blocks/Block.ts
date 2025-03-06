import { ContextStrategy } from "@domains/validation/ContextStrategy";
import { StrategyType } from "@domains/validation/StrategyType";
import Handlebars from "handlebars";
import { EventBus } from "./EventBus";

interface BlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement | null = null;

  protected _id: number = Math.floor(100000 + Math.random() * 900000);

  protected props: BlockProps;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected children: Record<string, any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected lists: Record<string, any>;

  protected contextStrategy: ContextStrategy;

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: BlockProps = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = this._makePropsProxy({ ...lists });
    this.eventBus = () => eventBus;
    this.contextStrategy = new ContextStrategy();
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
        if (
          ["blur", "focus"].includes(eventName) &&
          this._element.firstElementChild
        ) {
          this._element.firstElementChild.addEventListener(
            eventName,
            events[eventName]
          );
        }
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>;
    props: BlockProps;
    lists: Record<string, Block[]>;
  } {
    const children: Record<string, Block> = {};
    const props: BlockProps = {};
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;
    const allowedAttributes = Object.keys(
      HTMLElement.prototype
    ) as (keyof HTMLElement)[];

    Object.entries(attr).forEach(([key, value]) => {
      if (
        this._element &&
        allowedAttributes.includes(key as keyof HTMLElement)
      ) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps(nextProps: BlockProps): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  public setLists(nextList: Record<string, Block[]>): void {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs: Record<string, string> = { ...this.props };
    const tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.lists).forEach(([_, child]) => {
      const listCont = this._createDocumentElement("template");
      child.forEach((item: unknown) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return "";
  }

  protected componentDidUpdate(
    oldProps: BlockProps,
    newProps: BlockProps
  ): boolean {
    console.log(oldProps, newProps);
    return true;
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error("Element is not created");
    }
    return this._element;
  }

  private _makePropsProxy(
    props: Record<string, unknown>
  ): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public validateField(fieldType: StrategyType, value: string): boolean {
    return this.contextStrategy.validate(fieldType, value);
  }

  private handleValidateFormOnSubmit(formId: string): boolean {
    const form = document.getElementById(formId) as HTMLFormElement;
    let isValid = true;
    if (!form) {
      console.error("Форма не найдена");
      return false;
    }

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      const fieldType = input.getAttribute("name") as StrategyType;
      const value = input.value.trim();

      if (!this.validateField(fieldType, value)) {
        isValid = false;
        input.classList.add("error");
      }
    });

    return isValid;
  }

  protected handleFormSubmit(
    event: Event,
    formId: string,
    callback?: (data: Record<string, string>) => void
  ): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.handleValidateFormOnSubmit(formId)) {
      throw new Error("Проверьте корректность данных");
    }

    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) {
      console.error("Форма не найдена");
      return;
    }

    const formData = new FormData(form);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    callback?.(formValues);
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
