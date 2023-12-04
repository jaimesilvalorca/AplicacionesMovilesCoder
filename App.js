import { StatusBar } from 'expo-status-bar'
import { Button, FlatList, StyleSheet, Text, TextInput, View, Modal, ToastAndroid } from 'react-native'
import { useState } from 'react'
import CustomModal from './components/Modal/CustomModal'
import CustomInput from './components/Input/CustomInput'

export default function App() {
  const [textItem, setTextItem] = useState('')
  const [itemList, setItemList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelectedToDeleted, setItemSelectedToDeleted] = useState({})

  const onChangeTextHandler = (text) => {
    setTextItem(text)
  }

  const listTask = () => {
    setItemList(prevState => [...prevState, { id: Math.random().toString(), value: textItem, buttonPressed: false }])
    setTextItem('')
  }

  const onSelectItemHandler = (id) => {
    setItemSelectedToDeleted(itemList.find((item) => item.id === id))
    setModalVisible(!modalVisible)
  }

  const onDeleteItemHandler = () => {
    setItemList(itemList.filter((item) => item.id !== itemSelectedToDeleted.id))
    setModalVisible(!modalVisible)
  }

  const onCompleteItemHandler = (id) => {
    setItemList(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, buttonPressed: !item.buttonPressed } : item
      )
    )
    ToastAndroid.show('Tarea completa',ToastAndroid.LONG)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemList}>
        <Button
          title='✓'
          onPress={() => onCompleteItemHandler(item.id)}
        />
        <Text style={item.buttonPressed ? styles.buttonOn : styles.buttonOff}>
          {item.value}
        </Text>
        <Button
          title='x'
          onPress={() => onSelectItemHandler(item.id)}
        />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <CustomInput
          placeholderProp='Ingresar Tarea'
          onChangeTextHandlerEvent={onChangeTextHandler}
          textItemProp={textItem}
          listTaskEvent={listTask}
        />
        <View>
          <FlatList
            data={itemList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <CustomModal
        animationTypeProp='slide'
        isVisibleProp={modalVisible}
        itemSelectedProp={itemSelectedToDeleted}
        onDeleteItemHandlerEvent={onDeleteItemHandler}
        setModalVisibleEvent={setModalVisible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 100
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: "#a2d2ff",
    borderRadius: 10,
  },
  modalMessageContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  buttonOn: {
    color: 'green'
  },
  buttonOff: {
    color: 'black'
  }
})
