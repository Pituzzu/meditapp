import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, usePathname, type Href } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Navbar() {
  const pathname = usePathname();

  const menuItems: {
    label: string;
    icon: 'home' | 'leaf' | 'book' | 'calendar' | 'checkmark-done-circle';
    route: Href;
  }[] = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Pratiche', icon: 'leaf', route: '/pratiche' as Href },
    { label: 'Diario', icon: 'book', route: '/pensiero' as Href },
    { label: 'Sedute', icon: 'calendar', route: '/sedute' as Href },
    { label: 'Obiettivi', icon: 'checkmark-done-circle', route: '/obiettivi' as Href },
  ];

  return (
    <LinearGradient
      colors={['#102664', '#1b3d91', '#5072cf']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.sidebar}
    >
      <View style={styles.info_sidebar}>
        {menuItems.map((item) => {
          const active =
            item.route === '/'
              ? pathname === '/'
              : pathname.startsWith(String(item.route));

          return (
            <TouchableOpacity
              key={item.route.toString()}
              style={[styles.lista, active && styles.listaActive]}
              onPress={() => router.push(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={25}
                color={active ? '#ffd166' : 'white'}
              />
              <Text
                style={[
                  styles.text_list,
                  active && styles.textListActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  info_sidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lista: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  listaActive: {
    opacity: 1,
  },

  text_list: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },

  textListActive: {
    color: '#ffd166',
    fontWeight: '700',
  },
});