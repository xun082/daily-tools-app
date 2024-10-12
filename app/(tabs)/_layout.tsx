import { Tabs } from 'expo-router';
import React from 'react';

import { useTheme } from '@/theme'; // 使用自定义的 useTheme 钩子
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; // 自定义的 TabBarIcon 组件

export default function TabLayout() {
  const { isDarkMode, tw } = useTheme(); // 获取当前的主题状态

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? tw.color('tab-bar-dark') : tw.color('tab-bar'),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: '设置',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
