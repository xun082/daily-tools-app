import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { create, useDeviceContext } from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  type Theme as NavigationThemeType,
} from '@react-navigation/native';

import type { ColorScheme } from './types';
import tailwindConfig from '../tailwind.config';

export const tw = create(tailwindConfig);

type ColorSchemeContextType = {
  currentScheme: ColorScheme;
  tw: typeof tw;
  themeColor: (className: string) => string | undefined;
  navTheme: NavigationThemeType;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const ColorSchemeContext = createContext<ColorSchemeContextType | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  useDeviceContext(tw); // 启用 twrnc 的设备上下文

  const [currentScheme, setCurrentScheme] = useState<ColorScheme>('light'); // 管理当前主题状态
  const isDarkMode = currentScheme === 'dark'; // 用于判断是否是暗黑模式

  // 从 AsyncStorage 中恢复用户上次选择的主题
  useEffect(() => {
    const loadTheme = async () => {
      const savedScheme = await AsyncStorage.getItem('theme');

      if (savedScheme) {
        setCurrentScheme(savedScheme as ColorScheme);
      }
    };

    loadTheme();
  }, []);

  // 切换主题并缓存到 AsyncStorage 中
  const toggleTheme = async () => {
    const newScheme = isDarkMode ? 'light' : 'dark'; // 如果当前是暗黑模式，则切换到浅色模式，反之亦然
    setCurrentScheme(newScheme);
    await AsyncStorage.setItem('theme', newScheme); // 缓存到本地存储
  };

  const navTheme: NavigationThemeType = useMemo(() => {
    return isDarkMode
      ? {
          ...NavigationDarkTheme,
          colors: {
            ...NavigationDarkTheme.colors,
            primary: tw.color('primary-dark')!,
            background: tw.color('background-dark')!,
            text: tw.color('foreground-dark')!,
            card: tw.color('card-dark')!,
            border: tw.color('border-dark')!,
            notification: tw.color('destructive-dark')!,
          },
        }
      : {
          ...NavigationDefaultTheme,
          colors: {
            ...NavigationDefaultTheme.colors,
            primary: tw.color('primary')!,
            background: tw.color('background')!,
            text: tw.color('foreground')!,
            card: tw.color('card')!,
            border: tw.color('border')!,
            notification: tw.color('destructive')!,
          },
        };
  }, [isDarkMode]);

  const value = useMemo(
    () => ({
      tw,
      currentScheme,
      themeColor: (className: string) => tw.color(isDarkMode ? `${className}-dark` : className),
      navTheme,
      toggleTheme,
      isDarkMode,
    }),
    [currentScheme],
  );

  return (
    <ColorSchemeContext.Provider value={value}>
      <NavigationThemeProvider value={navTheme}>{children}</NavigationThemeProvider>
    </ColorSchemeContext.Provider>
  );
}

// 自定义的 useTheme 钩子，确保类型安全
export function useTheme(): ColorSchemeContextType {
  const ctx = useContext(ColorSchemeContext);

  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }

  return ctx;
}
