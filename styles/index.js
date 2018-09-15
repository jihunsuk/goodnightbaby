import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  /* View Start */
  viewPageName: {
    backgroundColor: "#e0e0e0",
    borderWidth: 0,
    height: 40,
    alignItems: "center",
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
    fontSize: 20
  },

  /* Icon Start */
  iconMenu: {
    fontSize: 30
  },

  /* Switch Start */
  switchDefault: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginLeft: 15
  }
});

export const commonProps = {
  buttonMenus: {
    dark: true,
    transparent: true,
    bordered: true
  }
};
