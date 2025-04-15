import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [sorteados, setSorteados] = useState([]);
  const [userNumbers, setUserNumbers] = useState([]);
  const [acertos, setAcertos] = useState([]);

  const handleSortear = () => {
    const userNumbersArray = input
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num >= 1 && num <= 60);

    if (userNumbersArray.length === 0) {
      alert('Insira pelo menos um número entre 01 e 60!');
      return;
    }

    const sorteadosArray = [];
    while (sorteadosArray.length < 6) {
      const n = Math.floor(Math.random() * 60) + 1;
      if (!sorteadosArray.includes(n)) {
        sorteadosArray.push(n);
      }
    }

    const acertosArray = sorteadosArray.filter(num => userNumbersArray.includes(num));
    setSorteados(sorteadosArray);
    setUserNumbers(userNumbersArray);
    setAcertos(acertosArray);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎲 Sorteio de Números</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seus números (ex: 5, 12, 23...)"
        value={input}
        onChangeText={setInput}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSortear}>
        <Text style={styles.buttonText}>Sortear 6 Números</Text>
      </TouchableOpacity>

      {sorteados.length > 0 && (
        <View style={styles.results}>
          <View style={styles.resultBlock}>
            <Text style={styles.label}>Números Sorteados:</Text>
            <Text style={styles.text}>{sorteados.sort((a, b) => a - b).join(', ')}</Text>
          </View>
          <View style={styles.resultBlock}>
            <Text style={styles.label}>Seus Números:</Text>
            <Text style={styles.text}>{userNumbers.sort((a, b) => a - b).join(', ')}</Text>
          </View>
          <View style={styles.resultBlock}>
            <Text style={styles.label}>Acertos:</Text>
            <Text style={styles.text}>
              {acertos.length > 0 ? acertos.sort((a, b) => a - b).join(', ') : 'Nenhum 😢'}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  results: {
    marginTop: 20,
  },
  resultBlock: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});