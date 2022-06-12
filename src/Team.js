import { WHITE_HEX } from './Style'
import { TextBox } from './TextBox'
import lang from './Lang.json'

const DEFAULT_TEAM_TEXTBOX =
    <TextBox color={WHITE_HEX} text={`${lang.Waiting} ...`}/>

const RED_TEAM_TEXTBOX =
    <TextBox color='#D2292DFF' text={lang.Red}/>

const BLUE_TEAM_TEXTBOX =
    <TextBox color='#1761B0FF' text={lang.Blue}/>

const TEAM_ID_RED = 0
const TEAM_ID_BLUE = 1

function getTeamTextBox(team)
{
    switch(team)
    {
        case TEAM_ID_RED:
            return RED_TEAM_TEXTBOX
        
        case TEAM_ID_BLUE:
            return BLUE_TEAM_TEXTBOX

        default:
            return DEFAULT_TEAM_TEXTBOX
    }
}

export {
    DEFAULT_TEAM_TEXTBOX,
    RED_TEAM_TEXTBOX,
    BLUE_TEAM_TEXTBOX,
    TEAM_ID_RED,
    TEAM_ID_BLUE,
    getTeamTextBox
}