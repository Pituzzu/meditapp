import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/Navbar';


export default function PensieroPage() {
    const [num_pensieri, setNumPensieri] = useState(0);

    const pensieri_lista = [
        {}
    ];

    return (
        <>
            {num_pensieri === 0 ? (
                <View style={{
                    flex: 1,
                    backgroundColor: '#102664',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Navbar />
                    <Text style={styles.text}>Il Diario dei pensieri</Text>
                    <Image
                        source={require('../../assets/images/diario_pensieri.png')}
                        style={styles.img}
                    />
                    <TouchableOpacity onPress={() => setNumPensieri(num_pensieri + 1)}>
                        <Ionicons
                            name="add-circle-outline"
                            size={80}
                            color='white' />
                    </TouchableOpacity>

                    <Text style={styles.text1}>Nessun pensiero è stato espresso</Text>
                    <Text style={styles.text2}>Clicca sul + per iniziare</Text>
                    {/* <Text style={styles.text2}>{num_pensieri}</Text> */}
                </View>
            ) : (
                <View style={{
                    flex: 1,
                    backgroundColor: '#102664',
                    alignItems: 'center',
                }}>
                    <Navbar />

                    <Image
                        source={require('../../assets/images/diario_pensieri.png')}
                        style={[styles.img, { marginTop: 100, marginBottom: 30 }]}
                    />

                    {/* <Text style={styles.text}>Il Diario dei pensieri</Text> */}
                    <ScrollView style={styles.lista_pensieri}>
                        <View style={styles.pensiero}>
                            <Ionicons
                                name="book" size={30} color='white' />
                                <Text style={styles.txt_pensiero}>Gratitudine </Text>
                                <Text>26/03/26 </Text>
                        </View>
                        
                        
                    </ScrollView>
                    <Text style={[styles.text2, {marginBottom: 10}]}>Pensieri totali: 10</Text>
                    <Ionicons
                            name="add-circle-outline"
                            size={60}
                            color='white' />
                </View>
            )}

        </>
    );
}

const styles = StyleSheet.create({
    txt_pensiero:{
        fontSize:20,
        fontWeight: 'bold',
        color: '#143ca3'
    },
    pensiero:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:15,
        borderBottomColor: '#6476a7',
        borderBottomWidth: 0.8, borderCurve:'circular', borderColor: '#ffffff',
    },
    lista_pensieri: {
        backgroundColor: '#7080ac',
        maxHeight: 230,
        width: 300,
        padding: 20,
        borderRadius: 20,

    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, backgroundColor: '#4e8fac', padding: 10, borderRadius: 20
    },
    text1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    text2: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    img: {
        width: '70%',
        height: 200,
        resizeMode: 'cover',
        marginLeft: 20
        // marginTop:100
    },
});