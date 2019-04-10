import React, {  Component } from "react"
import { AsyncStorage } from "react-native"
import { View, Body, Left, Right, Container, Header, Button, Icon, Content, Text, Title, Card, CardItem, Toast } from "native-base"
import { Audio, FileSystem, Permissions } from "expo"
import ProgressBar from "ProgressBarAndroid"
import * as firebase from "firebase"
import styles from "./styles"

const serverUrl = "http://140.123.97.163:5001"

class Kp2 extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            playing: false,
            userId: new Date().getTime(),
            recorded: false,
            index: 1,
            sub: [
                "我當時想了老半天說，那不如講我自己的故事好了",
                "在台灣的醫生裡面吼",
                "我看過死人最多的醫生",
                "就是再生死之間看過最多",
                "所以用我來講這個生死的故事應該是最恰當",
                "台灣吼最有名的醫師吼",
                "有人開玩笑就說葉醫師啊",
                "很多人都聽過那個笑話",
                "邵曉玲事件之後吼",
                "有人跑到那個柳營奇美醫院吼說要找一個葉醫師",
                "他們急診室的人說沒有啊我們這裡沒有一個姓葉的",
                "其實葉剋模哦很簡單啦",
                "他就是一個靜脈血頸流出來吼",
                "在經過一個氧和氣吼就人工肺臟然後在送回身體",
                "就是暫時吼取代這個心肺功能",
                "台大醫院我們一九九四年就已經有葉剋模了",
                "十年寒窗無人問哦，一舉成名天下知啊",
                "的確，他有非常成功的案例啊",
                "像這個是一個周杰倫的舞群",
                "那有一天就猛爆性心肌炎那心臟就不跳了",
                "他的眼睛大大的吼看著他的螢幕",
                "可是他螢幕全部是平的",
                "因為他猛爆性心肌炎吼所以那個心臟都不跳了",
                "這個是一百倍底下的吼心肌切片",
                "就是病理切片",
                "那在一百倍底下吼還不是看的很清楚",
                "那如果到四百倍底下就很明顯了",
                "那個藍色的一點一點那個就是淋巴球",
                "所以很清楚吼這是一個很厲害的吼猛爆性心肌炎",
                "在九天之後吼，心臟加腎臟移植吼",
                "他不到一個月就回去跳舞了",
                "所以這是現代醫學的奇蹟啊",
                "台大醫院是台灣最後一道防線嘛，那這個還是要做沒辦法",
                "剛才那個是有心臟不會跳",
                "這個更厲害，這個是連心臟都沒有了剪掉了",
                "因為幾乎完全沒有心臟功能",
                "所以用兩台葉剋模",
                "理論上吼那個胸腔中間應該有一個心臟",
                "那這個病人在十六天以後吼我們給他做心臟移植",
                "他只看到一些塑膠管子",
                "那接到外面吼接到葉剋模上",
                "有一天那個一個廠商從新加坡送了email給我",
                "喝酒醉以後還去游泳",
                "他還以為他是李白勒",
                "台灣的池塘吼太髒了",
                "這個叫急性呼吸窘迫症，整個都肺臟都白掉了",
                "所以坦白講吼",
                "葉剋模會在台灣的歷史上吼會這麼有名吼",
                "通常媒體吼，成功的會拿出來報導",
                "失敗的他就不會講了，藏起來了",
                "你是要把雙腳剁掉繼續再救",
                "如果這一題你都這麼困難決定的話，那這一題更困難",
                "這是一個七歲的男生啦吼",
                "肺炎雙球菌敗血症",
                "出現併發症四肢都黑掉了",
                "你如果要救他的話，要把四肢都剁掉",
                "再生死之間吼",
                "其實也不能瞞各位啦，我也是算是那個很會讀書的人",
                "這醫學吼多厲害了什麼都可以解決了",
                "可是到了四十歲以後吼",
                "常常有那個裝了葉剋模還是失敗的case",
                "為什麼邵曉玲救的回來我們這個親人救不回來",
                "我也不曉得怎麼跟他回答",
                "難道我跟他講說因為他不是邵曉玲嘛",
                "啊不然就問我說為什麼那個四肢會黑掉",
                "我要是知道我就避免了嘛我就是不知道",
                "眾裡尋他千百度",
                "驀然回首那人正在燈火欄珊處",
                "有一天吼我終於領略了一個道理",
                "醫生是人不是神",
                "其實吼，醫學還是有極限啦",
                "不管吼，人類的科學怎麼發達",
                "園丁吼，能不能改變春夏秋冬?",
                "當然沒有辦法嘛",
                "園丁只是讓花吼，在春夏秋冬之間開的好看一點",
                "當一個醫生吼，有辦法去改變生老病死嘛?",
                "坦白講，很困難那",
                "夏天的蟲吼，你沒辦法跟他講冬天的事情，因為他活不了那麼久",
                "任何吼，有組織的團體吼，他都是不穩定的",
                "所以我的存在就是必須要破壞這個環境",
                "我再也不能破壞這個環境的時候",
                "我只好破壞我自己",
                "這是從吼 物理化學的觀點來看待死亡",
                "可是如果是看到人生勒",
                "有一天我在加護病房吼，在巡房的時候突然大徹大悟",
                "人生的結局只有兩種，一個有插管一個沒有插管",
                "但是都是死掉啊",
                "所以死亡是一個普遍存在的現象",
                "那到底我們如何看待死亡勒？",
                "其實這個問題吼，我有一個翻轉的想法",
                "你問我什麼叫做死亡",
                "我如此的回答",
                "所以今天各位吼，來這裡聽演講",
                "我希望你們回家以後吼",
                "今天晚上睡覺的時候吼，躺在床上問自己一個問題",
                "我對這個問題的答案是這樣啦吼",
                "追求這個問題的答案就是這個問題的答案",
                "沒有人會把死亡吼，當作人生的目的",
                "所以人生只是個過程",
                "最近吼我常常去講那一陀大便的啟示",
                "三個人吃了兩萬六千塊",
                /*
                "我怎麼吃這麼貴的東西",
                "我第二天早上上廁所吼，一直在看我的大便",
                "我在廁所裡面突然大徹大悟",
                "人生的榮華富貴不過就是一陀大便",
                "儒家吼，還是中國最重要的思想啦",
                "論語裡面說吼，未知生，焉知死，未能事人，焉能事鬼",
                "在這個中華文化圈裡面吼",
                "可是過去我們都不想去面對生死，採取一個躲避的態度",
                "我是一個比較聰明的一個人吼，身體也比較好的一個人",
                "我用我的優勢去欺負別人",
                "所以我用最後這句話吼，來作為今天演講的結束",
                "面對挫折打擊不是最困難的",
                "最困難的是面對這種挫折打擊，而沒有失去對人世的熱情"
                */
            ],
            sound: [
                require("../../../assets/kp2/chunk001.wav"),
                require("../../../assets/kp2/chunk002.wav"),
                require("../../../assets/kp2/chunk003.wav"),
                require("../../../assets/kp2/chunk004.wav"),
                require("../../../assets/kp2/chunk005.wav"),
                require("../../../assets/kp2/chunk006.wav"),
                require("../../../assets/kp2/chunk007.wav"),
                require("../../../assets/kp2/chunk008.wav"),
                require("../../../assets/kp2/chunk009.wav"),
                require("../../../assets/kp2/chunk010.wav"),
                require("../../../assets/kp2/chunk011.wav"),
                require("../../../assets/kp2/chunk012.wav"),
                require("../../../assets/kp2/chunk013.wav"),
                require("../../../assets/kp2/chunk014.wav"),
                require("../../../assets/kp2/chunk015.wav"),
                require("../../../assets/kp2/chunk016.wav"),
                require("../../../assets/kp2/chunk017.wav"),
                require("../../../assets/kp2/chunk018.wav"),
                require("../../../assets/kp2/chunk019.wav"),
                require("../../../assets/kp2/chunk020.wav"),
                require("../../../assets/kp2/chunk021.wav"),
                require("../../../assets/kp2/chunk022.wav"),
                require("../../../assets/kp2/chunk023.wav"),
                require("../../../assets/kp2/chunk024.wav"),
                require("../../../assets/kp2/chunk025.wav"),
                require("../../../assets/kp2/chunk026.wav"),
                require("../../../assets/kp2/chunk027.wav"),
                require("../../../assets/kp2/chunk028.wav"),
                require("../../../assets/kp2/chunk029.wav"),
                require("../../../assets/kp2/chunk030.wav"),
                require("../../../assets/kp2/chunk031.wav"),
                require("../../../assets/kp2/chunk032.wav"),
                require("../../../assets/kp2/chunk033.wav"),
                require("../../../assets/kp2/chunk034.wav"),
                require("../../../assets/kp2/chunk035.wav"),
                require("../../../assets/kp2/chunk036.wav"),
                require("../../../assets/kp2/chunk037.wav"),
                require("../../../assets/kp2/chunk038.wav"),
                require("../../../assets/kp2/chunk039.wav"),
                require("../../../assets/kp2/chunk040.wav"),
                require("../../../assets/kp2/chunk041.wav"),
                require("../../../assets/kp2/chunk042.wav"),
                require("../../../assets/kp2/chunk043.wav"),
                require("../../../assets/kp2/chunk044.wav"),
                require("../../../assets/kp2/chunk045.wav"),
                require("../../../assets/kp2/chunk046.wav"),
                require("../../../assets/kp2/chunk047.wav"),
                require("../../../assets/kp2/chunk048.wav"),
                require("../../../assets/kp2/chunk049.wav"),
                require("../../../assets/kp2/chunk050.wav"),
                require("../../../assets/kp2/chunk051.wav"),
                require("../../../assets/kp2/chunk052.wav"),
                require("../../../assets/kp2/chunk053.wav"),
                require("../../../assets/kp2/chunk054.wav"),
                require("../../../assets/kp2/chunk055.wav"),
                require("../../../assets/kp2/chunk056.wav"),
                require("../../../assets/kp2/chunk057.wav"),
                require("../../../assets/kp2/chunk058.wav"),
                require("../../../assets/kp2/chunk059.wav"),
                require("../../../assets/kp2/chunk060.wav"),
                require("../../../assets/kp2/chunk061.wav"),
                require("../../../assets/kp2/chunk062.wav"),
                require("../../../assets/kp2/chunk063.wav"),
                require("../../../assets/kp2/chunk064.wav"),
                require("../../../assets/kp2/chunk065.wav"),
                require("../../../assets/kp2/chunk066.wav"),
                require("../../../assets/kp2/chunk067.wav"),
                require("../../../assets/kp2/chunk068.wav"),
                require("../../../assets/kp2/chunk069.wav"),
                require("../../../assets/kp2/chunk070.wav"),
                require("../../../assets/kp2/chunk071.wav"),
                require("../../../assets/kp2/chunk072.wav"),
                require("../../../assets/kp2/chunk073.wav"),
                require("../../../assets/kp2/chunk074.wav"),
                require("../../../assets/kp2/chunk075.wav"),
                require("../../../assets/kp2/chunk076.wav"),
                require("../../../assets/kp2/chunk077.wav"),
                require("../../../assets/kp2/chunk078.wav"),
                require("../../../assets/kp2/chunk079.wav"),
                require("../../../assets/kp2/chunk080.wav"),
                require("../../../assets/kp2/chunk081.wav"),
                require("../../../assets/kp2/chunk082.wav"),
                require("../../../assets/kp2/chunk083.wav"),
                require("../../../assets/kp2/chunk084.wav"),
                require("../../../assets/kp2/chunk085.wav"),
                require("../../../assets/kp2/chunk086.wav"),
                require("../../../assets/kp2/chunk087.wav"),
                require("../../../assets/kp2/chunk088.wav"),
                require("../../../assets/kp2/chunk089.wav"),
                require("../../../assets/kp2/chunk090.wav"),
                require("../../../assets/kp2/chunk091.wav"),
                require("../../../assets/kp2/chunk092.wav"),
                require("../../../assets/kp2/chunk093.wav"),
                require("../../../assets/kp2/chunk094.wav"),
                require("../../../assets/kp2/chunk095.wav"),
                require("../../../assets/kp2/chunk096.wav"),
                require("../../../assets/kp2/chunk097.wav"),
                require("../../../assets/kp2/chunk098.wav"),
                require("../../../assets/kp2/chunk099.wav"),
                require("../../../assets/kp2/chunk100.wav"),
                require("../../../assets/kp2/chunk101.wav")
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
            this.state.index = await AsyncStorage.getItem("@index3") || 1
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
            result[2].recorded = true
            result[2].trained = true
            await AsyncStorage.setItem("@index3", "1")
            await AsyncStorage.setItem("@preBuild", JSON.stringify(result))
            this.props.navigation.navigate("VoiceList")
        } else {
            this.setState({index: this.state.index + 1})
            await AsyncStorage.setItem("@index3", JSON.stringify(this.state.index))
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
        data.append("tid", "kp2")
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

export default Kp2
