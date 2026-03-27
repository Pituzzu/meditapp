import { Ionicons } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../../components/Navbar';

export default function App() {
  const [umore, setUmore] = useState<string | null>(null);
  const [confermaUmore, setConfermaUmore] = useState('');
  const [bottoni, setBottoni] = useState(true);

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  const moods = [
    { nome: 'sunny', label: 'Felice', color: 'orange' },
    { nome: 'flash', label: 'Agitato', color: 'yellow' },
    { nome: 'leaf', label: 'Calmo', color: 'green' },
    { nome: 'rainy', label: 'Triste', color: '#ad4a70' },
  ];

  function handleMoodPress(nome: string) {
    setUmore((prev) => (prev === nome ? null : nome));
    setConfermaUmore('');
  }

  function handleConferma() {
    if (!umore) return;
    setConfermaUmore('Si');
    setBottoni(false);
  }

  function handleAnnulla() {
    setUmore(null);
    setConfermaUmore('No');
  }

  return (
    <>
      <StatusBar hidden />

      <View style={styles.container}>
        <Navbar />

        <Image
          source={require('../../assets/images/home_copertina.jpg')}
          style={styles.img}
        />

        <Text style={styles.text2}>Cosa vuoi fare oggi?</Text>

        <View style={styles.grid}>
          
            <View style={styles.box1}>
              <TouchableOpacity onPress={() => router.push('/pensiero')}>
              <Image
                source={require('../../assets/images/pensiero.jpg')}
                style={styles.img1}
              />
              <View style={styles.overlay} />
              <Text style={styles.text1}>Pensiero</Text>
              </TouchableOpacity>
            </View>
          
          <View style={styles.box1}>
            <Image
              source={require('../../assets/images/meditazione.jpg')}
              style={styles.img1}
            />
            <View style={styles.overlay} />
            <Text style={styles.text1}>Meditazione</Text>
          </View>

          <View style={styles.box1}>
            <Image
              source={require('../../assets/images/sedute.jpg')}
              style={styles.img1}
            />
            <View style={styles.overlay} />
            <Text style={styles.text1}>Appuntamenti</Text>
          </View>

          <View style={styles.box1}>
            <Image
              source={require('../../assets/images/obiettivi.jpg')}
              style={styles.img1}
            />
            <View style={styles.overlay} />
            <Text style={styles.text1}>Obiettivi</Text>
          </View>
        </View>


        {confermaUmore === 'Si' ? (
          <><Text style={styles.feedbackText}>
            Oggi ti senti {moods.find((m) => m.nome === umore)?.label}
          </Text>
            <TouchableOpacity>
              <Text style={
                {
                  marginTop: 10,
                  textDecorationLine: 'underline',
                  color: '#6eb347'
                }
              }>Consulta il calendario dell'umore</Text>
            </TouchableOpacity>
          </>
        ) :
          (<><Text style={styles.text3}>Seleziona il tuo stato d'animo..</Text><View style={styles.umore}>
            {moods.map((item) => (
              <View key={item.nome} style={styles.divumore}>
                <TouchableOpacity onPress={() => handleMoodPress(item.nome)}>
                  <Ionicons
                    name={item.nome as any}
                    size={28}
                    color={umore === item.nome ? item.color : 'white'} />
                </TouchableOpacity>
                <Text style={styles.text_humor}>{item.label}</Text>
              </View>
            ))}
          </View></>
          )}


        {umore && bottoni && (

          <View style={styles.actions}>
            <TouchableOpacity onPress={handleConferma}>
              <Text style={styles.confirmButton}>Conferma</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAnnulla}>
              <Text style={styles.cancelButton}>Annulla</Text>
            </TouchableOpacity>
          </View>
        )}



        {confermaUmore === 'No' && (
          <Text style={styles.feedbackText}>Selezione annullata</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102664',
    paddingTop: 0,
    alignItems: 'center',
  },

  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    width: '90%',
    textAlign: 'center'
  },

  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textDecorationLine: 'underline'
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },

  box1: {
    width: '48%',
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,
  },

  img1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },

  text1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#61a8c9',
    padding: 5,
  },

  umore: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  divumore: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text_humor: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  confirmButton: {
    color: '#1c7754',
    fontWeight: 'bold',
    backgroundColor: '#68c587',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },

  cancelButton: {
    color: '#751450',
    fontWeight: 'bold',
    backgroundColor: '#e480b2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  feedbackText: {
    marginTop: 16,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});