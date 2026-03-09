import MainMenu from "./main.menu.js";
import { BubbleUI } from "../../models/lib/bubble.js";
import { uiComponent } from "../../models/lib/dom.js";
import { Html } from "../../models/lib/html.js";
import ServerService from "../../services/servers.js";
import ServerMenu from "./server.menu.js";

const SERVER_SPACE_ID = "server-space";
const CHAT_SPACE_ID = "chat-space";

/**
 * Show home view
 */
export async function showHomeView(
  parameters: string[],
  container: HTMLElement
) {
  const view = uiComponent({
    type: Html.View,
    id: "home",
    classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
    styles: {
      height: "100%"
    }
  });

  const menu = view.appendChild(MainMenu.getInstance().getHtmlElement());
  view.appendChild(menu);

  const serverSpace = createServerSpace();
  view.appendChild(serverSpace);

  container.appendChild(view);
  await ServerService.loadServers().then(() => {
    MainMenu.setServers(ServerService.servers);
    MainMenu.onSelect(changeServer);
  });
}

function createServerSpace(): HTMLElement {
  const serverSpace = uiComponent({
    id: SERVER_SPACE_ID,
    classes: [BubbleUI.BoxRow],
    styles: {
      height: "calc(100% - 1rem)",
      width: "calc(100% - 6.75rem)",
      borderRadius: "1.25rem",
      margin: ".5rem .5rem .5rem 0"
    }
  });

  const menu = ServerMenu.getInstance().getHtmlElement();
  serverSpace.appendChild(menu);

  const chatSpace = uiComponent({
    id: CHAT_SPACE_ID,
    styles: {
      width: "100%",
      height: "100%",
      marginLeft: ".2rem"
    }
  });

  serverSpace.appendChild(chatSpace);

  return serverSpace;
}

async function changeServer(uuid: string) {
  const server = await ServerService.getServer(uuid);
  document.getElementById("server-title").innerHTML = server.name;
  ServerMenu.getInstance().setChannels(server.channels);
}
