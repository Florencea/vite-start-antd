import type { ThemeConfig } from "antd";
import { useSyncExternalStore } from "react";

/**
 * Extracts CSS variables defined in global.css (@theme)
 */
function getCssVariable(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    undefined
  );
}

/**
 * Dynamically builds Ant Design theme tokens from CSS variables
 */
function createAntdTheme(primaryColor?: string): ThemeConfig {
  const resolvedPrimary = primaryColor ?? getCssVariable("--color-primary");
  return {
    hashed: false,
    token: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      borderRadius: 8,
      colorPrimary: resolvedPrimary,
      colorInfo: resolvedPrimary,
    },
    components: {
      Layout: {
        headerBg: resolvedPrimary,
      },
    },
  };
}

function subscribeToTheme(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });
  return () => {
    observer.disconnect();
  };
}

function getThemeSnapshot(): string {
  return getCssVariable("--color-primary") ?? "";
}

function getThemeServerSnapshot(): string {
  return "";
}

/**
 * React hook that subscribes to CSS variable changes via useSyncExternalStore
 */
export function useAntdTheme(): ThemeConfig {
  const primaryColor = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  return createAntdTheme(primaryColor || undefined);
}
