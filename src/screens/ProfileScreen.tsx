import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/userStore";
import { logoutUser } from "../redux/reducers/userSlice";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.user.loggedInUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <LinearGradient colors={["#b091d1ff", "#6c92d5ff"]} style={styles.container}>
      <View style={styles.card}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={90} color="#6a11cb" />
          <Text style={styles.username}>
            {loggedInUser?.fullName || getInitials("User")}
          </Text>
        </View>

        {/* User Info */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{loggedInUser?.fullName || "N/A"}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{loggedInUser?.email || "N/A"}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    alignItems: "center",
    marginBottom: 20,
  },
  username: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoBox: {
    width: "100%",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  button: {
    backgroundColor: "#6aa0d7ff",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
