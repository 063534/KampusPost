# KampusPost - BGP 201 Ödev 4

# 📱 KampusPost – React Native Ödev 4

Bu proje, BGP201 dersi kapsamında React Native kullanılarak geliştirilmiş bir mobil uygulamadır.  
Uygulama; **Login**, **Register** ve **Home** ekranlarından oluşur.  
Navigation yapısı, form kontrolü, API’den veri çekme ve listeleme (FlatList) özelliklerini içerir.

---

# 📌 İçindekiler
1. [Projenin Amacı](#projenin-amacı)
2. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
3. [Kurulum](#kurulum)
4. [Ekran Görüntüleri](#ekran-görüntüleri)
5. [Kod Yapısı](#kod-yapısı)
6. [LoginScreen](#loginscreen)
7. [RegisterScreen](#registerscreen)
8. [HomeScreen](#homescreen)
9. [Konsol / DevTools Çıktıları](#konsol--devtools-çıktıları)
10. [Proje Klasör Yapısı](#proje-klasör-yapısı)
11. [Sonuç](#sonuç)

---

# 🎯 Projenin Amacı

Bu ödevde amaç:

- React Navigation ile ekranlar arası geçiş yapmak  
- Login / Register form yapısını oluşturmak  
- Register ekranında **şifre tekrar kontrolü yapmak**  
- API’den veri çekip Home ekranında listelemek  
- DevTools üzerinden gerekli logları görmek  

Hedeflenen uygulama PDF yönergesi ile birebir uyumludur.

---

# 🧩 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|----------|----------|
| React Native v0.82 | Mobil uygulama geliştirme |
| @react-navigation/native | Navigation container |
| @react-navigation/native-stack | Stack navigator |
| react-native-screens | Navigation performansı |
| react-native-safe-area-context | Güvenli alan yönetimi |
| iOS Simulator | Test ortamı |

---

# 🚀 Kurulum

### 1. Bağımlılıkların yüklenmesi
```bash
npm install
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

cd ios
pod install
cd ..

npx react-native run-ios


<img width="1470" height="956" alt="LOGİN EKRANI" src="https://github.com/user-attachments/assets/2478ce43-ee62-41a3-8421-9147b3cdc1f9" />

<img width="1470" height="956" alt="REGİSTER EKRANI" src="https://github.com/user-attachments/assets/1f06a84c-1cdb-47b9-a9e2-0dc5e80a3343" />

<img width="1470" height="956" alt="ŞİFRELER UYUŞMUYOR" src="https://github.com/user-attachments/assets/18c6527c-a43e-464e-8ef5-15d4b84c6e25" />

<img width="1470" height="956" alt="Ekran Resmi 2025-12-05 01 26 45" src="https://github.com/user-attachments/assets/d4daac77-9754-4e7c-9bcc-e0ae129817f0" />

<img width="1470" height="956" alt="LOGİN VE HOMESCREEN KONSOL ÇIKTISI" src="https://github.com/user-attachments/assets/8c0a61b2-c40e-4514-86f2-aed32407cff7" />



### App.tsx (Navigation Yapısı)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

### LOGİNSCREEN
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from './CustomInput';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    console.log('Login values:', { email, password });
    navigation.navigate('Home');
  };

  const onRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <CustomInput placeholder="E-posta" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Giriş Yap" onPress={onLoginPress} />
      <Button title="Kayıt Ol" onPress={onRegisterPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});

export default LoginScreen;


### REGİSTERSCREEN
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
      <CustomInput placeholder="E-posta" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomInput placeholder="Şifre Tekrar" value={passwordAgain} onChangeText={setPasswordAgain} secureTextEntry />

      <Button title="Kayıt Ol" onPress={onRegisterPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
});

export default RegisterScreen;


###HomeScreen – API + FlatList
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      console.log('Posts:', data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  postItem: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
});

export default HomeScreen;


### Konsol / DevTools Çıktıları
Login values: { email: 'betultest.com', password: '123456' }

### Posts logu: Posts: (100) [...]
<img width="1470" height="956" alt="LOGİN VE HOMESCREEN KONSOL ÇIKTISI" src="https://github.com/user-attachments/assets/4ec62272-e15a-4e6b-a804-78dbb0f3d1df" />


KampusPost
│── App.tsx
│── package.json
│── index.js
│── tsconfig.json
│── /components
│     ├── LoginScreen.tsx
│     ├── RegisterScreen.tsx
│     ├── HomeScreen.tsx
│     └── CustomInput.tsx
