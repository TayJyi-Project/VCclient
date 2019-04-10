import React, { Component } from "react"
import { AsyncStorage } from "react-native"
import { Body, Right, Container, Header, Button, Icon, Content, Text, Title, Card, CardItem, View, Toast, ProgressBar } from "native-base"
import { Audio, FileSystem, Permissions } from "expo"
import styles from "./styles"

const serverUrl = "http://140.123.97.163:5001/"

class VoiceRecord extends Component {
    constructor() {
        super()
        this.loading = false
        this.state = {
            loading: false,
            playing: false,
            userId: new Date().getTime(),
            recorded: false,
            index: 1,
            sub: [
                "愛情走的太快 就像龍捲風",
                "不能承受 我已無處可躲",
                "我不能再想",
                "我不能再想我不",
                "我不 我不 我不要再想你",
                "誰影子那麼重拖在我腳步後頭",
                "走不到要去的快樂",
                "重複做一個夢懷疑時間凝固了",
                "把明天殺死了",
                "什麼都沒移動屋子的氣味變了"
            ],
            sound: [null, null, null, null, null, null, null, null, null,null]
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

    _onRecordStatusUpdate = status => {
        if (!status.canRecord) {
            if (status.error) {
                console.log(`Encountered a fatal error during playback: ${status.error}`)
            }
        } else {
            this.setState({playing: status.isPlaying})
        }
    }

    async createUID() {
        //let uid = uuid()
        await AsyncStorage.setItem("@uid", "lu")
        this.state.userId = await AsyncStorage.getItem("@uid")
        console.log(this.state.userId)
    }

    async componentWillMount() {
        try {
            this.state.userId = await AsyncStorage.getItem("@uid")
            console.log(this.state.userId)
        } catch (err) {
            await this.createUID()
        }

        if (this.state.userId === null) {
            await this.createUID()
        }
    }

    async componentDidMount() {
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY))
        this.recordingSettings.android.extension = ".wav"
        this.recordingSettings.android.numberOfChannels = 1
        //console.log(this.recordingSettings)
        try {
            await this.getPermission()
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
        await this.setupSound()
        await this.playSound()
    }

    async getPermission() {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        if (status === "granted") {
            /* do nothing here */
            Toast.show({
                text: `userID: ${this.state.userId}`,
                buttonText: "Ok",
                textStyle: { color: "yellow" },
                duration: 10000
            })
        } else {
            Toast.show({
                text: "Record Permission not granted",
                buttonText: "Ok",
                duration: 1500,
                type: "danger"
            })
        }
    }

    async setupSound() {
        if (!this.soundObject) {
            this.soundObject = new Audio.Sound()
            this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate)
        }
        try {
            await this.soundObject.unloadAsync();
            await this.soundObject.loadAsync(this.state.sound[this.state.index - 1])
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
            //await this.soundObject.unloadAsync();
        } catch (err) {
            console.log("playSound", err)
        }
    }

    async playHistory() {
        if (this.history) {
            await this.history.setPositionAsync(0)
            await this.history.playAsync()
        } else {
            console.log("Can't find history")
            Toast.show({
                text: "尚未錄音",
                buttonText: "Ok",
                duration: 1500,
                type: "warning"
            })
        }
    }

    async record() {
        try {
            const recording = new Audio.Recording()
            await recording.prepareToRecordAsync(this.recordingSettings)
            //recording.setOnRecordingStatusUpdate(this._onRecordStatusUpdate)
            this.recording = recording
            await this.recording.startAsync();
            this.setState({loading: true})
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

    async stopRecord() {
        this.setState({loading: false, recorded: true})
        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
        //console.log("s", await this.recording.getStatusAsync())
        const info = await FileSystem.getInfoAsync(this.recording.getURI())
        console.log(`FILE INFO: ${JSON.stringify(info)}`)
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        })
        const { sound, status } = await this.recording.createNewLoadedSound({ isLooping: false })
        this.history = sound
        await this.playHistory()
    }

