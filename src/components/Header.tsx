import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

function Header() {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de gastos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    paddingTop: 20,
  },
});

export default Header;
