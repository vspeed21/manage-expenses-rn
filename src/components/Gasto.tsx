import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { formatearCantidad, formatearFecha } from '../helpers';
import { Gastos } from '../interfaces';
import globalStyles from '../styles';

interface Props {
  gasto: Gastos,
  setShowModalForm: (state: boolean) => void,
  setGastoEditar: (state: Gastos) => void,
}

function Gasto({gasto, setShowModalForm, setGastoEditar}: Props) {
  const { nombre, cantidad, categoria, fecha } = gasto;

  return (
    <Pressable
      onLongPress={() => {
        setShowModalForm(true);
        setGastoEditar(gasto);
      }}
    >
      <View style={styles.contenedor}>
        <View style={styles.contenido}>

          <View style={styles.contenedorImagen}>
            <Image
              style={styles.imagen}
              source={categoria === 'ahorro' ? require('../img/icono_ahorro.png') : categoria === 'comida' ? require('../img/icono_comida.png') : categoria === 'casa' ? require('../img/icono_casa.png') : categoria === 'gastos' ? require('../img/icono_gastos.png') : categoria === 'ocio' ? require('../img/icono_ocio.png') : categoria === 'salud' ? require('../img/icono_salud.png') : require('../img/icono_suscripciones.png')}
            />

            <View style={styles.textos}>
              <Text style={styles.categoria}>{categoria}</Text>
              <Text style={styles.nombre}>{nombre}</Text>
              <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
            </View>
          </View>

          <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>
        </View>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 5,
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  textos: {
    flex: 1,
  },
  categoria: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 20,
    color: '#63748B',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 17,
    fontWeight: '900',
  },
  fecha: {
    fontSize: 15,
    color: '#DB2777',
    fontWeight: 'bold',
  },
});

export default Gasto;
