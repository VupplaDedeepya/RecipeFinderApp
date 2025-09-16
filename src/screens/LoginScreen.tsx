import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types/navigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/userStore';
import { loginUser } from '../redux/reducers/userSlice';
import Toast from 'react-native-toast-message';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

const handleLogin = () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password.');
    return;
  }

  const userExists = users.find((u) => u.email === email && u.password === password);

  if (userExists) {
    dispatch(loginUser({ email, password })); // ✅ send correct payload
    // no need for navigation.navigate("MainTabs")
    // token change will automatically update AppNavigator
  } else {
    Toast.show({
      type: 'error',
      text1: 'Invalid User',
      text2: 'You are not a valid user, please sign in.',
    });
  }
};


  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a11cb" />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png' }}
          style={styles.logo}
        />
        <Text style={styles.appName}>Welcome Back!</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  appName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#2575fc',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
  signupLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
