import React, { useEffect, useState } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

//Componente para guardar en cache las imagenes, para ahorrar solicitudes a la api
const CachedImage = ({ uri, style, ...props }) => {
    //constantes de estado, guardan la url de la imagen y el otro detecta si se esta cargando la imagen
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(true);

    //useEffect que vuelve a guardar en cache la imagen, en el caso de que cambie la url 
    useEffect(() => {
        let isMounted = true;

        //Metodo asincrono para obtener la imagen
        const cacheImage = async () => {
            try {
                // Generar un hash basado en la URI para obtener un nombre de archivo seguro
                const fileHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, uri);
                const fileUri = `${FileSystem.cacheDirectory}${fileHash}.jpg`;

                // Verificar si la imagen ya existe en la caché
                const fileInfo = await FileSystem.getInfoAsync(fileUri);

                if (fileInfo.exists) {
                    console.log('Imagen encontrada en la caché:', fileUri);
                    if (isMounted) setImageUri(fileUri);
                } else {
                    console.log('Imagen no encontrada en la caché, descargando:', uri);
                    // Descargar la imagen y guardarla en la caché
                    const response = await fetch(uri);
                    const blob = await response.blob();
                    const base64 = await blobToBase64(blob);
                    await FileSystem.writeAsStringAsync(fileUri, base64, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    console.log('Imagen descargada y guardada en la caché:', fileUri);
                    if (isMounted) setImageUri(fileUri);
                }
            } catch (error) {
                console.error('Error caching image: ', error);
                if (isMounted) setImageUri(uri);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        //Ejecucion de funcion asincrona
        cacheImage();

        //cambio de estado, imagen cargada
        return () => {
            isMounted = false;
        };
    }, [uri]);

    //el cargarase la imagen, loading==true, se muestra la imagen y se quita el componente que muestra una carga 
    if (loading) {
        return (
            <View style={[style, styles.loadingContainer]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Image source={{ uri: imageUri }} style={style} {...props} />;
};

//Metodo para pasar de blob a base64
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

//objeto de estilos
const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CachedImage;