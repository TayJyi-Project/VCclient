import React, {  Component } from "react"
import { AsyncStorage } from "react-native"
import { View, Body, Left, Right, Container, Header, Button, Icon, Content, Text, Title, Card, CardItem } from "native-base"
import styles from "./styles"


class Note extends Component {
    constructor() {
        super()
        this.state = {
            nav: "kp"
        }
    }

    async componentWillMount() {
        try {
            let list = ["@preBuild", "@voiceList"]
            let type = JSON.parse(await AsyncStorage.getItem("@selectType"))
            let index = JSON.parse(await AsyncStorage.getItem("@selectIndex"))
            let result = JSON.parse(await AsyncStorage.getItem(list[type]))
            //console.log(type, index, result)
            this.state.nav = result[index].nav
        } catch (err) {
            console.log("componentDidMount", err)
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
                        <Title>Note</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card transparent style={{ marginTop: 10, paddingBottom: 10 }}>
                        <CardItem header>
                            <Text style={{ width: "100%", textAlign: "center", fontSize: 20}}>注意事項</Text>
                        </CardItem>
                        <CardItem style={{paddingTop: 0}}>
                            <Text style={styles.centerText}>※聆聽句子後，按照原語速進行錄音</Text>
                        </CardItem>
                        <CardItem style={{paddingTop: 0}}>
                            <Text style={styles.centerText}>※字幕僅供參考，請依錄音中所聽見為準</Text>
                        </CardItem>
                        <CardItem style={{paddingTop: 0}}>
                            <Text style={styles.centerText}>※訓練約需1~2小時，錄音完成後可在列表確認訓練是否完成</Text>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{ position: "absolute", width: "100%", bottom: 10, paddingLeft: 10, paddingRight: 10}}>
                    <Button full onPress={()=> this.props.navigation.navigate(this.state.nav)} style={{ width: "100%", backgroundColor: "#2196f3" }}>
                        <Text>我知道了</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

export default Note
