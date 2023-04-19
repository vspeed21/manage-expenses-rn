import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Gastos } from '../interfaces';
import Gasto from './Gasto';

interface Props {
  gastos: Gastos[]
  setShowModalForm: (state: boolean) => void,
  setGastoEditar: (state: Gastos) => void
  gastosFiltrados: Gastos[],
  filtro: string,
}

function ListarGastos({gastos, setShowModalForm, setGastoEditar, filtro, gastosFiltrados}: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro ? (
        <>
          <Text
            style={styles.noGastos}
            >
              {gastosFiltrados.length === 0 ? 'No hay gastos en esta categoria' : 'Gastos'}
            </Text>
          {gastosFiltrados.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setShowModalForm={setShowModalForm}
              setGastoEditar={setGastoEditar}
            />
        ))}
        </>
      ) : (
        <>
            <Text
              style={styles.noGastos}
            >
              {gastos.length === 0 ? 'No hay gastos aún' : 'Gastos'}
            </Text>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setShowModalForm={setShowModalForm}
                setGastoEditar={setGastoEditar}
              />
            ))}
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 70,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748B',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  noGastos: {
    fontSize: 20,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: -30,
  },
});

export default ListarGastos;
