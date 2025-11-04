import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomInput from './CustomInput';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // DİKKAT: onPress'e fonksiyon REFERANSI veriyoruz (onSubmit), onSubmit() değil!
  const onSubmit = () => {
    // Görsel teyit (ekranda popup)
    Alert.alert('Giriş denendi', `Email: ${email}\nPassword: ${password ? '***' : ''}`);
    // Konsol teyit (Metro penceresinde görünür)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding' })}
      >
        {/* Boş alana dokununca klavyeyi kapat */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>Giriş Yap</Text>

            <View style={styles.form}>
              <CustomInput
                placeholder="E-posta"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />
              <CustomInput
                placeholder="Şifre"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
              />

              {/* TouchableOpacity ile butonu garanti çalışır hale getiriyoruz */}
              <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 24 },
  form: { width: '100%' },
  button: {
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
