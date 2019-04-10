import React, {  Component } from "react"
import { AsyncStorage } from "react-native"
import { View, Body, Left, Right, Container, Header, Button, Icon, Content, Text, Title, Card, CardItem, Toast } from "native-base"
import { Audio, FileSystem, Permissions } from "expo"
import ProgressBar from "ProgressBarAndroid"
import * as firebase from "firebase"
import styles from "./styles"

const serverUrl = "http://140.123.97.163:5001"
/*
const firebaseConfig = {
    apiKey: "AIzaSyBNDrBswTJ0ed30-a5xBBaZ8alp1gq-788",
    authDomain: "ecl-voice.firebaseapp.com",
    databaseURL: "https://ecl-voice.firebaseio.com",
    projectId: "ecl-voice",
    storageBucket: "ecl-voice.appspot.com",
    messagingSenderId: "741647084768"
}
firebase.initializeApp(firebaseConfig)
*/
class Kp extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            playing: false,
            userId: new Date().getTime(),
            recorded: false,
            index: 1,
            sub: [
                "主持人要我講這個題目 正向的破壞",
                "想了老半天想說不如講自己的故事好了",
                "在台灣的醫生裡面",
                "我大概是看過死人最多的醫生",
                "在生死之間看過最多",
                "所以要我來講生死的故事應該是最恰當",
                "台灣最有名的醫生",
                "很多人都聽過這個笑話",
                "邵曉玲事件之後",
                "跑到柳營奇美醫院",
                "要找一位葉醫師",
                "邵曉玲就是被他救起來了",
                "靜脈血引流出來",
                "取代這個心肺功能",
                "就是一個主機當人工心臟",
                "到氧合器再送回去",
                "那這個葉克膜，在邵曉",
                "其實在邵曉玲之前",
                "台大醫院我們在1994年就有這種葉克膜",
                "已經用很久了，那邵曉玲",
                "我想是這樣的，葉克膜",
                "在台灣的新聞媒體炒作之下，的確",
                "它有非常成功的案例，像這個",
                "是一個周杰倫的舞群，那有天",
                "這是一百倍底下的心肌切片",
                "到四百倍底下就很明顯了",
                "那個藍色一點一點的就是淋巴球",
                "所以很清楚這是個很厲害的猛爆性心肌炎",
                "整個心臟都被淋巴球浸潤",
                "心臟幾乎就不跳了停止了",
                "他的眼睛大大的看著他的螢幕",
                "他的心臟幾乎已經不動了",
                "現代醫學的奇蹟，在那個",
                "CPR最久還有救回來的就是這個案例",
                "從國泰醫院CPR壓到台大醫院",
                "發現強心劑已經打了一百支了",
                "已經縮的比鉛筆還細了",
                "一個人九天幾乎沒有心臟功能",
                "在心臟移植跟腎臟移植之後",
                "經歷四小時CPR",
                "細菌後來就跑到血流裡面",
                "在其他醫院",
                "還是要做沒辦法",
                "心臟都沒有了剪掉",
                "心電圖乾脆就一條線了",
                "連想都不用想了",
                "只看到一些管子",
                "這個病人在十六天以後",
                "接到葉克膜上",
                "病人是完全沒有心臟",
                "十六天以後再做心臟移植",
                "有一天有個廠商從新加坡寄e-mail給我",
                "這是另外一個案例",
                "喝酒醉後還去游泳，他還以為他是",
                "就很嚴重的肺炎了",
                "幾乎引起很厲害的肺炎",
                "這個叫急性呼吸窘迫症",
                "使用葉克膜用了117天",
                "不過最後還是慢慢恢復",
                "這實在太神奇了",
                "在媒體的炒作之下",
                "可是是這樣",
                "做為一個重症醫學的醫生，看到",
                "就黑掉了，我們看看",
                "你是要把雙腳剁掉",
                "算了，不要在玩了",
                "這一題你都這麼困難決定的話，那這一",
                "七歲的男生，肺炎雙球菌",
                "葉克膜裝下去後，出現",
                "眼睛大大的看著你，意識",
                "在生死之間",
                "可是我要怎麼跟他講",
                "我要把四肢剁掉",
                "還是你就算了",
                "你如何跟一個七歲的男生",
                "講這種生死的問題",
                "的心路歷程",
                "一開始見山似山",
                "就是我有看到一個病人",
                "我又慢慢看到了病人",
                "全國器官移植登錄系統，還當",
                "當創傷部副主任",
                "在我三十幾歲的時候，在一路",
                "可是到了四十歲以後，常常",
                "那個裝了葉克膜還是死",
                "不曉得怎麼跟他回答，難道我跟",
                "四肢會黑掉",
                "所以在四十幾歲的時候",
                "為什麼這個病人會救不回來呢",
                "眾里尋她千百度驀然",
                "正在燈火闌珊處，有一天",
                "只能盡力，就這樣",
                "我慢慢就想通一個道理，我們看四",
                "其實醫學還是有極限",
                "難道我們可以裝著機器",
                "一輩子下去嗎？所以",
                "沒有辦法嘛園丁",
                "在春夏秋冬時開得好看一點，當一個",
                "讓人在生老病死之間，活的",
                "好看一點，就這樣而已",
                "只是生命花園的園丁，但是"
            ],
            sound: [require("../../../assets/kp/chunk000.wav"),
                require("../../../assets/kp/chunk001.wav"),
                require("../../../assets/kp/chunk002.wav"),
                require("../../../assets/kp/chunk003.wav"),
                require("../../../assets/kp/chunk004.wav"),
                require("../../../assets/kp/chunk005.wav"),
                require("../../../assets/kp/chunk006.wav"),
                require("../../../assets/kp/chunk007.wav"),
                require("../../../assets/kp/chunk008.wav"),
                require("../../../assets/kp/chunk009.wav"),
                require("../../../assets/kp/chunk010.wav"),
                require("../../../assets/kp/chunk011.wav"),
                require("../../../assets/kp/chunk012.wav"),
                require("../../../assets/kp/chunk013.wav"),
                require("../../../assets/kp/chunk014.wav"),
                require("../../../assets/kp/chunk015.wav"),
                require("../../../assets/kp/chunk016.wav"),
                require("../../../assets/kp/chunk017.wav"),
                require("../../../assets/kp/chunk018.wav"),
                require("../../../assets/kp/chunk019.wav"),
                require("../../../assets/kp/chunk020.wav"),
                require("../../../assets/kp/chunk021.wav"),
                require("../../../assets/kp/chunk022.wav"),
                require("../../../assets/kp/chunk023.wav"),
                require("../../../assets/kp/chunk024.wav"),
                require("../../../assets/kp/chunk025.wav"),
                require("../../../assets/kp/chunk026.wav"),
                require("../../../assets/kp/chunk027.wav"),
                require("../../../assets/kp/chunk028.wav"),
                require("../../../assets/kp/chunk029.wav"),
                require("../../../assets/kp/chunk030.wav"),
                require("../../../assets/kp/chunk031.wav"),
                require("../../../assets/kp/chunk032.wav"),
                require("../../../assets/kp/chunk033.wav"),
                require("../../../assets/kp/chunk034.wav"),
                require("../../../assets/kp/chunk035.wav"),
                require("../../../assets/kp/chunk036.wav"),
                require("../../../assets/kp/chunk037.wav"),
                require("../../../assets/kp/chunk038.wav"),
                require("../../../assets/kp/chunk039.wav"),
                require("../../../assets/kp/chunk040.wav"),
                require("../../../assets/kp/chunk041.wav"),
                require("../../../assets/kp/chunk042.wav"),
                require("../../../assets/kp/chunk043.wav"),
                require("../../../assets/kp/chunk044.wav"),
                require("../../../assets/kp/chunk045.wav"),
                require("../../../assets/kp/chunk046.wav"),
                require("../../../assets/kp/chunk047.wav"),
                require("../../../assets/kp/chunk048.wav"),
                require("../../../assets/kp/chunk049.wav"),
                require("../../../assets/kp/chunk050.wav"),
                require("../../../assets/kp/chunk051.wav"),
                require("../../../assets/kp/chunk052.wav"),
                require("../../../assets/kp/chunk053.wav"),
                require("../../../assets/kp/chunk054.wav"),
                require("../../../assets/kp/chunk055.wav"),
                require("../../../assets/kp/chunk056.wav"),
                require("../../../assets/kp/chunk057.wav"),
                require("../../../assets/kp/chunk058.wav"),
                require("../../../assets/kp/chunk059.wav"),
                require("../../../assets/kp/chunk060.wav"),
                require("../../../assets/kp/chunk061.wav"),
                require("../../../assets/kp/chunk062.wav"),
                require("../../../assets/kp/chunk063.wav"),
                require("../../../assets/kp/chunk064.wav"),
                require("../../../assets/kp/chunk065.wav"),
                require("../../../assets/kp/chunk066.wav"),
                require("../../../assets/kp/chunk067.wav"),
                require("../../../assets/kp/chunk068.wav"),
                require("../../../assets/kp/chunk069.wav"),
                require("../../../assets/kp/chunk070.wav"),
                require("../../../assets/kp/chunk071.wav"),
                require("../../../assets/kp/chunk072.wav"),
                require("../../../assets/kp/chunk073.wav"),
                require("../../../assets/kp/chunk074.wav"),
                require("../../../assets/kp/chunk075.wav"),
                require("../../../assets/kp/chunk076.wav"),
                require("../../../assets/kp/chunk077.wav"),
                require("../../../assets/kp/chunk078.wav"),
                require("../../../assets/kp/chunk079.wav"),
                require("../../../assets/kp/chunk080.wav"),
                require("../../../assets/kp/chunk081.wav"),
                require("../../../assets/kp/chunk082.wav"),
                require("../../../assets/kp/chunk083.wav"),
                require("../../../assets/kp/chunk084.wav"),
                require("../../../assets/kp/chunk085.wav"),
                require("../../../assets/kp/chunk086.wav"),
                require("../../../assets/kp/chunk087.wav"),
                require("../../../assets/kp/chunk088.wav"),
                require("../../../assets/kp/chunk089.wav"),
                require("../../../assets/kp/chunk090.wav"),
                require("../../../assets/kp/chunk091.wav"),
                require("../../../assets/kp/chunk092.wav"),
                require("../../../assets/kp/chunk093.wav"),
                require("../../../assets/kp/chunk094.wav"),
                require("../../../assets/kp/chunk095.wav"),
                require("../../../assets/kp/chunk096.wav"),
                require("../../../assets/kp/chunk097.wav"),
                require("../../../assets/kp/chunk098.wav"),
                require("../../../assets/kp/chunk099.wav"),
                require("../../../assets/kp/chunk100.wav")
            ]
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

    async componentWillMount() {
        try {
            this.state.userId = await AsyncStorage.getItem("@uid")
            this.state.index = await AsyncStorage.getItem("@index2") || 1
            this.state.index = parseInt(this.state.index, 10)

        } catch (err) {
            console.log(err)
        }

        if (this.state.userId === null) {
            Toast.show({
                text: "請先登入後再使用",
                buttonText: "Ok",
                duration: 3000,
                type: "danger"
            })
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
            await this.setupSound()
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

    async skip(direction) {
        let result = this.state.index + direction
        if (result > this.state.sub.length || result < 1) {
            return
        }
        this.setState({ index: result })
        await AsyncStorage.setItem("@index2", JSON.stringify(result))
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
            text: this.state.index === this.state.sub.length ? "錄製完成" : "儲存成功",
            buttonText: "Ok",
            duration: 1500,
            type: "success"
        })
        if (this.state.index === this.state.sub.length) {
        //if (this.state.index === 3) {
            let result = JSON.parse(await AsyncStorage.getItem("@preBuild"))
            result[1].recorded = true
            result[1].trained = true
            await AsyncStorage.setItem("@index2", "1")
            await AsyncStorage.setItem("@preBuild", JSON.stringify(result))
            this.props.navigation.navigate("VoiceList")
        } else {
            this.setState({index: this.state.index + 1})
            await AsyncStorage.setItem("@index2", JSON.stringify(this.state.index))
            await this.setupSound()
            await this.playSound()
        }
    }

    async uploadAudioAsync(uri) {
        const response = await fetch(uri)
        const blob = await response.blob()
        const ref = firebase.storage().ref().child(`${this.state.userId}/${this.state.index}.wav`)

        const snapshot = await ref.put(blob, { contentType: "audio/wav" })
        console.log(snapshot.downloadURL)
    }

    async uploadRecord(uri) {
        const url = `${serverUrl}/upload`
        const data = new FormData()
        let metadata = {
            part_content_type: "audio/wav;rate=22050"
        }
        data.append("metadata", JSON.stringify(metadata))
        data.append("uid", this.state.userId)
        data.append("tid", "kp")
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
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
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
                        <CardItem style={{ paddingTop: 0, paddingBottom: 7 }}>
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
                                        <Icon type="MaterialCommunityIcons" name="microphone" style={{ marginLeft: 33, fontSize: 35 }} />
                                    </Button>)
                                :
                                    (<Button rounded icon style={styles.recordBtn} onPress={()=> this.stopRecord()}>
                                        <Icon type="MaterialCommunityIcons" name="stop" style={{ marginLeft: 33, fontSize: 35 }} />
                                    </Button>)
                                }
                            </Body>
                        </CardItem>
                        <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <View style={{ flex:1, flexDirection: "row", justifyContent: "center"}}>
                                <Button small icon bordered primary onPress={()=> this.skip(-1)} >
                                    <Icon type="MaterialCommunityIcons" name="skip-backward" />
                                </Button>
                                <Button small iconLeft primary style={{ marginLeft: 10 }} onPress={()=> this.playHistory()} >
                                    <Icon type="MaterialCommunityIcons" name="play" />
                                    <Text>重放</Text>
                                </Button>
                                <Button small icon bordered primary style={{ marginLeft: 10 }} onPress={()=> this.skip(1)} >
                                    <Icon type="MaterialCommunityIcons" name="skip-forward" />
                                </Button>
                            </View>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{ position: "absolute", width: "100%", bottom: 10, paddingLeft: 10, paddingRight: 10}}>
                    <Button full disabled={!this.state.recorded} onPress={()=> this.nextItem()}
                        style={[{ width: "100%"}, this.state.recorded ? {backgroundColor: "#2196f3"} : {}]}>
                        <Text>{ this.state.index === this.state.sub.length ? "完成" : "下一個" }</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

export default Kp
