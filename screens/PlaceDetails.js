import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";


export function PlaceDetails({ route }) {
    const [fetchedPlace, setFetchedPlace] = useState()
    const navigation = useNavigation()

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        })

    }
    // console.log(route)
    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        //use selectedPlaceId to fetch data for a single place
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlace(place)
            navigation.setOptions({
                title: place.title
            })
        }

        loadPlaceData();
    }, [selectedPlaceId])

    // console.log(fetchedPlace)

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        )
    }

    return <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>
                    {fetchedPlace.address}
                </Text>
                <OutlinedButton icon='map' onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </View>
    </ScrollView>
}


const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
})