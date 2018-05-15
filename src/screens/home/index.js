import React, { Component } from "react"
import { ImageBackground, View, StatusBar, Image, AsyncStorage, YellowBox } from "react-native"
import { Body, Left, Right,  Header, Container, Icon, Title, Button, H3, Text, Toast } from "native-base"
import { Google } from "expo"
import _ from "lodash"
import * as firebase from "firebase"
import styles from "./styles"

const launchScreenBg = require("../../../assets/launchScreen-bg.png")
const launchScreenLogo = require("../../../assets/logo-kitchen-sink.png")
const config = {
    apiKey: "AIzaSyBNDrBswTJ0ed30-a5xBBaZ8alp1gq-788",
    authDomain: "ecl-voice.firebaseapp.com",
    databaseURL: "https://ecl-voice.firebaseio.com",
    projectId: "ecl-voice",
    storageBucket: "ecl-voice.appspot.com",
    messagingSenderId: "741647084768"
}
firebase.initializeApp(config)

YellowBox.ignoreWarnings(["Setting a timer"])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message)
  }
}

class Home extends Component {
    constructor() {
        super()
        this.state = {
            login: false,
            uid: "unknown",
            username: ""
        }
    }

    async componentWillMount() {
        let uid = await AsyncStorage.getItem("@uid")
        let username = await AsyncStorage.getItem("@username")
        if (uid) {
            firebase.database().ref(`user/${uid}`).once("value").then(snapshot => {
                this.setState({login: true, uid: snapshot.val().uid, username: username})
                console.log(`User: ${this.state.uid}`)
            })
        }
    }

    async loginGoogle() {
        try {
            const result = await Google.logInAsync({
                behavior: "web",
                androidClientId: "741647084768-resif7alkjh2fc7obr7d0mf7hms959lh.apps.googleusercontent.com",
                androidStandaloneAppClientId: "741647084768-hr8tdvgtvchgmuifs3a52mq14ilt8bqq.apps.googleusercontent.com",
                webClientId : "741647084768-af93j6rcqaoudpgjipmiiscarqq20g83.apps.googleusercontent.com"
            })
            console.log(result)
            if (result.type === "success") {
                await AsyncStorage.setItem("@uid", result.user.id)
                await AsyncStorage.setItem("@username", result.user.name)
                const credential = firebase.auth.GoogleAuthProvider.credential( result.idToken, result.accessToken);
                firebase.auth().signInWithCredential(credential)
                .then(user => { /*console.log(user)*/ })
                .catch(err => { console.log(err) })

                firebase.database().ref(`user/${result.user.id}`).set({
                    uid: result.user.id,
                    email: result.user.email,
                    familyName: result.user.familyName,
                    givenName: result.user.givenName,
                    name: result.user.name,
                    avatar: result.user.photoUrl
                }).catch(err => {
                    console.log("寫入使用者資訊錯誤", err);
                })
                this.setState({login: true, uid: result.user.id})

                Toast.show({
                    text: "Successfully login",
                    buttonText: "Ok",
                    type: "success",
                    duration: 3000
                })
            }
        } catch (err) {
            console.log("loginError", err)
        }
    }

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
                <View style={{ alignItems: "center", backgroundColor: "transparent" }}>
                    <H3 style={styles.text}>Voice Conversion</H3>
                    <View style={{ marginTop: 8 }} />
                    <H3 style={styles.text}>Demo App for ECL Project</H3>
                    <View style={{ marginTop: 8 }} />
                </View>
                <View style={{ marginBottom: 60 }}>
                    <Button large iconLeft style={[styles.googleLogin, styles.mainBtn]}
                        onPress={() => this.loginGoogle()}
                    >
                        <Image source={require("../../../assets/google-logo.png")} style={{ height:35,  width: 35, marginLeft: 10, marginRight: 5 }}/>
                        <Text style={styles.googleLoginText} uppercase={false}>{this.state.login ? `歡迎，${this.state.username}` : "Sign in with Google"}</Text>
                    </Button>
                    <Button large iconLeft disabled={!this.state.login} style={[styles.mainBtn, this.state.login ? { backgroundColor: "#4CAF50"} : {}]}
                        onPress={() => this.props.navigation.navigate("VoiceAdd")}
                    >
                        <Icon type="MaterialIcons" name="add" />
                        <Text style={{ fontSize: 18}}>新增聲源</Text>
                    </Button>
                    <Button large iconLeft disabled={!this.state.login} style={[styles.mainBtn, this.state.login ? { backgroundColor: "#2196F3"} : {}]}
                        onPress={() => this.props.navigation.navigate("VoiceList")}
                    >
                        <Icon type="MaterialIcons" name="record-voice-over" />
                        <Text style={{ fontSize: 18}}>開始使用</Text>
                    </Button>
                </View>
                </ImageBackground>
            </Container>
        )
    }
}

export default Home
