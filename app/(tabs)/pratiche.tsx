import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/Navbar';

export default function Pratiche() {
    const DURATION_TOTAL = 6; // Impostato a 10 minuti (600s) come da tua grafica
    const [meditazione_start, setMeditazioneStart] = useState(false);
    const [timer, setTimer] = useState(DURATION_TOTAL);
    const [play, setPlay] = useState(false);

    // Ref per memorizzare l'ID del timer e poterlo stoppare
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    function gestisci_timer() {
        if (play) {
            // STOP: Se sta girando, puliamo l'intervallo
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setPlay(false);
            setTimer(DURATION_TOTAL); // Reset del tempo
        } else {
            // AVVIA
            setPlay(true);
            timerRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        // FINE NATURALE DEL TIMER
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        setPlay(false);
                        return DURATION_TOTAL;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    }

    return (
        <View style={styles.container}>
            <Navbar />
            
            {!meditazione_start ? (
                // SCHERMATA INIZIALE
                <View style={styles.centeredContent}>
                    <Image
                        source={require('../../assets/images/meditazione_sfondo.png')}
                        style={styles.img} 
                    />
                    <Text style={styles.text}>Inizia la tua pratica</Text>
                    <Text style={styles.text1}>Mindfulness</Text>
                    <TouchableOpacity onPress={() => setMeditazioneStart(true)}>
                        <Text style={styles.text2}>Avvia la tua sessione!</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // SCHERMATA TIMER ATTIVO
                <>
                    <Image
                        source={require('../../assets/images/meditazione_sfondo.png')}
                        style={[styles.img, styles.imgAbsolute]} 
                    />
                    
                    <View>
                        <Text style={styles.timer_text}>
                            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                        </Text>
                    </View>

                    <View style={styles.comandi}>
                        <TouchableOpacity>
                            <Ionicons name="settings-outline" size={40} color='white' />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={gestisci_timer}>
                            <Ionicons 
                                name={!play ? "play-circle-outline" : 'stop-outline'} 
                                size={40} 
                                color='white' 
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Ionicons name="save-outline" size={40} color='white' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.lista_mindfulness}>
                        <ScrollView style={styles.info_lista}>
                            <View style={styles.mindner}>
                                <Ionicons name="hourglass" size={35} color='white' />
                                <Text style={styles.text_mindner}>10:00</Text>
                                <Text style={styles.text_mindner}>26/03/26</Text>
                                <Text style={styles.text_mindner}>18:23</Text>
                            </View>
                        </ScrollView>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102664',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredContent: {
        alignItems: 'center',
    },
    img: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    imgAbsolute: {
        position: 'absolute', 
        top: 100
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text1: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text2: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#485e9b',
        marginTop: 20,
        borderRadius: 30,
        padding: 15
    },
    timer_text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#7a92d6',
        padding: 35,
        borderRadius: 150,
        marginTop: 180,
        minWidth: 180, // Assicura che il cerchio rimanga tondo
    },
    comandi: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 25,
        marginBottom: 20
    },
    lista_mindfulness: {
        backgroundColor: '#2c3d6d',
        width: '90%',
        borderRadius: 30,
        marginTop: 10,
    },
    info_lista: {
        maxHeight: 200,
        padding: 20
    },
    mindner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    text_mindner: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});