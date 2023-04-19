import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import globalStyles from '../styles';
import { Gastos } from '../interfaces';

interface Props {
  filtro: string,
  setFiltro: (state: string) => void,
  gastos: Gastos[]
  setGastosFiltrados: (state: Gastos[]) => void,
}

function Filtro({filtro, setFiltro, gastos, setGastosFiltrados}: Props) {

  useEffect(() => {
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
    setGastosFiltrados(gastosFiltrados);
  }, [filtro, gastos, setGastosFiltrados]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar gastos</Text>

      <Picker
        selectedValue={filtro}
        onValueChange={(value) => {
          setFiltro(value);
        }}
      >
        <Picker.Item label={filtro ? 'Todas las categorias' : '--Seleccione--'} value="" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos Varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocios" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#64748B',
  },
});

export default Filtro;
