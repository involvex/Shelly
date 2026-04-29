import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

let _TerminalViewModule: any = null;
let _TerminalEmulator: any = null;

export async function getTerminalViewModule() {
  if (_TerminalViewModule) return _TerminalViewModule;

  if (isAndroid) {
    try {
      const module =
        await import("@/modules/terminal-view/src/TerminalViewModule");
      _TerminalViewModule = module.default;
      return _TerminalViewModule;
    } catch (e) {
      console.warn("[TerminalView] Failed to load native module:", e);
    }
  }

  _TerminalViewModule = {
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
  return _TerminalViewModule;
}

export async function getTerminalEmulator() {
  if (_TerminalEmulator) return _TerminalEmulator;

  if (isAndroid) {
    try {
      const module =
        await import("@/modules/terminal-emulator/src/TerminalEmulatorModule");
      _TerminalEmulator = module.default;
      return _TerminalEmulator;
    } catch (e) {
      console.warn("[TerminalEmulator] Failed to load native module:", e);
    }
  }

  _TerminalEmulator = {
    createSession: async () => "",
    destroySession: async () => {},
    writeToSession: async () => {},
    sendKeyEvent: async () => {},
    resizeSession: async () => {},
    isSessionAlive: async () => false,
    hasEmulator: async () => false,
    getTranscriptText: async () => "",
    writeToEmulator: async () => {},
    getSessionTitle: async () => "",
    startSessionService: async () => {},
    stopSessionService: async () => {},
    updateSessionNotification: async () => {},
    isIgnoringBatteryOptimizations: async () => false,
    requestBatteryOptimizationExemption: async () => {},
    testExecve: async () => ({ success: false, error: "Not available" }),
    scheduleAgent: async () => {},
    cancelAgent: async () => {},
    execCommand: async () => ({
      exitCode: 1,
      stdout: "",
      stderr: "Not available",
    }),
    addListener: () => ({ remove: () => {} }),
    removeListener: () => {},
    removeAllListeners: () => {},
    emit: () => false,
    listenerCount: () => 0,
  };
  return _TerminalEmulator;
}

export const TerminalViewModule = {
  startRendering: async () => {},
  stopRendering: async () => {},
  setContent: async (_sessionId?: string, _content?: string) => {},
  setCwd: async (_sessionId?: string, _cwd?: string) => {},
  focus: async (_sessionId?: string) => {},
  blur: async (_sessionId?: string) => {},
  scrollToBottom: async (_viewTag?: number) => {},
  refreshScreen: async (_viewTag?: number) => {},
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
  removeAllListeners: () => {},
  emit: () => false,
  listenerCount: () => 0,
};

export const TerminalEmulator = {
  createSession: async (_config?: any) => "",
  destroySession: async (_sessionId?: string) => {},
  writeToSession: async (_sessionId?: string, _data?: string) => {},
  sendKeyEvent: async (
    _sessionId?: string,
    _keyCode?: number,
    _modifiers?: number,
  ) => {},
  resizeSession: async (
    _sessionId?: string,
    _rows?: number,
    _cols?: number,
  ) => {},
  isSessionAlive: async (_sessionId?: string) => false,
  hasEmulator: async (_sessionId?: string) => false,
  getTranscriptText: async (_sessionId?: string, _maxLines?: number) => "",
  writeToEmulator: async (_sessionId?: string, _text?: string) => {},
  getSessionTitle: async (_sessionId?: string) => "",
  startSessionService: async () => {},
  stopSessionService: async () => {},
  updateSessionNotification: async (_info?: string) => {},
  isIgnoringBatteryOptimizations: async () => false,
  requestBatteryOptimizationExemption: async () => {},
  testExecve: async () => ({ success: false, error: "Not available" }),
  scheduleAgent: async (
    _agentId?: string,
    _intervalMs?: number,
    _triggerAtMs?: number,
  ) => {},
  cancelAgent: async (_agentId?: string) => {},
  execCommand: async (_command?: string, _timeoutMs?: number) => ({
    exitCode: 1,
    stdout: "",
    stderr: "Not available",
  }),
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
  removeAllListeners: () => {},
  emit: () => false,
  listenerCount: () => 0,
};

export const NativeTerminalView = () => null;
