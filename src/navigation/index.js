import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailsScreen';

//Creando una instancia del Stack Navigator. Stack es un objeto que contiene métodos para configurar la navegación entre las pantallas.
const Stack= createNativeStackNavigator();

//AppNavigation encapsula toda la configuración de la navegación
function AppNavigation(){
    return(
        //NavigationContainer, envuelve el navegador 
        <NavigationContainer>
            {/* Stack.Navigator contenedor de pantallas/rutas */}
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                {/* Stack.Screen Define una pantalla en el Stack Navigator */}
                <Stack.Screen name ="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;