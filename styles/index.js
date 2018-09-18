import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  /* View Start */
  viewPageName: {
    backgroundColor: "#e0e0e0",
    borderWidth: 0,
    height: 40,
    justifyContent: "center"
  },
  viewMenu: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  viewCenter: {
    alignItems: "center",
    justifyContent: "center"
  },
  viewIconWrapper: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: 45,
    height: 45,
    backgroundColor: "white"
  },
  _viewPageName: {
    marginTop: 10,
    marginBottom: 10
  },
  viewSubHeader: {
    backgroundColor: "#e0e0e0",
    borderWidth: 0,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20
  },
  scrollViewDeviceList: {
    margin: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    height: 200
  },
  viewDevice: {
    flexDirection: "row",
    marginTop: 2,
    padding: 15,
    justifyContent: "space-between"
  },

  /* Button Start */
  buttonMenu: {
    width: 130,
    justifyContent: "center"
  },
  buttonLeftMenu: {
    marginRight: 20
  },

  /* Text Start */
  textPageName: {
    fontSize: 20,
    marginLeft: 20
  },
  textAuto: {
    color: "green",
    fontSize: 17
  },
  textScrollItem: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 3
  },

  /* Icon Start */
  iconMenu: {
    fontSize: 30
  },
  iconDevice: {
    fontSize: 20
  },

  /* Switch Start */
  switchDefault: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginLeft: 10,
    marginRight: 10
  }
});

export const commonProps = {
  buttonMenus: {
    dark: true,
    transparent: true,
    bordered: true
  }
};
