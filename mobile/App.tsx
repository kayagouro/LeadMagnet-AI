import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Text, FlatList, View } from 'react-native';

const Tab = createBottomTabNavigator();

const upcomingMatches = [
  { id: '1', label: 'PSG vs Marseille - 20:45' },
  { id: '2', label: 'Lyon vs Monaco - 18:00' },
];

function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 22, fontWeight: '700', margin: 16 }}>Matchs à venir</Text>
      <FlatList
        data={upcomingMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text>{item.label}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function ResultsScreen() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 22, fontWeight: '700', margin: 16 }}>Résultats</Text>
      <Text style={{ marginHorizontal: 16 }}>Affichage des scores finalisés.</Text>
    </SafeAreaView>
  );
}

function LeaderboardScreen() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 22, fontWeight: '700', margin: 16 }}>Classement</Text>
      <Text style={{ marginHorizontal: 16 }}>Global / Hebdo / Mensuel</Text>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 22, fontWeight: '700', margin: 16 }}>Profil</Text>
      <Text style={{ marginHorizontal: 16 }}>Pseudo, avatar, statistiques, historique.</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Résultats" component={ResultsScreen} />
        <Tab.Screen name="Classement" component={LeaderboardScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
