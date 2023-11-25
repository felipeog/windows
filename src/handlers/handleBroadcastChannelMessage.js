import { state } from "../objects/state";

export function handleBroadcastChannelMessage(event) {
  if (event.data.id) {
    state[event.data.id] = event.data;
  }
}
