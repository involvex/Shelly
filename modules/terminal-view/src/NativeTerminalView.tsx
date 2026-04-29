import React from "react";
import { requireNativeViewManager } from "expo-modules-core";
import { Platform, View, ViewProps } from "react-native";

const isAndroid = Platform.OS === "android";

export type FontFamily = "jetbrains-mono" | "fira-code" | "pixel-mplus";

export type CursorShape = "block" | "underline" | "bar";

export interface OutputEvent {
  nativeEvent: {
    text: string;
    isError: boolean;
  };
}

export interface BlockCompletedEvent {
  nativeEvent: {
    command: string;
    output: string;
    exitCode: number;
  };
}

export interface SelectionChangedEvent {
  nativeEvent: {
    text: string;
  };
}

export interface UrlDetectedEvent {
  nativeEvent: {
    url: string;
    type: string;
  };
}

export interface TitleChangedEvent {
  nativeEvent: {
    title: string;
  };
}

export interface ResizeEvent {
  nativeEvent: {
    cols: number;
    rows: number;
  };
}

export interface ScrollStateChangedEvent {
  nativeEvent: {
    isScrolledUp: boolean;
  };
}

export interface NativeTerminalViewProps extends ViewProps {
  sessionId: string;
  fontFamily: FontFamily;
  fontSize: number;
  cursorShape?: CursorShape;
  cursorBlink?: boolean;
  colorScheme?: Record<string, string>;
  onOutput?: (event: OutputEvent) => void;
  onBlockCompleted?: (event: BlockCompletedEvent) => void;
  onSelectionChanged?: (event: SelectionChangedEvent) => void;
  onUrlDetected?: (event: UrlDetectedEvent) => void;
  onBell?: () => void;
  onTitleChanged?: (event: TitleChangedEvent) => void;
  onResize?: (event: ResizeEvent) => void;
  onScrollStateChanged?: (event: ScrollStateChangedEvent) => void;
  gpuRendering?: boolean;
}

const WebFallback = (_props: NativeTerminalViewProps) => null;

// Cast to allow ref since ViewProps has it
const AndroidView = isAndroid
  ? (requireNativeViewManager("TerminalView") as any)
  : null;

export const NativeTerminalView = AndroidView || WebFallback;
