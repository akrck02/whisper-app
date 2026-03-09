import { Server } from "../models/server.js";

export default class ServerService {
  static servers: Server[];

  static async loadServers() {
    this.servers = [
      {
        uuid: "cbf410aa-920a-4730-92ea-f3ed2bae2096",
        name: "Akrck02's place",
        channels: {
          GENERAL: [
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "home",
              type: 0
            },
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "voice-general",
              type: 1
            },
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "offtopic",
              type: 0
            }
          ]
        }
      },
      {
        uuid: "d281a8a7-acad-427c-baf6-1349d8b3df44",
        name: "The hyrule fair",
        channels: {
          N64: [
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "majoras-mask",
              type: 0
            }
          ],
          GBA: [
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "minish-cap",
              type: 0
            }
          ],
          Gamecube: [
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "twilight-princess",
              type: 0
            }
          ],
          Switch: [
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "breath-of-the-wild",
              type: 1
            },
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "tears-of-the-kingdom",
              type: 1
            }
          ]
        }
      },
      {
        uuid: "a959f7a7-a774-49fa-8a0b-cf738ff9e4ad",
        name: "Sigmund corp",
        channels: {
          SIGMUND: [
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "to-the-moon",
              type: 0
            },
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "finding-paradise",
              type: 0
            },
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "impostor-factory",
              type: 0
            },
            {
              uuid: "XXXX-XXXXX-XXXXX-XXXX",
              name: "beach-episode",
              type: 0
            }
          ]
        }
      }
    ];
  }

  static async getServer(uuid: string): Promise<Server> {
    return this.servers.find((server) => server.uuid == uuid);
  }
}
