import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

//Metodo para mostrar un "estado de carga" en lo que llegan los datos de la api 
function Loading(props){
    return(
        <View className="flex-1 flex justify-center items-center">
            <ActivityIndicator {...props} />
        </View>
    )
}

export default Loading;