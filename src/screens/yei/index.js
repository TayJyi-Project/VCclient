import React, {  Component } from "react"
import { AsyncStorage } from "react-native"
import { View, Body, Right, Container, Header, Button, Icon, Content, Text, Title, Card, CardItem, Toast } from "native-base"
import { Audio, FileSystem, Permissions } from "expo"
import ProgressBar from "ProgressBarAndroid"
import * as firebase from "firebase"
import styles from "./styles"

let uuid = require("uuid/v4")
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
class Yei extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            playing: false,
            userId: new Date().getTime(),
            recorded: false,
            index: 1,
            sub: [
                "什麼是真心？",
                "什麼叫做自性彌陀？",
                "那個時候當你開始了這個念頭參究的時候",
                "這個時候就是進入所謂的體究念佛的層次",
                "所以各位菩薩可以看到體究念佛所需要的功夫",
                "就是要從無相念佛的功夫而來吼",
                "並且如果說體究念佛要夠真的能夠參的得力的話",
                "你一定要讓這個功夫在這個功夫呢要做得很紮實",
                "讓他綿綿密密沒有中斷",
                "這樣子你才能夠在所有的生活的一切的這個細相裡面呢",
                "細細的去尋找細細的參究",
                "就這樣子才有破參的可能",
                "這個就是體究念佛，那麼一旦體究念佛",
                "一旦有朝一日破參明心了找到了自性彌陀",
                "找到了找到了心經的那個心",
                "找到了金剛經的那個心之後",
                "這個時候我們就叫他說已經進入果地了",
                "因為這個時候這個人已經斷了三縛結",
                "已經預入聖流了",
                "所以我們加一個果地這個字",
                "那麼這個時候這個人",
                "如果持續念佛的話",
                "我們就叫這個境界",
                "叫做果地無相念佛",
                "各位要問說果地無相念佛",
                "是要做什麼用呢？",
                "那是因為體究念佛的時候",
                "我們只是證悟了本心的存在",
                "但是我們距離眼見佛性還有非常大的距離",
                "所以這個時候我們仍然需要要依序著",
                "我們在無相念佛所養成的定力",
                "繼續幫助我們繼續參究",
                "就這個狀況，這個狀態就叫做果地無相念佛",
                "那麼有朝一日我們假如是",
                "福德具足了智慧具足了",
                "所有的姻緣都具足了之後",
                "那有朝一日我們就真的能夠用父母所生給我們的肉眼",
                "親眼看到了佛性的展現",
                "那麼這個境界才叫做實相念佛",
                "因為那個時候我們才能說",
                "我們真正看到了實相",
                "這個才是真正的念佛三昧",
                "所以從我們開始講的持名念佛到無相念佛",
                "體究念佛果地無相念佛",
                "一路到實相念佛",
                "這個種種境界的轉進",
                "吼種種境界的這些精進呢",
                "都需要我們有有這個憶佛的功夫",
                "吼這個功夫呢，其實就是要有定力吼",
                "50這個定力的部份呢，在念佛三昧修學次第的後半段呢",
                "會有一個非常非常好的法文介紹給大家吼",
                "就是無相憶念拜佛的法文",
                "這個到後來我們再來說所以從一個單純的念佛",
                "各位菩薩就可以看到",
                "念佛其實不是像一般人所想象到的",
                "只是開口念念",
                "南無阿彌陀佛這幾個字這樣簡單而已喔",
                "所以念佛呢從淺到深的到極深的都是念佛",
                "這個就是為什麼我們說念佛法門是三根普被",
                "吼因為他的境界就是這樣的廣這樣的深",
                "吼那麼所有的這些功夫好",
                "一定要具足了，我們才能夠在念佛的這個法門上面",
                "一路精進成就吼",
                "順帶要提醒大家就是",
                "我們固然很強調功夫",
                "可是我們強調前面所說的這些三福淨業的這些項目呢",
                "也要深切的提醒各位菩薩",
                "一定要好好的做到",
                "吼因為我們講的功夫是定力的增進",
                "如果定力的增進沒有搭配適當的福德的話",
                "那麼在在這個在這個修行的過程中呢",
                "就比較容易受到了許多的干擾哈",
                "許多的冤親債主的干擾",
                "所以我們的功夫跟福德呢兩者一定要互相的相應互相的增長",
                "這樣子我們的菩薩道才能走的既順又穩吼",
                "好這個是有關求生淨土自然的事行的部分",
                "接下來我們就要進入求生淨土",
                "資糧理行也就是體究念佛的部分吼",
                "因為體究念佛這個部份就關係到我們如何證悟本心",
                "所以在這本書裡面特別在這個章節呢",
                "先告訴大家體究念佛",
                "體劍念佛又分成三個部分",
                "第一個部分是植眾德本，廣結善緣，修除高曼",
                "植眾德本這個呢",
                "在我們前面在講三福淨業的時候",
                "每一個做的這個事情呢",
                "幾乎都是在植眾德本",
                "好所以只要各位好好的做，好好的修福",
                "這個部分應該就不會是問題",
                "廣結善緣呢最主要就是說所謂的因緣不可思議",
                "所以呢我們需要有很多的善緣幫助我們一起成就",
                "包含需要有善知識的緣",
                "包含需要有善友來引領我們認識善知識的緣",
                "這個就是我們需要廣結善緣",
                "那最後一個這個部分的是所謂的修除高慢齁",
                "修除高慢這件事情呢其實非常的重要",
                "我們看了許多的修行人",
                "之所以會修行得不得力",
                "就是因為有慢心的存在吼",
                "這種慢心有一個狀況是永遠以為自己不可能"
            ],
            sound: [require("../../../assets/yei/chunk0.wav"), require("../../../assets/yei/chunk1.wav"), require("../../../assets/yei/chunk2.wav"), require("../../../assets/yei/chunk3.wav"), require("../../../assets/yei/chunk4.wav"), require("../../../assets/yei/chunk5.wav"), require("../../../assets/yei/chunk6.wav"), require("../../../assets/yei/chunk7.wav"), require("../../../assets/yei/chunk8.wav"), require("../../../assets/yei/chunk9.wav"), require("../../../assets/yei/chunk10.wav"), require("../../../assets/yei/chunk11.wav"), require("../../../assets/yei/chunk12.wav"), require("../../../assets/yei/chunk13.wav"), require("../../../assets/yei/chunk14.wav"), require("../../../assets/yei/chunk15.wav"), require("../../../assets/yei/chunk16.wav"), require("../../../assets/yei/chunk17.wav"), require("../../../assets/yei/chunk18.wav"), require("../../../assets/yei/chunk19.wav"), require("../../../assets/yei/chunk20.wav"), require("../../../assets/yei/chunk21.wav"), require("../../../assets/yei/chunk22.wav"), require("../../../assets/yei/chunk23.wav"), require("../../../assets/yei/chunk24.wav"), require("../../../assets/yei/chunk25.wav"), require("../../../assets/yei/chunk26.wav"), require("../../../assets/yei/chunk27.wav"), require("../../../assets/yei/chunk28.wav"), require("../../../assets/yei/chunk29.wav"), require("../../../assets/yei/chunk30.wav"), require("../../../assets/yei/chunk31.wav"), require("../../../assets/yei/chunk32.wav"), require("../../../assets/yei/chunk33.wav"), require("../../../assets/yei/chunk34.wav"), require("../../../assets/yei/chunk35.wav"), require("../../../assets/yei/chunk36.wav"), require("../../../assets/yei/chunk37.wav"), require("../../../assets/yei/chunk38.wav"), require("../../../assets/yei/chunk39.wav"), require("../../../assets/yei/chunk40.wav"), require("../../../assets/yei/chunk41.wav"), require("../../../assets/yei/chunk42.wav"), require("../../../assets/yei/chunk43.wav"), require("../../../assets/yei/chunk44.wav"), require("../../../assets/yei/chunk45.wav"), require("../../../assets/yei/chunk46.wav"), require("../../../assets/yei/chunk47.wav"), require("../../../assets/yei/chunk48.wav"), require("../../../assets/yei/chunk49.wav"), require("../../../assets/yei/chunk50.wav"), require("../../../assets/yei/chunk51.wav"), require("../../../assets/yei/chunk52.wav"), require("../../../assets/yei/chunk53.wav"), require("../../../assets/yei/chunk54.wav"), require("../../../assets/yei/chunk55.wav"), require("../../../assets/yei/chunk56.wav"), require("../../../assets/yei/chunk57.wav"), require("../../../assets/yei/chunk58.wav"), require("../../../assets/yei/chunk59.wav"), require("../../../assets/yei/chunk60.wav"), require("../../../assets/yei/chunk61.wav"), require("../../../assets/yei/chunk62.wav"), require("../../../assets/yei/chunk63.wav"), require("../../../assets/yei/chunk64.wav"), require("../../../assets/yei/chunk65.wav"), require("../../../assets/yei/chunk66.wav"), require("../../../assets/yei/chunk67.wav"), require("../../../assets/yei/chunk68.wav"), require("../../../assets/yei/chunk69.wav"), require("../../../assets/yei/chunk70.wav"), require("../../../assets/yei/chunk71.wav"), require("../../../assets/yei/chunk72.wav"), require("../../../assets/yei/chunk73.wav"), require("../../../assets/yei/chunk74.wav"), require("../../../assets/yei/chunk75.wav"), require("../../../assets/yei/chunk76.wav"), require("../../../assets/yei/chunk77.wav"), require("../../../assets/yei/chunk78.wav"), require("../../../assets/yei/chunk79.wav"), require("../../../assets/yei/chunk80.wav"), require("../../../assets/yei/chunk81.wav"), require("../../../assets/yei/chunk82.wav"), require("../../../assets/yei/chunk83.wav"), require("../../../assets/yei/chunk84.wav"), require("../../../assets/yei/chunk85.wav"), require("../../../assets/yei/chunk86.wav"), require("../../../assets/yei/chunk87.wav"), require("../../../assets/yei/chunk88.wav"), require("../../../assets/yei/chunk89.wav"), require("../../../assets/yei/chunk90.wav"), require("../../../assets/yei/chunk91.wav"), require("../../../assets/yei/chunk92.wav"), require("../../../assets/yei/chunk93.wav"), require("../../../assets/yei/chunk94.wav"), require("../../../assets/yei/chunk95.wav"), require("../../../assets/yei/chunk96.wav"), require("../../../assets/yei/chunk97.wav"), require("../../../assets/yei/chunk98.wav"), require("../../../assets/yei/chunk99.wav")]
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

export default Yei
