import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import { useFetchs, useForm } from "../hooks";
import Loading from '../components/Loading';
import { darkTheme, lightTheme } from '../constants/theme';

const saveToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

function LoginScreen({ navigation }) {
  const mode = useColorScheme();
  const theme = mode === "light" ? lightTheme : darkTheme;

  const { email, password, onInputChanged, onResetForm } = useForm({
    // TODO: Remove this default values
    email: "echeverriadev@gmail.com",
    password: "123",
  });
  const { data, isLoading, error, fetchData } = useFetchs();


  const handleSubmit = async() => {
    const url = `${process.env.API_URL}/auth/login`;
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    await fetchData(url, options);
  }

  useEffect(() => {
    if (!isLoading && !error && data) {
      onResetForm();
      saveToken(data.token);
      navigation.navigate('Dashboard');
    }
  }, [isLoading, error, data]);

  if (isLoading) {
    return <Loading />;
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      justifyContent: "center",
      padding: 10,
      width: "100%",
      marginVertical: 5,
    },
    buttonText: {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    container: {
      alignItems: "center",
      backgroundColor: theme.colors.backgroundFilter,
      flex: 1,
      justifyContent: "center",
      padding: 15,
    },
    formContainer: {
      marginBottom: 30,
      width: "100%",
    },
    input: {
      backgroundColor: theme.colors.third,
      height: 40,
      color: theme.colors.dark,
      borderColor: theme.colors.dark,
      borderRadius: 10,
      borderWidth: 1,
      marginVertical: 5,
      paddingHorizontal: 10,
      width: "100%",
    },
    title: {
      color: theme.colors.dark,
      fontWeight: "bold",
      fontSize: 25,
      marginBottom: 25,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIENVENIDO A GYM TRACK!</Text>
      <View style={styles.formContainer}>
        <TextInput
          required
          placeholder="Ingrese su usuario"
          value={email}
          onChangeText={(email) => onInputChanged("email", email.toLowerCase())}
          style={styles.input}
        />
        <TextInput
          required
          placeholder="Ingrese su contraseña"
          value={password}
          onChangeText={(password) => onInputChanged("password", password)}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        disabled={isLoading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
