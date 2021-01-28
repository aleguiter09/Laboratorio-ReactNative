import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, ScrollView, Modal, TouchableOpacity} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {screens} from '../App';
import Tarjeta from './tarjeta';
import {StoreContext} from '../context/storeContext';
import {DetalleComprador} from './detalleComprador';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalCompradoresView: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
    padding: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  modalCompradoresContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  modalButton: {
    marginVertical: 10,
  },
  modalConfirmarContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalConfirmarView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 10,
  },
});

const Listar = ({...props}) => {
  const {productos, agregarProductoAComprador, obtenerCompradoresDelProducto} = useContext(StoreContext);
  const {compradores} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmarVisible, setConfimarComprador] = useState(false);
  const [nombreConfirmado, setNombreConfirmado] = useState("");
  const [emailConfirmado, setEmailConfirmado] = useState("");
  const [confirmado, setConfirmado] = useState("");
  const [producto, setProducto] = useState("");
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalCompradoresContainer}>
          <View style={styles.modalCompradoresView}>
            <SeleccionarComprador 
              compradores={compradores} 
              setModalVisible={setModalVisible} 
              setConfimarComprador={setConfimarComprador}
              setNombreConfirmado={setNombreConfirmado}
              setEmailConfirmado={setEmailConfirmado} 
              setConfirmado={setConfirmado}
            />
            <Button style={styles.modalButton} onPress={() => setModalVisible(false)}>
              Cerrar
            </Button>
          </View>
        </View>
      </Modal>
      <Modal visible={confirmarVisible} transparent={true} animationType="slide">
        <View style={styles.modalConfirmarContainer}>
          <View style={styles.modalConfirmarView}>
            <DetalleComprador 
              nombre={nombreConfirmado}
              email={emailConfirmado} 
            />
            <Button style={styles.modalButton} onPress={ () => {
                setConfimarComprador(false);
                agregarProductoAComprador(confirmado, producto);
                console.log(producto.title)
                console.log(confirmado.nombre)
                console.log(obtenerCompradoresDelProducto(producto))
              }}>
              Confirmar
            </Button>
            <Button style={styles.modalButton} onPress={() => setConfimarComprador(false)}>
              Cerrar
            </Button>
          </View>
        </View>
      </Modal>
      {productos.length > 0 ? (
        <ScrollView>
          {productos.map((producto) => (
            <Tarjeta
              titulo={producto.title}
              precio={producto.price}
              onPressVerDetalles={() => {
                navigator.navigate(screens.detalle, {producto});
              }}
              onPressComprar={() => {
                setProducto(producto)
                setModalVisible(true);
              }}
              key={producto.id}
            />
          ))}
        </ScrollView>
      ) : (
        <Text category="h3" status="info">
          Cargando productos disponibles..
        </Text>
      )}
    </View>
  );
};

export default Listar;

const SeleccionarComprador = ({
  compradores,
  setModalVisible,
  setConfimarComprador,
  setEmailConfirmado,
  setNombreConfirmado,
  setConfirmado
}) => {
  return (
    <View style={styles.container}>
      <Text category="h4" style={{marginTop: 10, marginBottom: 15, marginHorizontal: 10}}>Seleccione un comprador</Text>
      <ScrollView>
        {compradores.map((c) => (
          <TouchableOpacity onPress={() => {
            setModalVisible(false); 
            setConfimarComprador(true);
            setNombreConfirmado(c.nombre);
            setEmailConfirmado(c.email);
            setConfirmado(c);
          }}>
            <DetalleComprador 
              nombre={c.nombre} 
              email={c.email} 
              key={c.id} 
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
