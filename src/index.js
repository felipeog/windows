import { handleWindowUnload } from "./handlers/handleWindowUnload";
import { handleWindowLoad } from "./handlers/handleWindowLoad";
import { handleBroadcastChannelMessage } from "./handlers/handleBroadcastChannelMessage";
import { broadcastChannel } from "./objects/broadcastChannel";
import { handleLocalStorage } from "./handlers/handleLocalStorage";

broadcastChannel.addEventListener("message", handleBroadcastChannelMessage);
window.addEventListener("storage", handleLocalStorage);
window.addEventListener("load", handleWindowLoad);
window.addEventListener("unload", handleWindowUnload);
