import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useFetchs } from '../../hooks';
import Loading from '../../components/Loading';

function BodyMetricsScreen({ route, navigation }) {
  const [ metrics, setMetrics ] = useState([]);
  const { data, isLoading, fetchData } = useFetchs();
  const { userId, token } = route.params;

  useEffect(() => {
    getBodyMetrics();
  }, []);

  useEffect(() => {
    if (data) {
      setMetrics(data);
    }
  }, [data]);

  const getBodyMetrics = async () => {
    const url = `${process.env.API_URL}/metrics/${userId}`;
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    };
    await fetchData(url, options);
  };

  if (isLoading || !metrics.length) {
    return <Loading />;
  }

  const { weight, bmi } = metrics.at(-1);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.metricItem}>
          <Text>PESO:</Text>
          <Text>{weight} Kg</Text>
        </View>
        <View style={styles.metricItem}>
          <Text>IMC:</Text>
          <Text>{bmi}</Text>
        </View>
      </ScrollView>
      <View style={styles.actionsGroup}>
        <Button title="Hacer nuevo registro" />
        <Button title="Volver" onPress={() => navigation.goBack()}/>
      </View>
    </View>
  );
}

export default BodyMetricsScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between'
  },
  actionsGroup: {
    height: 80,
    justifyContent: 'space-between'
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: 'gray',
    padding: 15,
  }
});
