import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import titles from '../../assets/data/titles'

const MatchedTitles = () => {
  return (
    <SafeAreaView style={styles.root}>
        <View style={styles.container}>
            <Text>
                Matched Titles
            </Text>
            <View style={styles.matched}>
                {titles.map(title => (
                    <View style={styles.title} key={title.id}>
                        <Text> {title.name}</Text>
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
    },
    matched: {
        width: '200px',
        height: '200px'
    },
    cover: {
        backgroundColor: 'green',
        width: '100px',
        height: '100px'
    }
})

export default MatchedTitles