    async nextItem() {
        if (!this.state.recorded) { return }
        await this.soundObject.stopAsync()
        Toast.show({
            text: "上傳中",
            buttonText: "Ok",
            duration: 1500
        })
        //await this.uploadAudioAsync(this.recording.getURI())
        await this.uploadRecord(this.recording.getURI())
        this.history = null
        this.setState({recorded: false})
        Toast.show({
            text: this.state.index === this.state.sub.length ? `${this.state.userId}錄製完成` : "儲存成功",
            buttonText: "Ok",
            duration: 1500,
            type: "success"
        })
        //if (this.state.index === this.state.sub.length) {
        if (this.state.index === 3) {
            let result = JSON.parse(await AsyncStorage.getItem("@preBuild"))
            result[0].recorded = true
            result[0].trained = true
            await AsyncStorage.setItem("@preBuild", JSON.stringify(result))
            this.props.navigation.navigate("VoiceList")
        } else {
            this.setState({index: this.state.index + 1})
            await this.setupSound()
            await this.playSound()
        }
    }

    /*
    async uploadAudioAsync(uri) {
        const response = await fetch(uri)
        const blob = await response.blob()
        const ref = firebase.storage().ref().child(`${this.state.userId}/${this.state.index}.wav`)

        const snapshot = await ref.put(blob, { contentType: "audio/wav" })
        console.log(snapshot.downloadURL)
    }
    */

    async uploadRecord(uri) {
        const url = `${serverUrl}/upload`
        const data = new FormData()
        let metadata = {
            part_content_type: "audio/wav;rate=22050"
        }
        data.append("metadata", JSON.stringify(metadata))
        data.append("uid", this.state.userId)
        data.append("tid", "yei")
        data.append("fid", this.state.index)
        data.append("file", {
            uri: uri,
            type: "audio/wav",
            name: `${this.state.index}.wav`
        })
        fetch(url, { method: "post", body: data }).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Title>Recording</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card transparent style={{ marginTop: 10, paddingBottom: 10 }}>
                        <CardItem header>
                            <Text style={{ width: "100%", textAlign: "center", fontSize: 20}}>錄製聲音來源</Text>
                        </CardItem>
                        <CardItem style={{ paddingBottom: 7 }}>
                            <Text style={{ width: "100%", textAlign: "center" }}>
                                <Text style={{fontSize: 30, color: "purple" }}>{this.state.index}</Text>
                                / {this.state.sub.length}
                            </Text>
                        </CardItem>
                        <ProgressBar
                            defaultProps={{height: 10}}
                            styleAttr="Horizontal"
                            style={{width: "60%", marginLeft: "20%"}}
                            indeterminate={false}
                            progress={this.state.index / this.state.sub.length}
                        />
                    </Card>
                    <Card transparent>
                        <CardItem>
                            <Body>
                                <Button rounded icon
                                    style={{ backgroundColor:"#2196f3", marginTop: 5, marginBottom: 10,  marginLeft: "50%", left: -23 }}
                                    onPress={() => this.playSound()}
                                >
                                    <Icon type="MaterialCommunityIcons" name={this.state.playing ? "pause" : "play"} style={styles.icon} />
                                </Button>
                                <Text style={styles.centerText}>{this.state.sub[this.state.index - 1]}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card transparent>
                        <CardItem style={styles.greyBg}>
                            <Body>
                                {this.state.loading === false ?
                                    (<Button rounded icon style={styles.recordBtn} onPress={()=> this.record()}>
                                        <Icon type="MaterialCommunityIcons" name="microphone" style={styles.icon} />
                                    </Button>)
                                :
                                    (<Button rounded icon style={styles.recordBtn} onPress={()=> this.stopRecord()}>
                                        <Icon type="MaterialCommunityIcons" name="stop" style={styles.icon} />
                                    </Button>)
                                }
                            </Body>
                        </CardItem>
                        <CardItem style={{paddingTop: 0}}>
                            <Text style={styles.centerText}>※聆聽句子後，按照原語速進行錄音{"\n"}※字幕僅供參考，請依錄音中所聽見為準</Text>
                        </CardItem>
                        <CardItem style={{paddingTop: 0}}>
                            <Button small iconLeft bordered primary style={{ marginLeft: "50%", left: -48 }}
                                onPress={()=> this.playHistory()}
                            >
                                <Icon type="MaterialCommunityIcons" name="play" />
                                <Text>重放</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{ position: "absolute", width: "100%", bottom: 10, paddingLeft: 10, paddingRight: 10}}>
                    <Button full disabled={!this.state.recorded}
                        style={[{ width: "100%"}, this.state.recorded ? {backgroundColor: "#2196f3"} : {}]}
                        onPress={()=> this.nextItem()}>
                        <Text>{ this.state.index === this.state.sub.length ? "完成" : "下一個" }</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

export default VoiceRecord
