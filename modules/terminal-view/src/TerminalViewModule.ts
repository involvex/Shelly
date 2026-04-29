import { requireNativeModule } from "expo-modules-core";
import { Platform } from "react-native";

let NativeTerminalView: any;

if (Platform.OS === "android") {
  try {
    NativeTerminalView = requireNativeModule("TerminalView");
  } catch (e) {
    console.warn("[TerminalView] Native module not available on this platform");
  }
}

const WebFallback = {
  startRendering: async () => {},
  stopRendering: async () => {},
  setContent: async () => {},
  setCwd: async () => {},
  focus: async () => {},
  blur: async () => {},
  scrollToBottom: async () => {},
  copyToClipboard: async () => {},
  getSelection: async () => null,
  clearSelection: async () => {},
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
  removeAllListeners: () => {},
  emit: () => false,
  listenerCount: () => 0,
};

export default NativeTerminalView || WebFallback;
