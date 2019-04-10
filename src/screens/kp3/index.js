import React, {  Component } from "react"
import { AsyncStorage } from "react-native"
import { View, Body, Left, Right, Container, Header, Button, Icon, Content, Text, Title, Card, CardItem, Toast } from "native-base"
import { Audio, FileSystem, Permissions } from "expo"
import ProgressBar from "ProgressBarAndroid"
import * as firebase from "firebase"
import styles from "./styles"

const serverUrl = "http://140.123.97.163:5001"

class Kp3 extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            playing: false,
            userId: new Date().getTime(),
            recorded: false,
            index: 1,
            sub: [
                "我當時想了老半天說那不如",
                "講我自己的故事好了",
                "在台灣的醫生裡面",
                "我大概是看過死人最多的醫生",
                "在生死之間看過最多",
                "所以用我來講這個生死的故事",
                "應該是最恰當的",
                "台灣齁最有名的醫生齁",
                "有人開玩笑說是葉醫師",
                "很多人都聽過那個笑話",
                "邵曉玲事件之後",
                "以人跑到那個柳營奇美醫院",
                "說要找一個葉醫師",
                "他們急診室的人說沒有啊",
                "其實葉克膜很簡單啊",
                "他就是一個靜脈血引流出來",
                "就是暫時取代心肺功能",
                "一個主機當人工心臟",
                "一個氧和器再送回去",
                "那這個葉克膜",
                "其實在邵曉玲之前",
                "台大醫院我們1994年就已經有葉克膜了",
                "十年寒窗無人問",
                "一舉成名天下知",
                "新聞媒體上的炒作之下",
                "他有非常成功的案例",
                "像這個是一個周杰倫的舞群",
                "那有一天就猛爆性心肌炎",
                "那心臟就不跳了",
                "他的眼睛大大的",
                "看著他的螢幕",
                "這個是100倍底下的心肌切片",
                "那個藍色的一點一點就是淋巴球",
                "他不到一個月就回去跳舞了",
                "所以這是現代醫學的奇蹟",
                "醫學的文獻上面",
                "全球首例，台灣奇蹟",
                "那這是給他做電腦斷層",
                "可是現在沒有心臟",
                "這個是新加坡海峽日報的一個報紙",
                "喝酒醉之後還去游泳",
                "他還以為他是李白",
                "就很嚴重的肺炎",
                "那這個較急性呼吸窘迫症",
                "從剛才的案例裡面",
                "可是是這樣啦",
                "通常媒體",
                "成功的會拿出來報導",
                "失敗的就不會講了，藏起來",
                "最為一個重症醫學的醫生",
                "先天性心臟病",
                "可是不到三天哦那個腳就黑掉了",
                "你是要把雙腳剁掉",
                "如果這一題你都這麼困難決定的話",
                "肺炎雙球菌敗血症",
                "意識清楚也會討水喝",
                "你如果要救他的話",
                "你如何跟一個七歲的男生吼",
                "講這種生死的問題",
                "我在三十幾歲的時候吼",
                "全國器官移植登入系統",
                "在一路發展過程當中我覺得",
                "我要是知道我就避免了嘛我就是不知道啊",
                "我終於想通一個道理",
                "眾裡尋他千百度吼",
                "默然回首那人正在燈火欄珊處",
                "醫生是人不是神",
                "其實吼醫學還是有極限啦",
                "不管吼人類的科學怎麼發達吼",
                "園丁吼能不能改變春夏秋冬",
                "在春夏秋冬之間開的好看一點",
                "有辦法去改變生老病死嘛",
                "坦白講很困難",
                "就死亡的科學觀來講吼",
                "我加上環境才是個宇宙",
                "任何吼有組織的團體吼",
                "他都是不穩定的",
                "所以我的存在就是必須要破壞這個環境",
                "有一天我在加護病房吼",
                "在巡房的時候突然大徹大悟",
                "人生的結局只有兩種",
                "一個有插管一個沒有插管",
                "死亡是一個普遍存在的現象",
                "所以今天各位吼來這裡聽演講",
                "我希望你們回家以後吼",
                "怎樣才算是活著",
                "什麼是人生",
                "所以人生只是個過程",
                "最近吼我常常去講一陀大便的啟示",
                "三個人吃了兩萬六千塊",
                "我看到帳單的時候臉都綠掉了",
                "我怎麼吃這麼貴的東西啊",
                "我第二天早上吼上廁所吼一直在看我的大便",
                "感恩報恩吼抱願不抱怨",
                "台大醫院地下室那個一樓吼",
                "人生的榮華富貴",
                "不過就是一陀大便",
                "他採取一種逃避的態度他不想討論哪",
                "在這個中華文化圈裡面吼",
                "我們唯有能夠面對死亡"
            ],
            sound: [
                require("../../../assets/kp3/chunk001.wav"),
                require("../../../assets/kp3/chunk002.wav"),
                require("../../../assets/kp3/chunk003.wav"),
                require("../../../assets/kp3/chunk004.wav"),
                require("../../../assets/kp3/chunk005.wav"),
                require("../../../assets/kp3/chunk006.wav"),
                require("../../../assets/kp3/chunk007.wav"),
                require("../../../assets/kp3/chunk008.wav"),
                require("../../../assets/kp3/chunk009.wav"),
                require("../../../assets/kp3/chunk010.wav"),
                require("../../../assets/kp3/chunk011.wav"),
                require("../../../assets/kp3/chunk012.wav"),
                require("../../../assets/kp3/chunk013.wav"),
                require("../../../assets/kp3/chunk014.wav"),
                require("../../../assets/kp3/chunk015.wav"),
                require("../../../assets/kp3/chunk016.wav"),
                require("../../../assets/kp3/chunk017.wav"),
                require("../../../assets/kp3/chunk018.wav"),
                require("../../../assets/kp3/chunk019.wav"),
                require("../../../assets/kp3/chunk020.wav"),
                require("../../../assets/kp3/chunk021.wav"),
                require("../../../assets/kp3/chunk022.wav"),
                require("../../../assets/kp3/chunk023.wav"),
                require("../../../assets/kp3/chunk024.wav"),
                require("../../../assets/kp3/chunk025.wav"),
                require("../../../assets/kp3/chunk026.wav"),
                require("../../../assets/kp3/chunk027.wav"),
                require("../../../assets/kp3/chunk028.wav"),
                require("../../../assets/kp3/chunk029.wav"),
                require("../../../assets/kp3/chunk030.wav"),
                require("../../../assets/kp3/chunk031.wav"),
                require("../../../assets/kp3/chunk032.wav"),
                require("../../../assets/kp3/chunk033.wav"),
                require("../../../assets/kp3/chunk034.wav"),
                require("../../../assets/kp3/chunk035.wav"),
                require("../../../assets/kp3/chunk036.wav"),
                require("../../../assets/kp3/chunk037.wav"),
                require("../../../assets/kp3/chunk038.wav"),
                require("../../../assets/kp3/chunk039.wav"),
                require("../../../assets/kp3/chunk040.wav"),
                require("../../../assets/kp3/chunk041.wav"),
                require("../../../assets/kp3/chunk042.wav"),
                require("../../../assets/kp3/chunk043.wav"),
                require("../../../assets/kp3/chunk044.wav"),
                require("../../../assets/kp3/chunk045.wav"),
                require("../../../assets/kp3/chunk046.wav"),
                require("../../../assets/kp3/chunk047.wav"),
                require("../../../assets/kp3/chunk048.wav"),
                require("../../../assets/kp3/chunk049.wav"),
                require("../../../assets/kp3/chunk050.wav"),
                require("../../../assets/kp3/chunk051.wav"),
                require("../../../assets/kp3/chunk052.wav"),
                require("../../../assets/kp3/chunk053.wav"),
                require("../../../assets/kp3/chunk054.wav"),
                require("../../../assets/kp3/chunk055.wav"),
                require("../../../assets/kp3/chunk056.wav"),
                require("../../../assets/kp3/chunk057.wav"),
                require("../../../assets/kp3/chunk058.wav"),
                require("../../../assets/kp3/chunk059.wav"),
                require("../../../assets/kp3/chunk060.wav"),
                require("../../../assets/kp3/chunk061.wav"),
                require("../../../assets/kp3/chunk062.wav"),
                require("../../../assets/kp3/chunk063.wav"),
                require("../../../assets/kp3/chunk064.wav"),
                require("../../../assets/kp3/chunk065.wav"),
                require("../../../assets/kp3/chunk066.wav"),
                require("../../../assets/kp3/chunk067.wav"),
                require("../../../assets/kp3/chunk068.wav"),
                require("../../../assets/kp3/chunk069.wav"),
                require("../../../assets/kp3/chunk070.wav"),
                require("../../../assets/kp3/chunk071.wav"),
                require("../../../assets/kp3/chunk072.wav"),
                require("../../../assets/kp3/chunk073.wav"),
                require("../../../assets/kp3/chunk074.wav"),
                require("../../../assets/kp3/chunk075.wav"),
                require("../../../assets/kp3/chunk076.wav"),
                require("../../../assets/kp3/chunk077.wav"),
                require("../../../assets/kp3/chunk078.wav"),
                require("../../../assets/kp3/chunk079.wav"),
                require("../../../assets/kp3/chunk080.wav"),
                require("../../../assets/kp3/chunk081.wav"),
                require("../../../assets/kp3/chunk082.wav"),
                require("../../../assets/kp3/chunk083.wav"),
                require("../../../assets/kp3/chunk084.wav"),
                require("../../../assets/kp3/chunk085.wav"),
                require("../../../assets/kp3/chunk086.wav"),
                require("../../../assets/kp3/chunk087.wav"),
                require("../../../assets/kp3/chunk088.wav"),
                require("../../../assets/kp3/chunk089.wav"),
                require("../../../assets/kp3/chunk090.wav"),
                require("../../../assets/kp3/chunk091.wav"),
                require("../../../assets/kp3/chunk092.wav"),
                require("../../../assets/kp3/chunk093.wav"),
                require("../../../assets/kp3/chunk094.wav"),
                require("../../../assets/kp3/chunk095.wav"),
                require("../../../assets/kp3/chunk096.wav"),
                require("../../../assets/kp3/chunk097.wav"),
                require("../../../assets/kp3/chunk098.wav"),
                require("../../../assets/kp3/chunk099.wav"),
                require("../../../assets/kp3/chunk100.wav"),
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
            this.state.index = await AsyncStorage.getItem("@index4") || 1
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
        await AsyncStorage.setItem("@index3", JSON.stringify(result))
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
            result[3].recorded = true
            result[3].trained = true
            await AsyncStorage.setItem("@index4", "1")
            await AsyncStorage.setItem("@preBuild", JSON.stringify(result))
            this.props.navigation.navigate("VoiceList")
        } else {
            this.setState({index: this.state.index + 1})
            await AsyncStorage.setItem("@index4", JSON.stringify(this.state.index))
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
        data.append("tid", "kp3")
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
                        <CardItem style={{paddingTop: 5, paddingBottom: 15}}>
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

export default Kp3
