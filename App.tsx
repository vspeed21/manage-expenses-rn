import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import Filtro from './src/components/Filtro';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import ListarGastos from './src/components/ListarGastos';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import {Gastos} from './src/interfaces';

const App = () => {
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState<boolean>(false);
  const [gastos, setGastos] = useState<Gastos[]>([]);
  const [showModalForm, setshowModalForm] = useState(false);
  const [gastoEditar, setGastoEditar] = useState<Gastos>({
    nombre: '',
    cantidad: '',
    categoria: '',
    id: 0,
    fecha: 0,
  });
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState<Gastos[]>([]);

  useEffect(() => {
    getPresupuesto();
    async function getPresupuesto() {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('pla_presupuesto')) ?? '';

        if (presupuestoStorage !== '') {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      async function savePresupuesto() {
        try {
          await AsyncStorage.setItem('pla_presupuesto', presupuesto);
        } catch (error) {
          console.log(error);
        }
      }
      savePresupuesto();
    }
  }, [presupuesto, isValidPresupuesto]);

  useEffect(() => {
    getGastos();
    async function getGastos() {
      try {
        const gastosStorage = await AsyncStorage.getItem('pla_gastos');
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    saveGasto();
    async function saveGasto() {
      try {
        await AsyncStorage.setItem('pla_gastos', JSON.stringify(gastos));
      } catch (error) {
        console.log(error);
      }
    }
  }, [gastos]);

  const handleNuevoPresupuesto = (presupuestoInput: string) => {
    if (Number(presupuestoInput) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser un numero negativo');
    }
  };

  function handleGasto(gasto: Gastos) {
    if (Object.values(gasto).includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto?.id !== 0) {
      const gastoActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastoActualizados);
    } else {
      gasto.id = Date.now();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setshowModalForm(false);
  }

  function eliminarGasto(id: number) {
    Alert.alert('¿Eliminar Gasto?', 'Perderas todos los datos', [
      {text: 'Cancelar'},
      {
        text: 'Si, Eliminar',
        onPress: () => {
          const gastosActualizados = gastos.filter(gas => gas.id !== id);
          setGastos(gastosActualizados);
          setGastoEditar({
            nombre: '',
            cantidad: '',
            categoria: '',
            fecha: 0,
            id: 0,
          });
          setshowModalForm(false);
        },
      },
    ]);
  }

  function resetApp() {
    Alert.alert(
      '¿Deseas reiniciar la aplicacion?',
      'Esto eliminara todos los datos',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, reiniciar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidPresupuesto(false);
              setPresupuesto('');
              setGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetApp={resetApp}
            />
          ) : (
            <NuevoPresupuesto
              setPresupuesto={setPresupuesto}
              presupuesto={presupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto ? (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListarGastos
              gastos={gastos}
              setShowModalForm={setshowModalForm}
              setGastoEditar={setGastoEditar}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </>
        ) : null}
      </ScrollView>

      {showModalForm ? (
        <Modal animationType="slide" visible={showModalForm}>
          <FormularioGasto
            setShowModalForm={setshowModalForm}
            handleGasto={handleGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      ) : null}

      {isValidPresupuesto ? (
        <Pressable
          style={styles.agregarGasto}
          onPress={() => setshowModalForm(true)}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: 'F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  agregarGasto: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 50,
    height: 50,
  },
});

export default App;
