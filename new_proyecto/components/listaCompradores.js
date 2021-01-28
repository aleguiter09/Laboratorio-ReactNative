import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, Modal, TextInput} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {StoreContext} from '../context/storeContext';
import {DetalleComprador} from './detalleComprador';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botonesContainer: {
    margin: 10,
    justifyContent: 'space-around',
  },
  modalButton: {
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
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
});

export const ListaCompradores = () => {
  const {compradores, setCompradores} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
  const [emailNuevoComprador, setEmailNuevoComprador] = useState('');

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <AltaComprador
              compradores={compradores}
              setCompradores={setCompradores}
              nombreNuevoComprador={nombreNuevoComprador}
              emailNuevoComprador={emailNuevoComprador}
              setNombreNuevoComprador={setNombreNuevoComprador}
              setEmailNuevoComprador={setEmailNuevoComprador}
              setModalVisible={setModalVisible}
            />
            <Button
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              Cerrar
            </Button>
          </View>
        </View>
      </Modal>
      <ScrollView>
        {compradores.map((c) => (
          <DetalleComprador
            nombre={c.nombre}
            email={c.email}
            key={c.id}
          />
        ))}
      </ScrollView>
      <View style={styles.botonesContainer}>
        <Button onPress={() => setModalVisible(true)}>AGREGAR COMPRADOR</Button>
      </View>
    </View>
  );
};

const AltaComprador = ({
  compradores,
  setCompradores,
  nombreNuevoComprador,
  emailNuevoComprador,
  setNombreNuevoComprador,
  setEmailNuevoComprador,
  setModalVisible,
}) => {
  return (
    <>
      <Text category="h2">Dar de alta comprador</Text>
      <TextInput
        placeholder="Nombre y Apellido"
        value={nombreNuevoComprador}
        style={styles.textInput}
        onChangeText={(text) => {
          setNombreNuevoComprador(text)
        }}
      />
      <TextInput
        placeholder="E-mail"
        value={emailNuevoComprador}
        style={styles.textInput}
        onChangeText={(text) => {
          setEmailNuevoComprador(text);
        }}
      />
      <Button
        style={styles.modalButton}
        onPress={() => {
          setCompradores([
            ...compradores, 
            {
              nombre: nombreNuevoComprador,
              email: emailNuevoComprador,
              id: Math.random().toString(10),
            }
          ]);
          setNombreNuevoComprador("");
          setEmailNuevoComprador("");
          setModalVisible(false);
        }}>
        Dar de alta
      </Button>
    </>
  );
};
