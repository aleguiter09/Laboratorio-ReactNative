import React, {useContext, useState} from 'react';
import { View, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity,} from 'react-native';
import {Card, Text, Button, Icon} from '@ui-kitten/components';
import {StoreContext} from '../context/storeContext';
import {ColorPicker} from 'react-native-color-picker';

const styles = StyleSheet.create({
  container: {flex: 1},
  card: {flex: 1, margin: 5},
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  modalButton: {
    marginVertical: 10,
  },
});

export const ListaCategorias = () => {
  const {categorias, setCategorias} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [primeraPantalla, setPrimeraPantalla] = useState(true);
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState('');
  const [colorNuevaCategoria, setColorNuevaCategoria] = useState('');

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {primeraPantalla && (
              <PrimeraPantalla
                categorias={categorias}
                setCategorias={setCategorias}
                nombreNuevaCategoria={nombreNuevaCategoria}
                setNombreNuevaCategoria={setNombreNuevaCategoria}
                colorNuevaCategoria={colorNuevaCategoria}
                setColorNuevaCategoria={setColorNuevaCategoria}
                setModalVisible={setModalVisible}
                setPrimeraPantalla={setPrimeraPantalla}
              />
            )}
            {!primeraPantalla && (
              <SegundaPantalla
                setPrimeraPantalla={setPrimeraPantalla}
                setColorNuevaCategoria={setColorNuevaCategoria}
              />
            )}
            <Button
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              Cerrar
            </Button>
          </View>
        </View>
      </Modal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}></Button>
      <FlatList
        data={categorias}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: item.color}}
              key={item.id}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {item.nombre}
              </Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
  nombreNuevaCategoria,
  setNombreNuevaCategoria,
  colorNuevaCategoria,
  setColorNuevaCategoria,
  setCategorias,
  categorias,
  setModalVisible,
  setPrimeraPantalla,
}) => {
  return (
    <>
      <Text category="h2">Crear una categoria</Text>
      <TextInput
        placeholder="Nombre de categoria"
        value={nombreNuevaCategoria}
        style={styles.textInput}
        onChangeText={(text) => {
          setNombreNuevaCategoria(text);
        }}
      />
      <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
        <TextInput
          placeholder="Color"
          editable={false}
          value={colorNuevaCategoria}
          style={styles.textInput}
          onChangeText={(text) => {
            setColorNuevaCategoria(text);
          }}
        />
      </TouchableOpacity>

      <Button
        style={styles.modalButton}
        onPress={() => {
          setCategorias([
            ...categorias,
            {
              nombre: nombreNuevaCategoria,
              color: colorNuevaCategoria,
              id: Math.random(),
            },
          ]);
          setNombreNuevaCategoria('');
          setModalVisible(false);
          setColorNuevaCategoria('');
        }}>
        Crear categoria
      </Button>
    </>
  );
};

const SegundaPantalla = ({setColorNuevaCategoria, setPrimeraPantalla}) => {
  return (
    <>
      <Text category="h3">Elegir color</Text>
      <ColorPicker
        onColorSelected={(color) => {
          setPrimeraPantalla(true);
          setColorNuevaCategoria(color);
        }}
        hideSliders={true}
        style={{flex: 1}}
      />
      <Button
        style={styles.modalButton}
        onPress={() => setPrimeraPantalla(true)}>
        Volver
      </Button>
    </>
  );
};

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
