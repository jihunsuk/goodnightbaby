import React from "react";
import { Button, Text, View } from "native-base";
import { commonStyles } from "../../styles";

/**
 * Custom native-base button
 */
export default function HeaderTemplate({ title }) {
  return (
    <View style={[commonStyles.viewPageName, commonStyles._viewPageName]}>
      <Text style={commonStyles.textPageName}>{title}</Text>
    </View>
  );
}
