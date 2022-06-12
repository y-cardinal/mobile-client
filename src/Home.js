import { useState } from 'react'
import { DEFAULT_TEAM_TEXTBOX, getTeamTextBox, TEAM_ID_RED, TEAM_ID_BLUE } from './Team'
import { socket, isConnected } from './Socket'
import { Styles } from './Style'
import { TouchableOpacity, Text, View } from 'react-native'
import lang from './Lang.json'

let _changeButtonDisabled = null
let _changeTeamTextBox = null

function Home()
{
    const [teamTextBox, changeTeamTextBox] = useState(DEFAULT_TEAM_TEXTBOX)
    const [buttonDisabled, changeButtonDisabled] = useState(true)

    _changeButtonDisabled = changeButtonDisabled
    _changeTeamTextBox = changeTeamTextBox

    function onPressButton(team)
    {
        changeButtonDisabled(true)
        changeTeamTextBox(getTeamTextBox(team))

        if(isConnected())
            socket.send(`${team}`)
    }

    return <View style={Styles.container}>
        {teamTextBox}
        <TouchableOpacity disabled={buttonDisabled} activeOpacity={0.6} onPress={() => onPressButton(TEAM_ID_RED)}>
            <View style={[Styles.button, {backgroundColor: '#D2292DFF'}]}>
                <Text style={Styles.text}>{lang.Red}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={buttonDisabled} activeOpacity={0.6} onPress={() => onPressButton(TEAM_ID_BLUE)}>
            <View style={[Styles.button, {backgroundColor: '#1761B0FF'}]}>
                <Text style={Styles.text}>{lang.Blue}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

export { Home, _changeButtonDisabled, _changeTeamTextBox }