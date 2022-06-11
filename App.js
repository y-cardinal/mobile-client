import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { isUri } from 'valid-url';

const LANG_RED          = 'Rojo'
const LANG_BLUE         = 'Azul'
const LANG_CONNECT      = 'Conectar'
const LANG_DISCONNECTED = 'Desconectado'
const LANG_CONNECTING   = 'Conectando'
const LANG_CONNECTED    = 'Conectado'
const LANG_ERROR        = 'Error'
const LANG_WAITING      = 'Esperando'
const LANG_INCORRECTURL = 'URL incorrecta'
const LANG_HOME         = 'Inicio'
const LANG_WSURL        = 'Web socket URL'

const WIDTH  = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282828FF',
    },
    button:
    {
        borderWidth: 0,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        width: WIDTH * 0.8,
        height: HEIGHT * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbox:
    {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFFFFFFF',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        width: WIDTH * 0.8,
        height: HEIGHT * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    text:
    {
        color: '#FFFFFFFF',
    }
})

const DEFAULT_TEAM = <View style={styles.textbox}>
        <Text style={styles.text}>{`${LANG_WAITING} ...`}</Text>
    </View>

let _onChangeTeam = null
let _onChangeDisabled = null
let socket = null

function changeTeam(team)
{
    if(_onChangeTeam === null)
        return

    switch(team)
    {
        case -1:
            _onChangeTeam(DEFAULT_TEAM)
            break

        case 0:
            _onChangeTeam(
                <View style={styles.textbox}>
                    <Text style={{color: '#D2292DFF'}}>{LANG_RED}</Text>
                </View>)
            break

        case 1:
            _onChangeTeam(
                <View style={styles.textbox}>
                    <Text style={{color: '#1761B0FF'}}>{LANG_BLUE}</Text>
                </View>)
            break
    }
}

function Home()
{
    const [team, onChangeTeam] = useState(DEFAULT_TEAM)
    const [disabled, onChangeDisabled] = useState(true)

    _onChangeTeam = onChangeTeam
    _onChangeDisabled = onChangeDisabled

    function onPressButton(team)
    {
        _onChangeDisabled(true)

        changeTeam(team)

        if(socket !== null && socket.readyState === 1)
            socket.send(`${team}`)
    }

    return <View style={styles.container}>
        {team}
        <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={() => onPressButton(0)}>
            <View style={[styles.button, {backgroundColor: '#D2292DFF'}]}>
                <Text style={styles.text}>{LANG_RED}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={() => onPressButton(1)}>
            <View style={[styles.button, {backgroundColor: '#1761B0FF'}]}>
                <Text style={styles.text}>{LANG_BLUE}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

function Connect()
{
    const [url, onChangeURL] = useState(null)
    const [status, onChangeStatus] = useState(LANG_DISCONNECTED)

    function onConnect()
    {
        if(isUri(url) === undefined)
        {
            onChangeStatus(LANG_INCORRECTURL)
            return
        }

        if(socket !== null)
        {
            socket.close()
            socket = null
        }

        socket = new WebSocket(url)

        socket.addEventListener('open', function()
        {
            socket.send('c') // c = client
            onChangeStatus(LANG_CONNECTED)
        })

        socket.addEventListener('close', function()
        {
            socket = null
            onChangeStatus(LANG_DISCONNECTED)
        })

        socket.addEventListener('message', function(event)
        {
            const msg = event.data

            switch(msg)
            {
                case 'ai': // ai = allow input
                    if(_onChangeDisabled !== null)
                        _onChangeDisabled(false)

                    changeTeam(-1)

                    break
            }
        })

        socket.addEventListener('error', function()
        {
            onChangeStatus(LANG_ERROR)
            socket = null
        })

        onChangeStatus(`${LANG_CONNECTING} ...`)
    }

    return <View style={styles.container}>
        <View style={styles.textbox}>
            <Text style={styles.text}>{status}</Text>
        </View>
        <TextInput
            autoCapitalize='none'
            style={[styles.textbox, styles.text]}
            placeholder={LANG_WSURL}
            onChangeText={onChangeURL}
            value={url}
            autoCorrect={false}
            placeholderTextColor='#FFFFFFFF'/>
        <TouchableOpacity activeOpacity={0.6} onPress={onConnect}>
            <View style={[styles.button, {backgroundColor: '#FFC107FF'}]}>
                <Text style={styles.text}>{LANG_CONNECT}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

const Drawer = createDrawerNavigator()

export default function App()
{
    return <NavigationContainer theme={DarkTheme}>
        <Drawer.Navigator initialRouteName={LANG_HOME}>
            <Drawer.Screen name={LANG_HOME} component={Home}/>
            <Drawer.Screen name={LANG_CONNECT} component={Connect}/>
        </Drawer.Navigator>
    </NavigationContainer>
}