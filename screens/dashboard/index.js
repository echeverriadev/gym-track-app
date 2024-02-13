import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardHome from './DashboardHome';
import BodyMetricsScreen from './BodyMetricsScreen';

const Tab = createBottomTabNavigator();
function DashboardScreen() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="DashboardHome" component={DashboardHome}/>
      <Tab.Screen name="BodyMetrics" component={BodyMetricsScreen} options={{title: 'Mis mediciones'}}/>
    </Tab.Navigator>
  )
}

export default DashboardScreen;
