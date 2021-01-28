import React, {useContext, useState} from "react";
import {View, StyleSheet,} from "react-native"
import {Card, Text,} from "@ui-kitten/components";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    containerTexto: {
        margin: 3,
        flexDirection: "row"
    }
})

export const DetalleComprador = ({nombre, email}) => {
    return (
        <View>
        <Card style={styles.card}>
            <View style={styles.containerTexto}>
                <Text style={{fontWeight: "bold"}}>Nombre: </Text>
                <Text>{nombre}</Text>
            </View>
            <View style={styles.containerTexto}>
                <Text style={{fontWeight: "bold"}}>Email: </Text>
                <Text>{email}</Text>
            </View>
        </Card>
        </View>
    )
  }
