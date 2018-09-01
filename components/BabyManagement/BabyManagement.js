import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class BabyManagement extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Text>이름</Text>
          <TextInput style={styles.textInput} placeholder={'이름을 입력해주세요'} maxLength={10}></TextInput>
        </View>
        <View style={styles.name}>
          <Text>사진</Text>
          <TextInput style={styles.textInput} placeholder={'이름을 입력해주세요'} maxLength={10}></TextInput>
        </View>
        <View style={styles.name}>
          <Text>나이</Text>
          <TextInput style={styles.textInput} placeholder={'나이를 입력해주세요'} maxLength={2}></TextInput>
        </View>
        <Button title="측정장치"/>
        <Button title="선풍기"/>
        <Button title="가습기"/>
        <View style={styles.bottom}>
            <Button title="저장"/>
            <Button title="취소"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
      container: {
      backgroundColor: '#fff',
          width: '100%',
  }, name: {
        flexDirection: 'row',
        width: '100%',
      },
    textinput:{
          height:40,
        borderWidth: 3,
        width: '100%',
    },
    bottom:{
          flexDirection: 'row',
    }
});
