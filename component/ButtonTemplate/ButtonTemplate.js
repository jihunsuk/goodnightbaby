import React from "react";
import { Button, Text } from "native-base";

/**
 * Custom native-base button
 */
export default function ButtonTemplate({ buttonProps, onPress, style, title }) {
  return (
    <Button {...buttonProps} onPress={onPress} style={style}>
      <Text>{title}</Text>
    </Button>
  );
}
