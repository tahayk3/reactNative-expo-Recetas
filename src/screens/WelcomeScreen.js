import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
    //Variables para realizar la animacion
    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();
    useEffect(()=>{
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=>ring1padding.value = withSpring(ring1padding.value+hp(3)),100);
        setTimeout(()=>ring2padding.value = withSpring(ring2padding.value+hp(3.5)),300);
        {/* Al finalizar la animacion, se redirecciona a la pantalla de Home */}
        setTimeout(()=> navigation.navigate('Home'), 3000);
    },[]);
  return (
    <View className="flex-1  justify-center items-center space-y-10 bg-amber-500">
    
        {/* Barrade estado */}
      <StatusBar style="light" />

        {/* imagen */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ring1padding}}>
          <Image
            source={require("../../assets/images/plate.png")}
            style={{ width: hp(30), height: hp(30) }}
          ></Image>
        </Animated.View>
      </Animated.View>

        {/* text */}
      <View className="flex items-center space-y-2">
        <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">
          Recetas
        </Text>
        <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">
          Platillos de todo el mundo
        </Text>
      </View>
    </View>
  );
}

export default WelcomeScreen;
