import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import { formatearCantidad } from '../helpers';
import { Gastos } from '../interfaces';
import globalStyles from '../styles';

interface Props {
  presupuesto: string,
  gastos: Gastos[],
  resetApp: () => void,
}

function ControlPresupuesto({presupuesto, gastos, resetApp}: Props) {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total , 0);
    setGastado(totalGastado);
    const totalDisponible = Number(presupuesto) - gastado;
    setDisponible(totalDisponible);

    const nuevoPorcentaje = (
      ((Number(presupuesto) - totalDisponible) / Number(presupuesto)) * 100
    );
    setPorcentaje(nuevoPorcentaje);

  }, [gastado, gastos, presupuesto]);

  return (
    <View style={globalStyles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          radius={100}
          valueSuffix="%"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={15}
          title="Gastado"
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={15}
        />
      </View>

      <View style={styles.textos}>
        <TouchableOpacity
          style={styles.btnReset}
          onPress={resetApp}
        >
          <Text style={styles.btnResetText}>Reinicar app</Text>
        </TouchableOpacity>

        <Text style={styles.valor}>
            <Text style={styles.label}>Presupuesto: </Text>
            {formatearCantidad(presupuesto)}
          </Text>

          <Text style={styles.valor}>
            <Text style={styles.label}>Disponible: </Text>
            {formatearCantidad(disponible)}
          </Text>

          <Text style={styles.valor}>
            <Text style={styles.label}>Gastado: </Text>
            {formatearCantidad(gastado)}
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centrarGrafica: {
    alignItems: 'center',
  },
  textos: {
    marginTop: 50,
  },
  btnReset: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  btnResetText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  valor: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});

export default ControlPresupuesto;
