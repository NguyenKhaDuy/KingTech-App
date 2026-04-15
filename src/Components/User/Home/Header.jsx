import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Header({ unreadCount = 3, navigation }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>KingTech</Text>

      <View style={styles.right}>
        {/* Notification */}
        <TouchableOpacity
          style={styles.notiWrapper}
          onPress={() => navigation?.navigate("NotificationScreen")}
        >
          <Ionicons name="notifications-outline" size={26} color="#333" />

          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6600',
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  notiWrapper: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  profile: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
});