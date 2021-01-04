import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import {mapStateToProps} from '../../Store/storeUtils';
import {useDispatch, connect} from 'react-redux';
import {
  addTask,
  completeTask,
  deleteTask,
  redoTask,
} from '../../Store/Actions/taskActions';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useRef} from 'react';

const ToDoApp = (props) => {
  const [searchString, setSearchString] = useState('');
  const [toggle, setToggle] = useState(true);
  const [toDoText, setToDoText] = useState('');
  const [filerToDoData, setFilterToDoData] = useState([]);
  const [filterToDoDone, setFilterToDoDone] = useState([]);
  const dispatch = useDispatch();
  const [tileRef = useRef(null);

  useEffect(() => {
    const filterData = props.appReducer.taskToDo.filter((value) =>
      value.toLowerCase().includes(searchString.toLowerCase()),
    );
    const filterDone = props.appReducer.taskCompleted.filter((value) =>
      value.toLowerCase().includes(searchString.toLowerCase()),
    );
    setFilterToDoData(filterData);
    setFilterToDoDone(filterDone);
  }, [searchString, props.appReducer.taskToDo, props.appReducer.taskCompleted]);

  const renderFn1 = ({item, index}) => {
    return (
      <Swipeable
        ref={tileRef}
        renderRightActions={() => (
          <TouchableOpacity
            style={styles.deleteWrapper}
            onPress={() => {
              tileRef.current.close();
              console.log('ref', tileRef.current);

              // dispatch(deleteTask(index, true));
            }}>
            <Image
              source={require('../../Assets/Images/dustbin.png')}
              style={styles.deleteButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => {
            dispatch(completeTask(index));
            // let arr = toDoData;
            // arr.splice(index, 1);
            // setToDoData(arr);
            // setToDoDone((prevArray) => [...prevArray, item]);
            // setSearchString('');
          }}>
          <Image
            source={require('../../Assets/Images/box4check.png')}
            style={styles.checkBox}
          />
          <Text style={styles.toDoText}>{item}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  const renderFn2 = ({item, index}) => (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        dispatch(redoTask(index));
        // let arr = toDoDone;
        // arr.splice(index, 1);
        // setToDoDone(arr);
        // setToDoData((prevArray) => [item, ...prevArray]);
        // setSearchString('');
      }}>
      <Image
        source={require('../../Assets/Images/checkbox.png')}
        style={styles.checkBox}
      />
      <Text
        style={[
          styles.toDoText,
          {color: '#5D5D5D', textDecorationLine: 'line-through'},
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const addToDo = () => {
    dispatch(addTask(toDoText));
    // setToDoData((prevArray) => [...prevArray, toDoText]);
    setSearchString('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require('../../Assets/Images/magGlass.png')}
          style={styles.magGlassImage}
        />
        <TextInput
          onChangeText={(value) => setSearchString(value)}
          value={searchString}
          placeholder="Search for Tasks"
          placeholderTextColor="#FFF"
          style={styles.searchInput}
        />
      </View>
      <ScrollView>
        <FlatList
          // style={{backgroundColor: 'yellow'}}
          // contentContainerStyle={{backgroundColor: 'red'}}
          data={filerToDoData}
          renderItem={(item, index) => renderFn1(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
        {props.appReducer.taskCompleted.length > 0 ? (
          <Text style={{color: '#FFF', marginTop: 15}}>completed</Text>
        ) : null}
        <FlatList
          // style={{backgroundColor: 'blue'}}
          // contentContainerStyle={{backgroundColor: 'green'}}
          data={filterToDoDone}
          renderItem={(item, index) => renderFn2(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {toggle ? (
        <TouchableOpacity
          style={styles.addContainer}
          onPress={() => setToggle(!toggle)}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.toDoTextInputWrapper}>
          <TextInput
            // multiline
            returnKeyType="done"
            placeholderTextColor="#707070"
            style={styles.toDoTextInput}
            autoFocus={true}
            onChangeText={(value) => setToDoText(value)}
            value={toDoText}
            placeholder="Add Checklist"
            onSubmitEditing={() => {
              addToDo();
              setToggle(!toggle);
              setToDoText('');
            }}
            onBlur={() => setToggle(!toggle)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default connect(mapStateToProps)(ToDoApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  searchContainer: {
    height: 40,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 10,
  },
  magGlassImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  searchInput: {
    padding: 0,
    marginLeft: 5,
    fontSize: 12,
    color: '#FFF',
  },
  addContainer: {
    height: 60,
    aspectRatio: 1,
    position: 'absolute',
    right: 10,
    bottom: 5,
    borderRadius: 30,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: '#FFF',
    fontSize: 30,
  },
  tile: {
    backgroundColor: '#1A1A1A',
    height: 60,
    alignSelf: 'stretch',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  checkBox: {
    height: 15,
    width: 15,
  },
  toDoText: {
    color: '#FFF',
    marginHorizontal: 10,
  },
  toDoTextInput: {
    color: '#FFF',
  },
  toDoTextInputWrapper: {
    backgroundColor: '#1A1A1A',
    borderRadius: 5,
  },
  deleteWrapper: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 10,
  },
  deleteButton: {
    height: 20,
    width: 20,
  },
});
