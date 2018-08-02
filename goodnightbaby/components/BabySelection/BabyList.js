import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Store from '../../store'

export default class BabyList extends React.Component {
  render() {
    let Babys = testBabys.map((baby, idx) =>
        <Baby baby={baby} key={idx}/>
    );

    return (
        <ScrollView style={styles.container}>
          {Babys}
          {Babys}
          {Babys}
        </ScrollView>
    );
  }
}

class Baby extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Store.Consumer>
          {store => {
            return (
                <View style={styles.baby}>
                  <TouchableHighlight style={styles.baby} onPress={() => {
                    store._setBaby(this.props.baby, 'Home')
                  }}>
                    <View style={styles.baby}>
                      <Image
                          style={styles.image}
                          source={{uri: 'https://mblogthumb-phinf.pstatic.net/20140917_247/jin21676_14108854049566wssz_PNG/1410885403714_Dango_Daikazoku.png?type=w2'}}
                      />
                      <Text>{this.props.baby.name}</Text>
                    </View>
                  </TouchableHighlight>
                  <View style={styles.baby}>
                    <Button title="수정" onPress={() => {
                      store._setPage("BabyModification")
                    }}/>
                    <Button title="삭제" onPress={() => {
                      store._setPage("BabyDeletion")
                    }}/>
                  </View>
                </View>
            );
          }}
        </Store.Consumer>
    )
  }
}

const testBabys = [{
  name: '이상현',
},
  {
    name: '석지훈',
  },
  {
    name: '정윤수',
  },
  {
    name: '조현욱',
  },
  {
    name: '임대영',
  },
  {
    name: '권성수',
  },
  {
    name: '임병언',
  },
];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: StatusBar.currentHeight + 40 + 250,
    left: 5,
    right: 5,
    bottom: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  baby: {
    flexDirection: 'row',
  }
});