import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import CustomBtn from '../components/CustomBtn';
import {COLORS} from '../constants/Theme';

const HomeScreen = () => {
  const [toDos, setToDos] = useState([]);
  const [taskToAdd, setTaskToAdd] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const addTaskRef = createRef();

  const handlePress = () => setShowModal(true);

  const handleDelete = id => {
    setToDos(currToDos => {
      return currToDos.filter(todo => todo.id !== id);
    });
    alert('To do task deleted successfully!');
    console.log('TO DO Deleted!');
  };

  const handleAdd = taskValue => {
    setToDos(currToDos => [
      ...currToDos,
      {
        id: Math.random().toString(),
        task: taskValue,
      },
    ]);
    setRefreshList(!refreshList);
    setTaskToAdd(null);
    setShowModal(!showModal);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderItemContainer}
        onLongPress={() => {
          handleDelete(item.id);
        }}>
        <Text style={styles.renderItemText}>{item.task}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleAdd}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.inputContainer}>
                <KeyboardAvoidingView enabled>
                  <View style={{flex: 1}}>
                    <Text style={styles.label}>Add new task :- </Text>
                    <TextInput
                      value={taskToAdd}
                      onChangeText={text => setTaskToAdd(text)}
                      style={styles.input}
                      multiline={true}
                      ref={addTaskRef}
                      returnKeyType="next"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                    />
                  </View>
                </KeyboardAvoidingView>
                <CustomBtn
                  title="Add Task"
                  onPress={() => {
                    handleAdd(taskToAdd);
                  }}
                  customBtnStyle={{paddingVertical: 10}}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <CustomBtn title="Add Task" onPress={handlePress} />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Todays To do list :-</Text>
        </View>
        {toDos.length !== 0 ? (
          <FlatList
            data={toDos}
            extraData={refreshList}
            renderItem={renderItem}
            style={styles.flatList}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={[styles.flatList, {flex: 1}]}>
            <View style={styles.renderItemContainer}>
              <Text style={styles.renderItemText}>
                All today's task are completed. {'\n'}Add some new tasks.{' '}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.black200,
  },
  container: {flex: 1},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 300,
    // height: 350,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.black200,
  },
  label: {
    color: COLORS.white200,
    fontSize: 18,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: COLORS.grey100,
    color: COLORS.white200,
    fontSize: 15,
  },
  headingContainer: {
    marginVertical: 15,
  },
  heading: {
    color: COLORS.white200,
    fontSize: 25,
    fontWeight: 'bold',
  },
  flatList: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: COLORS.grey100,
  },
  renderItemContainer: {
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
    backgroundColor: COLORS.black200,
  },
  renderItemText: {
    color: COLORS.white200,
    fontSize: 18,
    fontWeight: '700',
  },
});
