import { BubbleUI } from "../../models/lib/bubble.js";
import { uiComponent } from "../../models/lib/dom.js";
import { Html } from "../../models/lib/html.js";
import { ChannelsByCategory } from "../../models/server.js";

export default class ServerMenu {
  private static readonly ID = "server-menu";
  private static readonly TITLE_ID = "server-title";
  private static readonly CHANNELS_CONTAINER_ID = "server-channels";

  private static instance: ServerMenu;

  private element: HTMLElement;

  private constructor() {
    this.element = uiComponent({
      id: ServerMenu.ID,
      styles: {
        background: "var(--surface-1)",
        height: "100%",
        width: "15rem",
        minWidth: "15rem",
        borderRadius: "1.25rem",
        margin: "0",
        padding: "0 1rem"
      }
    });

    const title = uiComponent({
      type: Html.P,
      id: ServerMenu.TITLE_ID,
      text: "...",
      styles: {
        padding: "1.3rem 0rem",
        fontWeight: "bold",
        margin: "0 0rem",
        marginBottom: "1rem",
        borderBottom: ".1rem solid rgba(255,255,255,.1)"
      }
    });

    this.element.appendChild(title);

    const channels = uiComponent({
      id: ServerMenu.CHANNELS_CONTAINER_ID,
      classes: [BubbleUI.BoxColumn]
    });

    this.element.appendChild(channels);
  }

  static getInstance(): ServerMenu {
    if (null == this.instance) {
      this.instance = new ServerMenu();
    }

    return this.instance;
  }

  getHtmlElement() {
    return this.element;
  }

  setChannels(channels: ChannelsByCategory) {
    const channelsContainer = document.getElementById(
      ServerMenu.CHANNELS_CONTAINER_ID
    );
    channelsContainer.innerHTML = "";

    for (const category in channels) {
      const categoryContainer = uiComponent({
        styles: {
          paddingBottom: "1rem"
        }
      });

      const categoryTitle = uiComponent({
        text: category,
        styles: {
          paddingBottom: ".75rem"
        }
      });

      categoryContainer.appendChild(categoryTitle);

      channels[category].forEach((channel) => {
        const button = uiComponent({
          text: `${channel.type == 0 ? "#" : "@"} ${channel.name}`,
          styles: {
            width: "100%",
            cursor: "pointer",
            padding: ".45rem .75rem",
            fontWeight: "lighter"
          }
        });

        categoryContainer.appendChild(button);
      });
      channelsContainer.appendChild(categoryContainer);
    }
  }
}
