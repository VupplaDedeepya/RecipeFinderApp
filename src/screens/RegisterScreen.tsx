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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/navigationTypes';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/reducers/userSlice';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    dispatch(registerUser({ fullName, email, password }));
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login');
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
        <Text style={styles.appName}>Create an Account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ddd"
          value={fullName}
          onChangeText={setFullName}
        />

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

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
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
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: {
    color: '#2575fc',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
