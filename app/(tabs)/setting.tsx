import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/theme';

type iconNamesTypes =
  | 'home'
  | 'settings'
  | 'ellipse'
  | 'information-circle-outline'
  | 'thumbs-up-outline'
  | 'share-outline'
  | 'headset-outline';

type SettingItemProps = {
  title: string;
  subtitle?: string; // 可选的次标题
  value?: boolean; // 用于 Switch 的状态
  onToggle?: () => void; // Switch 切换时的回调函数
  onPress?: () => void; // 点击事件的处理函数
  icon?: iconNamesTypes; // 图标名称（使用 Ionicons）
};

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  onPress,
  icon,
  value,
  onToggle,
}) => {
  const { tw, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        'p-4 mb-4 flex-row justify-between items-center rounded-lg',
        isDarkMode ? 'bg-card-dark' : 'bg-card',
      )}
    >
      <Text
        style={tw.style(
          'text-base font-semibold',
          isDarkMode ? 'text-foreground-dark' : 'text-foreground',
        )}
      >
        {title}
      </Text>
      {subtitle && (
        <Text style={tw.style('text-sm', isDarkMode ? 'text-muted-dark' : 'text-muted')}>
          {subtitle}
        </Text>
      )}
      {icon && <Ionicons name={icon} size={20} color={tw.color('muted')} />}
      {value !== undefined && <Switch value={value} onValueChange={onToggle} />}
    </TouchableOpacity>
  );
};

const SettingsScreen: React.FC = () => {
  const { tw, currentScheme, toggleTheme, isDarkMode } = useTheme(); // 获取 Tailwind 样式、主题状态和切换函数
  const [accentColor, setAccentColor] = React.useState('blue'); // 用于选择强调色

  return (
    <ScrollView
      style={tw.style(
        'flex-1 p-4',
        currentScheme === 'dark' ? 'bg-background-dark' : 'bg-background',
      )}
    >
      {/* 通用设置 */}
      <View style={tw`mb-6`}>
        <Text
          style={tw.style(
            'text-sm mb-2 font-semibold',
            isDarkMode ? 'text-muted-dark' : 'text-muted',
          )}
        >
          通用
        </Text>

        {/* 外观设置 */}
        <SettingItem
          title="外观"
          subtitle="深色(跟随系统)"
          value={isDarkMode}
          onToggle={toggleTheme}
        />

        {/* 强调色 */}
        <SettingItem
          title="强调色"
          subtitle="蓝色"
          onPress={() => setAccentColor('blue')}
          icon={accentColor === 'blue' ? 'ellipse' : undefined}
        />

        {/* 其他设置项 */}
        <SettingItem title="按键震动" subtitle="中" />
        <SettingItem title="按键音量" icon="information-circle-outline" />
        <SettingItem title="恢复初始设置" icon="information-circle-outline" />
      </View>

      {/* 其他设置 */}
      <View>
        <Text
          style={tw.style(
            'text-sm mb-2 font-semibold',
            isDarkMode ? 'text-muted-dark' : 'text-muted',
          )}
        >
          其他
        </Text>

        <SettingItem title="评价" icon="thumbs-up-outline" />
        <SettingItem title="转发" icon="share-outline" />
        <SettingItem title="故障反馈" icon="headset-outline" />
        <SettingItem title="关于" />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
