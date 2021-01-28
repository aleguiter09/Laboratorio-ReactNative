import React from 'react';
import { StyleSheet, View, } from 'react-native';
  import {Card, Button, Text} from "@ui-kitten/components"

  const styles = StyleSheet.create({
    tituloContainer: {
        flexDirection: "column",
        marginBottom: 10,
    },
    botonesContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
    },
    precio: {
        fontSize: 15,
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
    }
  });

const Tarjeta = ({titulo, precio, onPressVerDetalles, onPressComprar}) => {
    return ( 
    <Card style={styles.card}>
        <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.precio}>Precio: $ {precio}</Text>
        </View>
        <View style={styles.botonesContainer}>
            <Button appearance="outline" onPress={onPressVerDetalles}>
                Ver detalles
            </Button>
            <Button status="success" onPress={onPressComprar}>
                COMPRAR
            </Button>
        </View>
    </Card>
    );
};

export default Tarjeta;
