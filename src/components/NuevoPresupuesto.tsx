import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import globalStyles from '../styles';

interface Props {
  handleNuevoPresupuesto: (presupuesto: string) => void;
  setPresupuesto: (presupuesto: string) => void;
  presupuesto: string;
}

function NuevoPresupuesto({
  handleNuevoPresupuesto,
  setPresupuesto,
  presupuesto,
}: Props) {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={globalStyles.contenedor}>
      <Text style={styles.label}>Define tu presupuesto</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto Ej: 500"
        style={styles.input}
        value={presupuesto}
        onChangeText={setPresupuesto}
      />

      <TouchableOpacity
        onPress={() => handleNuevoPresupuesto(presupuesto)}
        style={styles.boton}>
        <Text style={styles.botonText}>Agregar Presupuesto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3b82f6',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  boton: {
    marginTop: 25,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  botonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default NuevoPresupuesto;
