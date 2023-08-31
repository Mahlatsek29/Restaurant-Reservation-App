import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Details"
        component={RestaurantDetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={30} color={focused ? "#000" : "#888"} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={30} color={focused ? "#000" : "#888"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
