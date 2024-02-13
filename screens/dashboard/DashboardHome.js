import { decode as atob } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import BodyMetrics from '../../components/dashboar/BodyMetrics';

if (!global.atob) {
  global.atob = atob;
}

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

function DashboardHome({ navigation }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  useEffect(() => {
    getToken().then(token => {
      if (!token) {
        navigation.popToTop();
      }
      setToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
    });
  }, []);

  const goToBodyMetrics = () => {
    navigation.navigate('BodyMetrics', { userId: user.id, token });
  };

  const Logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user.firstName}</Text>
      <BodyMetrics onPress={goToBodyMetrics}/>
      <Text>AQUI IRA LA SECCION DE RUTINAS PROXIMAMENTE</Text>
      <Button title="Cerrar sesión" onPress={Logout}/>
    </View>
  )
}

export default DashboardHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 5,
  }
});