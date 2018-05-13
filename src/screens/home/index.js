import React, { Component } from "react"
import { ImageBackground, View, StatusBar } from "react-native"
import { Body, Left, Right,  Header, Container, Icon, Title, Button, H3, Text } from "native-base"

import styles from "./styles"

const launchScreenBg = require("../../../assets/launchScreen-bg.png")
const launchScreenLogo = require("../../../assets/logo-kitchen-sink.png")

class Home extends Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#221449", elevation: 0 }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title />
          </Body>
          <Right />
        </Header>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchScreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchScreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>Voice Conversion</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>Demo App for ECL Project</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center"}}
              onPress={() => this.props.navigation.navigate("VoiceList")}
            >
              <Text style={{ fontSize: 16}}>立刻開始</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    )
  }
}

export default Home
