import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { s, ms, vs } from "react-native-size-matters";

export default function TableComponent({ data }) {
  // Extract column headers dynamically from object keys
  const headers = Object.keys(data[0]);

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {/* Dynamic Table Header */}
        <View style={[styles.row]}>
          {headers.map((header, index) => (
            <Text key={index} style={[styles.cell, styles.headerText]}>
              {header}
            </Text>
          ))}
        </View>

        {/* Dynamic Table Rows */}
        {data.map((item, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {headers.map((key, colIndex) => (
              <Text key={colIndex} style={styles.cell}>
                {item[key]}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
	overflow: 'scroll',
    fontSize: 16,
    padding: 8,
	color: "#ccc",
	borderWidth: 1,
    borderColor: "#ccc",
	minWidth: s(150),
  },
  header: {
    backgroundColor: "#007bff",
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
  }
});
