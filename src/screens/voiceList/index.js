import React, { Component } from "react"
import { AsyncStorage } from "react-native"
import { Body, Left, Right, Container, Header, Button, Icon, Content, Text, Title, List, ListItem } from "native-base"
import styles from "./styles"

//const serverUrl = "http://140.123.97.163:5001/"

class voiceList extends Component {
    constructor() {
        super()
        this.state = {
            preBuild: [],
            list: []
        }
    }

    async componentWillMount() {
        await this.loadData()
    }

    async componentDidMount() {
    }

    async loadData() {
        let list = null
        let preBuild = null
        try {
            list = await AsyncStorage.getItem("@voiceList")
            preBuild = await AsyncStorage.getItem("@preBuild")
        } catch (err) {
            console.log("componentDidMount", err)
        }

        //console.log("state", list, preBuild)

        if (list === null) {
            this.state.list = [{
                tid: "HeTao",
                recorded: false,
                trained: false,
                title: "海濤法師",
                note: "佛海無崖 回頭是岸 !!",
                nav: "VoiceAdd"
            }]
            await AsyncStorage.setItem("@voiceList", JSON.stringify(this.state.list))
        } else {
            this.setState({list: JSON.parse(list)})
        }

        if (preBuild === null) {
            this.state.preBuild = [{
                tid: "yei",
                recorded: false,
                trained: false,
                title: "葉老師",
                note: "帶您走入佛性的世界",
                nav: "Yei"
            }]
            await AsyncStorage.setItem("@preBuild", JSON.stringify(this.state.preBuild))
        } else {
            this.setState({preBuild: JSON.parse(preBuild)})
        }
        this.forceUpdate()
    }
    async selectVoice(type, index) {
        await AsyncStorage.setItem("@selectType", JSON.stringify(type))
        await AsyncStorage.setItem("@selectIndex", JSON.stringify(index))
        if (this.state.preBuild[index].trained) {
            this.props.navigation.navigate("Convert")
        } else if (type === 0) {
            this.props.navigation.navigate(this.state.preBuild[index].nav)
        } else if (type === 1) {
            this.props.navigation.navigate(this.state.list[index].nav)
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
                    <Title>Voice List</Title>
                </Body>
                <Right />
            </Header>

            <Content>
                <List style={{ backgroundColor: "#FFF" }}>
                    <ListItem itemDivider>
                        <Text>推薦項目</Text>
                    </ListItem>
                </List>
                <List style={{ backgroundColor: "#FFF" }} dataArray={this.state.preBuild} renderRow={(data, sid, index) =>
                    <ListItem thumbnail>
                        <Left>
                            <Icon active name="star" type="MaterialCommunityIcons" style={{ color: "#27a", fontSize: 25, width: 25 }} />
                        </Left>
                        <Body>
                            <Text> {data.title} {data.trained ? "[訓練完成]" : ""} </Text>
                            <Text numberOfLines={1} note> {data.note} </Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.selectVoice(0, index)}>
                                {data.recorded ? <Icon active name="paper-plane" /> :  <Icon active name="add" />}
                            </Button>
                        </Right>
                    </ListItem>}
                />
                <List style={{ backgroundColor: "#FFF" }}>
                <ListItem itemDivider>
                        <Text>自定義</Text>
                    </ListItem>
                </List>
                <List style={{ backgroundColor: "#FFF" }} dataArray={this.state.list} renderRow={(data, sid, index) =>
                    <ListItem thumbnail>
                        <Left>
                            <Icon active name="voice" type="MaterialCommunityIcons" style={{ color: "#27a", fontSize: 25, width: 25 }} />
                        </Left>
                        <Body>
                            <Text> {data.title} {data.trained ? "[訓練完成]" : ""} </Text>
                            <Text numberOfLines={1} note> {data.note} </Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("Yei")}>
                                {data.recorded ? <Icon active name="paper-plane" /> :  <Icon active name="add" />}
                            </Button>
                        </Right>
                    </ListItem>}
                />
                <Button iconLeft rounded primary
                    style={{ width: 100, marginTop: 20, marginLeft: "50%", right: 50 }}
                    onPress={() => this.props.navigation.navigate("VoiceAdd")}
                >
                    <Icon name="navigate" />
                    <Text>新增</Text>
                </Button>
            </Content>
        </Container>
        )
    }
}

export default voiceList
