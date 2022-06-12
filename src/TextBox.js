import { Styles } from './Style'
import { View, Text } from 'react-native'

function TextBox(props)
{
    return <View style={Styles.textBox}>
        <Text style={{color: props.color}}>{props.text}</Text>
    </View>
}

export { TextBox }