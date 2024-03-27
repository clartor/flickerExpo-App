import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import titles from '../../assets/data/titles'

const MatchedTitles = () => {
  return (
    <SafeAreaView style={styles.root}>
        <View style={styles.container}>
            <Text>
                Your saved Titles
            </Text>
            <View style={styles.matched}>
                {titles.map(title => (
                    <View key={title.id}>
                        <Text style={styles.movieTitle}> {title.name} </Text>
                    </View>
                ))}
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1
    },
    container: {
        padding: 20
    },
    matched: {
        width: '200px',
        // height: '200px',
    },
    movieTitle: {
        margin: 10,
        fontWeight:'400'

    }
})

export default MatchedTitles