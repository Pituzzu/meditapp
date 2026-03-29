import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Navbar from '../../components/Navbar';

export default function Sedute() {
    const [step, setStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [date, setDate] = useState(new Date()); // Gestisce l'oggetto data/ora completo
    const [showPicker, setShowPicker] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);

    const formatDate = (d: string) => d.split('-').reverse().join('/');

    // Funzione chiamata quando l'utente conferma l'ora nel picker
    const onChangeTime = (event: any, selectedTime?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // Su iOS resta aperto, su Android si chiude
        if (selectedTime) {
          setDate(selectedTime);
          setTimeSelected(true);
        }
    };

    return (
        <View style={styles.container}>
            <Navbar />
            
            <Image source={require('../../assets/images/calendar.png')} style={styles.img} />

            {/* --- STEP 1: CALENDARIO --- */}
            {step === 0 && (

                <>
                <TouchableOpacity  onPress={() => setStep(1)}>

                
                <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#5677d1', padding: 10, borderRadius: 20 }}>
                    <Text style={{ color: 'white', fontSize: 20, }}>Prenota seduta</Text>
                    <Ionicons name="add-circle" size={30} color="white" style={{ marginLeft: 10 }} />
                </View>
                </TouchableOpacity>
                <View style={styles.lista_mindfulness}>
                        <ScrollView style={styles.info_lista}>
                            <View style={styles.mindner}>
                                <Ionicons name="calendar" size={35} color='white' />
                                
                                <Text style={styles.text_mindner}>Prenotazione 26/03/26</Text>
                                <Text style={styles.text_mindner}>ore 10:00</Text>
                                {/* <Text style={styles.text_mindner}>18:23</Text> */}
                            </View>
                            <View style={styles.mindner}>
                                <Ionicons name="calendar" size={35} color='white' />
                                
                                <Text style={styles.text_mindner}>Prenotazione 26/03/26</Text>
                                <Text style={styles.text_mindner}>ore 10:00</Text>
                                {/* <Text style={styles.text_mindner}>18:23</Text> */}
                            </View>
                        </ScrollView>
                    </View></>
            )}
            {step === 1 && (
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(0)}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text style={{ color: 'white', marginLeft: 10, textAlign:'center' }}>Annulla</Text>
                    </TouchableOpacity>
                    <Calendar 
                        style={styles.calendario}
                        theme={{ calendarBackground: '#102664', dayTextColor: 'white', monthTextColor: 'white', arrowColor: 'white' }}
                        onDayPress={day => setSelectedDate(day.dateString)}
                        markedDates={{ [selectedDate]: { selected: true, selectedColor: '#4e8fac' } }}
                    />
                    {selectedDate !== '' && (
                        <TouchableOpacity style={styles.btnMain} onPress={() => setStep(2)}>
                            <Text style={styles.btnText}>Conferma Data ({formatDate(selectedDate)})</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* --- STEP 2: SCELTA ORA PERSONALIZZATA --- */}
            {step === 2 && (
                <View style={styles.step2Container}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text style={{ color: 'white', marginLeft: 10 }}>Modifica Data</Text>
                    </TouchableOpacity>

                    <Text style={styles.infoText}>Giorno: {formatDate(selectedDate)}</Text>
                    
                    <TouchableOpacity style={styles.timePickerBtn} onPress={() => setShowPicker(true)}>
                        <Ionicons name="time-outline" size={30} color="white" />
                        <Text style={styles.timePickerText}>
                            {timeSelected 
                                ? `Ora scelta: ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}` 
                                : "Clicca per scegliere l'ora"}
                        </Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeTime}
                        />
                    )}

                    {timeSelected && (
                        <TouchableOpacity 
                            style={styles.btnFinal} 
                            onPress={() => alert("Seduta salvata con successo!")}
                        >
                            <Text style={styles.btnText}>Finalizza Prenotazione</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#102664', alignItems: 'center' },
    img: { width: 300, height: 160, resizeMode: 'contain', marginTop: 80, marginBottom: 10 },
    calendario: { width: 330, borderRadius: 15, overflow: 'hidden' },
    btnMain: { backgroundColor: '#63afcf', padding: 15, borderRadius: 25, marginTop: 25, width: 280 },
    btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
    
    // Step 2
    step2Container: { width: '90%', alignItems: 'center', marginTop: 20 },
    backBtn: { flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 40,alignItems: 'center', marginBottom: 20 },
    infoText: { color: '#b6c1cd', fontSize: 18, marginBottom: 30 },
    timePickerBtn: { 
        flexDirection: 'row', 
        backgroundColor: '#2c3d6d', 
        padding: 20, 
        borderRadius: 15, 
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    },
    timePickerText: { color: 'white', fontSize: 18, marginLeft: 15, fontWeight: '600' },
    btnFinal: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 25, marginTop: 40, width: 280 },
    lista_mindfulness: {
        backgroundColor: '#2c3d6d',
        width: '90%',
        borderRadius: 30,
        marginTop: 30,
    },
    info_lista: {
        maxHeight: 200,
        padding: 20
    },
    mindner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',marginBottom:20
    },text_mindner: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});