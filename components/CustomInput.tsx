import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

type Props = TextInputProps & { containerStyle?: object };

export default function CustomInput({ containerStyle, ...rest }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput style={styles.input} placeholderTextColor="#999" {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 12 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
