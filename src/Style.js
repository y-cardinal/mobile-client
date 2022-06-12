import { StyleSheet, Dimensions } from "react-native";

const WINDOW_DIMENSIONS = Dimensions.get('window')
const WINDOW_WIDTH = WINDOW_DIMENSIONS.width
const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height
const BLACK_HEX = '#282828FF'
const WHITE_HEX = '#FFFFFFFF'

const Styles = StyleSheet.create(
{
    container:
    {
        flex:               1,
        alignItems:         'center',
        justifyContent:     'center',
        textAlign:          'center',
        backgroundColor:    BLACK_HEX,
    },
    button:
    {
        alignItems:         'center',
        justifyContent:     'center',
        textAlign:          'center',
        borderWidth:        0,
        borderRadius:       8,
        padding:            10,
        margin:             10,
        width:              WINDOW_WIDTH  * 0.8,
        height:             WINDOW_HEIGHT * 0.1,
        backgroundColor:    '#FFC107FF',
    },
    textBox:
    {
        alignItems:         'center',
        justifyContent:     'center',
        textAlign:          'center',
        backgroundColor:    BLACK_HEX,
        borderStyle:        'solid',
        borderWidth:        1,
        borderColor:        WHITE_HEX,
        borderRadius:       8,
        padding:            10,
        margin:             10,
        width:              WINDOW_WIDTH  * 0.8,
        height:             WINDOW_HEIGHT * 0.1,
    },
    text:
    {
        textAlign:          'center',
        color:               WHITE_HEX,
    },
    textButton:
    {
        textAlign:          'center',
        color:               BLACK_HEX,
    }
})

export { WINDOW_DIMENSIONS, WINDOW_WIDTH, WINDOW_HEIGHT, BLACK_HEX, WHITE_HEX, Styles }