import { View, Text, StyleSheet, Platform, Pressable, useColorScheme } from 'react-native'
import { lightTheme, darkTheme} from '../../constants/theme';

function PressBodyMetrics(props) {
  const mode = useColorScheme();
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      elevation: 5,
      shadowColor: theme.colors.secondary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      height: 105,
      width: '100%',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    button: {
      flex: 1,
    },
    buttonPressed: {
      opacity: 0.5,
    },
    innerContainer: {
      backgroundColor: theme.colors.light,
      borderRadius: 10,
      padding: 15,
      flex: 1,
    },
    title: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 18,
    }
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress} android_ripple={{color: '#ccc'}} style={({pressed}) => [styles.button, pressed? styles.buttonPressed : null]}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Tus pesajes</Text>
          <Text>Presiona aquí y registra tu peso y medidas para que puedas seguir tu progreso</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default PressBodyMetrics
