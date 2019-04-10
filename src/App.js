import React from "react"
import { Root } from "native-base"
import { StackNavigator, DrawerNavigator } from "react-navigation"

import Home from "./screens/home"
import SideBar from "./screens/sidebar"
import convert from "./screens/convert"
import voiceList from "./screens/voiceList"
import voiceAdd from "./screens/voiceAdd"
import voiceRecord from "./screens/voiceRecord"
import kp from "./screens/kp"
import kp2 from "./screens/kp2"
import kp3 from "./screens/kp3"
import kp4 from "./screens/kp4"
import yei from "./screens/yei"
import note from "./screens/note"

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
    Kp: {screen: kp},
    Kp2: {screen: kp2},
    Kp3: {screen: kp3},
    Kp4: {screen: kp4},
    Yei: {screen: yei},
    Note: {screen: note}
  }, {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
)

export default () =>
  <Root>
    <AppNavigator />
  </Root>
