import { broadcastChannel } from "./objects/broadcastChannel";
import { handleBroadcastChannelMessage } from "./handlers/handleBroadcastChannelMessage";
import { handleWindowLoad } from "./handlers/handleWindowLoad";
import { handleWindowUnload } from "./handlers/handleWindowUnload";

broadcastChannel.addEventListener("message", handleBroadcastChannelMessage);
window.addEventListener("load", handleWindowLoad);
window.addEventListener("unload", handleWindowUnload);
