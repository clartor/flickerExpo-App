import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';


const Card = (props) => {
    const {name, image, year, director} = props.title;

    return (
        <View style={styles.filmcard}>
            <ImageBackground
                style={styles.image}
                source={{ uri: image }}>
                <View style={styles.cardInner}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.year}>
                        {year}
                    </Text>
                    <Text style={styles.director}>
                        {director}
                    </Text>
                </View>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    filmcard: {
        borderRadius: 10,
        shadowColor: "#00008B",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 8
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    cardInner: {
        padding: 10,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 35
    },
    year: {
        color: 'white',
        fontSize: 15
    },
    director: {
        color: 'white',
        fontSize: 20
    }
});


export default Card; 
