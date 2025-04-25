import React from 'react';
import { View, StyleSheet } from 'react-native';
import COLORS from '../colors';
import LAYOUT from '../layout';

export default function PaperView({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paper,
    padding: LAYOUT.padding,
    borderRadius: LAYOUT.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
});
