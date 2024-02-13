import { ImageBackground, TouchableOpacity, View, Text, useColorScheme } from "react-native"
import { StyleSheet } from "react-native"
import { lightTheme, darkTheme } from '../constants/theme';

function HomeScreen({ navigation }) {
  const mode = useColorScheme();
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    buttonText: {
      color: theme.colors.dark,
      fontSize: 20,
      padding: 20,
    },
    container: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundFilter,
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.dark,
      fontFamily: 'Verdana',
      fontSize: 45,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/portrait.jpg')} resizeMode="cover" style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>GYM TRACK!</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default HomeScreen;