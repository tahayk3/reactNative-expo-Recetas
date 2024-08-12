import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categorias from "../components/categories";

import axios from "axios";
import Recipes from "../components/recipes";

function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  //useEffect para cargar los datos la primera vez que se montan los componentes
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  //metodo para modificar las recetas en base a la seleccion del usuario(categorias)
  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  //Metodo para consumir api por medio de axios, llama a las categorias y guarda la data en constantes de estado
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      //console.log("obteniendo categoria: ", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  //Metodo para consumir api por medio de axios, llama a las recetas y guarda la data en constantes de estado
  const getRecipes = async (category="Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      console.log("obteniendo recetas por categoria: ", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  return (
    <View className="flex-1 bg-whte">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* area de usuario y notificaciones */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/user.png")}
            style={{ height: hp(4), width: hp(4.5) }}
          />
          <BellIcon size={hp(4)} color="orange" />
        </View>

        {/* textos */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hola, Constantine!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Prepara tu propia comida,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            estando en <Text className="text-amber-400">casa</Text>
          </Text>
        </View>

        {/* Barra de busqueda */}
        <View className="mx-4  flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Busca recetas"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categorias */}
        <View>
          {categories.length > 0 && (
            <Categorias
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Llamada al componente para mostrar imagenes */}
        <View>
          <Recipes meals={meals} categories={categories}></Recipes>
        </View>
        
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
