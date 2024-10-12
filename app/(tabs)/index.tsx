import React from 'react';
import { View, Text, Button } from 'react-native';

import { useTheme } from '@/theme';

const App = () => {
  const { tw, currentScheme, toggleTheme } = useTheme();

  return (
    <View
      style={tw`flex-1 items-center justify-center bg-${currentScheme === 'dark' ? 'background-dark' : 'background'}`}
    >
      <Text
        style={tw`text-xl font-medium bg-secondary dark:bg-secondary-dark text-${currentScheme === 'dark' ? 'foreground-dark' : 'foreground'}`}
      >
        Profile
      </Text>

      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default App;
