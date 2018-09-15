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

  /* Button Start */
  buttonMenu: {
    width: 130,
    justifyContent: "center"
  },
  buttonLeftMenu: {
    marginRight: 20,
  },

  /* Text Start */
  textPageName: {
    fontSize: 20
  }
});

export const commonProps = {
  buttonMenus: {
    dark: true,
    transparent: true,
    bordered: true
  }
};
