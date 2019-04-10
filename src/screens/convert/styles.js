const React = require("react-native")
const { Dimensions } = React
const deviceWidth = Dimensions.get("window").width

export default {
    container: {
      backgroundColor: "#EAEAEA"
    },
    text: {
      alignSelf: "center",
      marginBottom: 7
    },
    mb: {
      marginBottom: 15
    },
    centerText: {
      width: "100%",
      textAlign: "center"
    },
    recordBtn: {
      backgroundColor:"#D32F2F",
      marginTop: 5,
      marginLeft: "50%",
      left: deviceWidth / -4,
      borderRadius: deviceWidth / 2,
      height: deviceWidth / 2,
      width: deviceWidth / 2
    },
    recordBtnPress: {
      backgroundColor:"#B71C1C"
    },
    recordIcon: {
      fontSize: 40,
      marginLeft: (deviceWidth / 4) - 20
    },
    icon: {
      marginLeft: 80,
      marginRight: 11
    }
};
