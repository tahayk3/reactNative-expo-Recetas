import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

import Animated, {FadeInDown} from 'react-native-reanimated';

//Metodo para listar categorias, de manera horizontal
function Categorias({categories, activeCategory, handleChangeCategory}){
    return(
        <Animated.View entering={FadeInDown.duration(5000)}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
            contentContainerStyle={{paddingHorizontal:15}}
            >
            {categories.map((cat, index)=>{
                let isActive = cat.strCategory == activeCategory;
                let activeButtonClass = isActive ? ' bg-amber-400': ' bg-black/10';
                return(
                    <TouchableOpacity
                    key={index}
                    onPress={()=>handleChangeCategory(cat.strCategory)}
                    className="flex items-center space-y-1"
                    >
                        <View className={"rounded=full p-[6px]" +activeButtonClass}>
                            <Image
                                source={{uri: cat.strCategoryThumb}}
                                style={{width: hp(6), height: hp(6)}}
                                className="rounded-full"
                            />

                            <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                                {cat.strCategory}
                            </Text>
                        </View>

                    </TouchableOpacity>
                )
            })}
            </ScrollView>
        </Animated.View>
    )
}

export default Categorias;