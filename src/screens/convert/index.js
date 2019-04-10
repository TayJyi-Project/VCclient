import React, { Component } from "react"
import { AsyncStorage } from "react-native"
import { Body, Left, Right, Container, Header, Button, Icon, View, Content, Text, Title, Card, CardItem, Toast } from "native-base"
//import RNFetchBlob from 'react-native-fetch-blob'
import { Audio } from "expo"
import styles from "./styles"

const serverUrl = "http://140.123.97.163:5001"

class convert extends Component {
    constructor() {
        super()
        this.state = {
            uid: "",
            loading: false,
            recording: false,
            item: {
                tid: null,
                trained: true,
                title: "海濤法師"
            }
        }
    }

    _onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`)
            }
        } else {
            this.setState({playing: playbackStatus.isPlaying})
        }
    }

    async componentWillMount() {
        try {
            let list = ["@preBuild", "@voiceList"]
            let type = JSON.parse(await AsyncStorage.getItem("@selectType"))
            let index = JSON.parse(await AsyncStorage.getItem("@selectIndex"))
            let result = JSON.parse(await AsyncStorage.getItem(list[type]))
            //console.log(type, index, result)
            this.state.item = result[index]
            this.state.uid = await AsyncStorage.getItem("@uid")
        } catch (err) {
            console.log("componentDidMount", err)
        }
        this.forceUpdate()
    }

    async componentDidMount() {
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY))
        this.recordingSettings.android.extension = ".wav"
        this.recordingSettings.android.numberOfChannels = 1
        //console.log(this.recordingSettings)
        try {
            Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            })
        } catch (err) {
            console.log("componentDidMount", err)
        }
    }

    async setupSound(uri) {
        if (!this.soundObject) {
            this.soundObject = new Audio.Sound()
            this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate)
        }
        try {
            await this.soundObject.unloadAsync();
            await this.soundObject.loadAsync(uri)
        } catch (err) {
            console.log("setupSound", err)
        }
    }

    async playSound() {
        try {
            if (!this.state.playing) {
                await this.soundObject.setPositionAsync(0)
                await this.soundObject.playAsync()
            } else {
                await this.soundObject.stopAsync()
            }
        } catch (err) {
            console.log("playSound", err)
        }
    }

    async toggleConvert() {
        if (!this.state.recording) {
            try {
                const recording = new Audio.Recording()
                await recording.prepareToRecordAsync(this.recordingSettings)
                this.record = recording
                await this.record.startAsync();
                this.setState({recording: true})
            } catch (err) {
                console.log("record", err)
                Toast.show({
                    text: "發生錯誤",
                    buttonText: "Ok",
                    duration: 1500,
                    type: "danger"
                })
            }
        }
        else {
            this.setState({loading: true})
            this.setState({recording: false})
            try {
                await this.record.stopAndUnloadAsync();
            } catch (error) {
                // Do nothing -- we are already unloaded
            }

            const uri = this.record.getURI()
            const data = new FormData()
            data.append("uid", this.state.uid)
            data.append("tid", this.state.item.tid)
            data.append("file", {
                uri: uri,
                type: "audio/wav",
                name: "convert.wav"
            })
            const response = await fetch(`${serverUrl}/convert`, { method: "post", body: data })
            const fileID = await response.text()
            console.log("fileID", fileID)

            await this.setupSound({uri: `${serverUrl}/download?filename=${fileID}`, overrideFileExtensionAndroid: true})
            await this.playSound()
            this.setState({loading: false})
        }
    }

    render() {
        return (
        <Container style={styles.container}>
            <Header>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Voice Convert</Title>
                </Body>
                <Right />
            </Header>

            <Content padder>
                <Body>
                    <Text style={[styles.centerText, { fontSize: 20, marginTop: 70, textDecorationLine: "underline" }]}> {this.state.item.title} </Text>
                    <Text style={[styles.centerText, { fontSize: 18, marginTop: 15, color: "grey" }]}>
                        { this.state.recording ? "錄音中" : this.state.loading ? "處理中，請稍後" : "準備就緒" }
                    </Text>
                </Body>
            </Content>
            <View style={{ position: "absolute", width: "100%", bottom: 10, paddingLeft: 10, paddingRight: 10}}>
                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginBottom: 30, marginLeft: 15, marginRight: 15 }} />
                <Button icon style={ [styles.recordBtn, this.state.recording ? styles.recordingBtnPress : {}] } onPressIn={() => this.toggleConvert()} onPressOut={()=> this.toggleConvert()}>
                    <Icon type="MaterialCommunityIcons" name={this.state.recording ? "stop" : "microphone"} style={styles.recordIcon} />
                </Button>

                <Button small iconLeft bordered primary style={{ marginTop: 15, marginLeft: "50%", marginBottom: 10, left: -48 }}
                    onPress={()=> this.playSound()}
                >
                    <Icon type="MaterialCommunityIcons" name="play" />
                    <Text>重放</Text>
                </Button>
            </View>
        </Container>
        )
    }
}

export default convert
