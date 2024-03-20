import okeyTitles from '../../App';
import { Button, View, StyleSheet, Text } from 'react-native';


const Groups = (props) => { 
        console.log(props.okt)

    for ( const [key, value] of Object.entries(props.okt)){
        console.log("okt value:", value)
    }

    
    return (
        <View>
            <Text>
                
            </Text>
        </View>
    )
}

export default Groups;