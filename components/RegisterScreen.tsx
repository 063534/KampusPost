// components/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import CustomInput from './CustomInput';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const onRegisterPress = () => {
    if (password !== passwordAgain) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor!');
      return;
    }

    console.log('Kayıt başarılı', { email, password });
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomInput
        placeholder="Şifre Tekrar"
        value={passwordAgain}
        onChangeText={setPasswordAgain}
        secureTextEntry
      />

      <Button title="Kayıt Ol" onPress={onRegisterPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default RegisterScreen;
