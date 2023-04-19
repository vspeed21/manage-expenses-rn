import React, {useState, useEffect} from 'react';
import {
  Pressable,
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';
import {Gastos} from '../interfaces';

interface Props {
  setShowModalForm: (state: boolean) => void;
  handleGasto: (gasto: Gastos) => void;
  gastoEditar: Gastos;
  setGastoEditar: (state: Gastos) => void;
  eliminarGasto: (id: number) => void;
}

function FormularioGasto({
  setShowModalForm,
  handleGasto,
  gastoEditar,
  setGastoEditar,
  eliminarGasto,
}: Props) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState<number>(0);
  const [fecha, setFecha] = useState<number>(0);

  useEffect(() => {
    if (gastoEditar?.nombre) {
      setNombre(gastoEditar?.nombre);
      setCantidad(gastoEditar?.cantidad);
      setCategoria(gastoEditar?.categoria);
      setFecha(gastoEditar?.fecha);
      setId(gastoEditar?.id);
    }
  }, [gastoEditar]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.contenedor}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={gastoEditar?.nombre ? styles.actionButtons : null}>
            <Pressable
              style={[
                styles.cancelar,
                gastoEditar?.nombre ? styles.width : null,
              ]}
              onPress={() => {
                setShowModalForm(false);
                setGastoEditar({
                  nombre: '',
                  cantidad: '',
                  categoria: '',
                  fecha: 0,
                  id: 0,
                });
              }}>
              <Text style={styles.cancelarText}>cancelar</Text>
            </Pressable>

            {gastoEditar?.nombre ? (
              <Pressable
                style={[styles.cancelar, styles.width, styles.eliminar]}
                onPress={() => eliminarGasto(id)}>
                <Text style={styles.cancelarText}>Eliminar</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.formulario}>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre gasto</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del gasto Ej: Comida"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Cantidad gasto</Text>
              <TextInput
                style={styles.input}
                placeholder="Cantidad del gasto Ej: 500"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Categoria gasto</Text>
              <Picker
                style={styles.input}
                selectedValue={categoria}
                onValueChange={itemValue => {
                  setCategoria(itemValue);
                }}>
                <Picker.Item label="--Seleccione--" value="" />
                <Picker.Item label="Ahorro" value="ahorro" />
                <Picker.Item label="Comida" value="comida" />
                <Picker.Item label="Casa" value="casa" />
                <Picker.Item label="Gastos Varios" value="gastos" />
                <Picker.Item label="Ocio" value="ocios" />
                <Picker.Item label="Salud" value="salud" />
                <Picker.Item label="Suscripciones" value="suscripciones" />
              </Picker>
            </View>
          </View>

          <Pressable
            onPress={() =>
              handleGasto({nombre, cantidad, categoria, id, fecha})
            }
            style={styles.button}>
            <Text style={styles.buttonText}>
              {gastoEditar?.nombre ? 'Guardar cambios' : 'Agregar Gasto'}
            </Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-around',
  },

  contenedor: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  cancelar: {
    backgroundColor: '#F3C02F',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  eliminar: {
    backgroundColor: 'red',
  },
  width: {
    width: '45%',
  },
  cancelarText: {
    textTransform: 'uppercase',
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formulario: {
    ...globalStyles.contenedor,
    marginTop: -40,
    height: 350,
    justifyContent: 'space-around',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
    color: '#64748B',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3B82F6',
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default FormularioGasto;
