import React, { Component } from "react"
import { Body, Left, Right, Container, Header, Button, Icon, Content, Text, Input, Item, Title, Form, Label } from "native-base"
import styles from "./styles"

const serverUrl = "http://140.123.97.163:5001/"

class VoiceAdd extends Component {
    async addNormal() {
        let tid = await fetch(`${serverUrl}/newTid`)
        this.state.list.append({tid: tid})
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
                    <Title>Adding</Title>
                </Body>
                <Right />
            </Header>
            <Header searchBar rounded>
                <Item>
                    <Icon active name="search" />
                    <Input placeholder="請輸入 YouTube 影片網址" />
                    <Icon active name="logo-youtube" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content padder>
                <Form style={{flex: 1, flexDirection: "row"}}>
                    <Item floatingLabel style={{ flex: 3 }}>
                        <Label>Start time</Label>
                        <Input keyboardType="numeric" />
                    </Item>
                    <Text style={{ flex: 1, width: 30 }} />
                    <Item floatingLabel last style={{ flex: 3 }}>
                        <Label>End time</Label>
                        <Input keyboardType="numeric" />
                    </Item>
                </Form>
                <Button
                    full rounded success
                    style={{ marginTop: 20 }}
                    onPress={() => this.props.navigation.navigate("VoiceRecord")}
                >
                    <Text>送出</Text>
                </Button>
            </Content>
        </Container>
        )
    }
}

export default VoiceAdd
