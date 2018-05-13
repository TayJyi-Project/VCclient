import React from "react"
import { Root } from "native-base"
import { StackNavigator, DrawerNavigator } from "react-navigation"

import Home from "./screens/home"
import SideBar from "./screens/sidebar"
import convert from "./screens/convert"
import voiceList from "./screens/voiceList"
import voiceAdd from "./screens/voiceAdd"
import voiceRecord from "./screens/voiceRecord"
import yei from "./screens/yei"

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home }
  }, {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
)

const AppNavigator = StackNavigator(
  {
    Convert: {screen: convert},
    Drawer: { screen: Drawer },
    VoiceList: {screen: voiceList},
    VoiceAdd: {screen: voiceAdd},
    VoiceRecord: {screen: voiceRecord},
    Yei: {screen: yei}
  }, {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
)

export default () =>
  <Root>
    <AppNavigator />
  </Root>
