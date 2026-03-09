import { BubbleUI } from "../../models/lib/bubble.js";
import { uiComponent } from "../../models/lib/dom.js";
import { Html } from "../../models/lib/html.js";
import { Server } from "../../models/server.js";

export default class MainMenu {
  private static readonly ID = "main-menu";
  private static readonly SERVER_CONTAINER_ID = "server-container";
  private static readonly SERVER_BUTTON_CLASS = "server-button";

  private static instance: MainMenu;

  private element: HTMLElement;

  private constructor() {
    this.element = uiComponent({
      id: MainMenu.ID,
      classes: [BubbleUI.BoxColumn]
    });

    const serverContainer = uiComponent({
      id: MainMenu.SERVER_CONTAINER_ID,
      classes: [BubbleUI.BoxColumn]
    });

    this.element.appendChild(serverContainer);
  }

  /**
   * Get HTML element
   * @returns
   */
  getHtmlElement(): HTMLElement {
    return this.element;
  }

  /**
   * Set servers to menu
   * @param servers the servers to add
   */
  static setServers(servers: Server[]) {
    if (null == this.instance) {
      return;
    }

    servers?.forEach((server: Server) => {
      const option = uiComponent({
        type: Html.Button,
        classes: [this.SERVER_BUTTON_CLASS],
        text: server.name.charAt(0),
        data: {
          "server.uuid": server.uuid,
          "server.name": server.name
        }
      });

      MainMenu.instance.element
        .querySelector(`#${MainMenu.SERVER_CONTAINER_ID}`)
        ?.append(option);
    });

    // set default callback
    this.onSelect(console.log);
  }

  /**
   * clear the menu
   */
  static clear() {
    if (null == MainMenu.instance) {
      return;
    }

    MainMenu.instance.element.querySelector(
      `#${MainMenu.SERVER_CONTAINER_ID}`
    ).innerHTML = "";
  }

  /**
   * Get the instance of the menu
   * @returns the menu instance
   */
  static getInstance(): MainMenu {
    if (null == MainMenu.instance) {
      MainMenu.instance = new MainMenu();
    }

    return MainMenu.instance;
  }

  static onSelect(callback: (uuid: string) => void) {
    if (this.instance == null) {
      return;
    }

    const buttons = this.instance.element.getElementsByClassName(
      this.SERVER_BUTTON_CLASS
    );

    for (const button of buttons) {
      const btn = button as HTMLButtonElement;
      btn.onclick = () => MainMenu.selectButton(btn, buttons, callback);
    }
  }

  private static selectButton(
    button: HTMLButtonElement,
    buttons: HTMLCollectionOf<Element>,
    callback: (uuid: string) => void
  ) {
    for (const btn of buttons) {
      btn.classList.remove("selected");
    }

    button.classList.toggle("selected");
    callback(button.dataset["server.uuid"]);
  }
}
