import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import lang from './src/Lang.json'
import { Home } from './src/Home'
import { Connect } from './src/Connect'

const Drawer = createDrawerNavigator()

export default function App()
{
    return <NavigationContainer theme={DarkTheme}>
        <Drawer.Navigator initialRouteName={lang.Home}>
            <Drawer.Screen name={lang.Home} component={Home}/>
            <Drawer.Screen name={lang.Connect} component={Connect}/>
        </Drawer.Navigator>
    </NavigationContainer>
}