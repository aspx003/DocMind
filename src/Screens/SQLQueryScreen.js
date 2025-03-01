import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import SQLQueryChatComponent from "../Components/SQLQueryChatComponent";
import { colors } from "../constants/colors";
import { vs, s, ms } from "react-native-size-matters";
import IconButton from "../Components/IconButton";

const data = [
  {
    id: 1,
    user_id: 1,
    natural_query: "Who is the oldest employee?",
    sql_query:
      "SELECT e.FirstName, e.LastName FROM Employee e ORDER BY e.BirthDate ASC LIMIT 1;",
    response: "The oldest employee is Margaret Park.",
    results: [
      {
        FirstName: "Margaret",
        LastName: "Park",
      },
    ],
    timestamp: "2025-02-03T19:07:23",
  },
  {
    id: 2,
    user_id: 1,
    natural_query: "Which country spend the most?",
    sql_query:
      "SELECT c.Country, SUM(i.Total) as total_spent FROM Customer c JOIN Invoice i ON c.CustomerId = i.CustomerId GROUP BY c.Country ORDER BY total_spent DESC LIMIT 1;",
    response:
      "The country that spent the most is the USA, with a total of $523.06.",
    results: [
      {
        Country: "USA",
        total_spent: 523.06,
      },
    ],
    timestamp: "2025-02-03T20:12:22",
  },
  {
    id: 4,
    user_id: 1,
    natural_query: "which employee have the highest job experience?\n",
    sql_query:
      "SELECT e.FirstName, e.LastName FROM Employee e ORDER BY JULIANDAY('now') - JULIANDAY(e.HireDate) DESC LIMIT 1;",
    response: "The employee with the highest job experience is Jane Peacock.",
    results: [
      {
        FirstName: "Jane",
        LastName: "Peacock",
      },
    ],
    timestamp: "2025-02-03T20:58:26",
  },
  {
    id: 5,
    user_id: 1,
    natural_query: "How many artists are there?",
    sql_query: "SELECT COUNT(ar.ArtistId) as artist_count FROM Artist ar;",
    response:
      "There are 275 artists in total, so you have a wide range of talented individuals to explore and discover.",
    results: [
      {
        artist_count: 275,
      },
    ],
    timestamp: "2025-02-03T21:28:38",
  },
  {
    id: 6,
    user_id: 1,
    natural_query: "How many employees are there from Calgary?",
    sql_query:
      "SELECT COUNT(e.EmployeeId) AS employee_count FROM Employee e WHERE e.City = 'Calgary';",
    response: "There are 5 employees from Calgary.",
    results: [
      {
        employee_count: 5,
      },
    ],
    timestamp: "2025-02-04T04:57:19",
  },
  {
    id: 7,
    user_id: 1,
    natural_query:
      "What is the average number of albums and which artist has the most number of albums?",
    sql_query:
      "SELECT AVG(album_count) as average_albums, MAX(album_count) as max_albums, ar.Name as artist_name \nFROM (SELECT a.ArtistId, COUNT(a.AlbumId) as album_count \n      FROM Album a \n      GROUP BY a.ArtistId) ac \nJOIN Artist ar ON ac.ArtistId = ar.ArtistId \nORDER BY ac.album_count DESC \nLIMIT 1;",
    response:
      "On average, artists have around 1.7 albums. The artist with the most albums is Iron Maiden, with an impressive 21 albums to their name.",
    results: [
      {
        average_albums: 1.7009803921568627,
        max_albums: 21,
        artist_name: "Iron Maiden",
      },
    ],
    timestamp: "2025-02-04T04:58:14",
  },
  {
    id: 8,
    user_id: 1,
    natural_query: "Which employees made the most in sales?",
    sql_query:
      "SELECT e.FirstName, e.LastName, SUM(i.Total) as total_sales FROM Employee e JOIN Customer c ON e.EmployeeId = c.SupportRepId JOIN Invoice i ON c.CustomerId = i.CustomerId GROUP BY e.EmployeeId ORDER BY total_sales DESC;",
    response:
      "The top sales performers are Jane Peacock with $833.04 in sales, followed by Margaret Park with $775.40, and then Steve Johnson with $720.16. These three employees had the highest total sales, with Jane Peacock leading the pack by over $57.",
    results: [
      {
        FirstName: "Jane",
        LastName: "Peacock",
        total_sales: 833.04,
      },
      {
        FirstName: "Margaret",
        LastName: "Park",
        total_sales: 775.4,
      },
      {
        FirstName: "Steve",
        LastName: "Johnson",
        total_sales: 720.16,
      },
    ],
    timestamp: "2025-02-04T07:32:03",
  },
  {
    id: 9,
    user_id: 1,
    natural_query: "Which employees made the most in sales?",
    sql_query:
      "SELECT e.FirstName, e.LastName, SUM(i.Total) as total_sales FROM Employee e JOIN Customer c ON e.EmployeeId = c.SupportRepId JOIN Invoice i ON c.CustomerId = i.CustomerId GROUP BY e.EmployeeId ORDER BY total_sales DESC LIMIT 1;",
    response:
      "The top sales performer is Jane Peacock, who made a total of $833.04 in sales.",
    results: [
      {
        FirstName: "Jane",
        LastName: "Peacock",
        total_sales: 833.04,
      },
    ],
    timestamp: "2025-02-04T07:36:30",
  },
  {
    id: 10,
    user_id: 1,
    natural_query:
      "Which country has the most number of employee from the most number of job title?",
    sql_query:
      "SELECT e.Country, e.Title, COUNT(e.EmployeeId) as employee_count \nFROM Employee e \nGROUP BY e.Country, e.Title \nORDER BY COUNT(e.EmployeeId) DESC, e.Country ASC;",
    response:
      "Canada has the most number of employees from the most number of job titles, with a total of 5 different titles. These include Sales Support Agent with 3 employees, IT Staff with 2 employees, and General Manager, IT Manager, and Sales Manager, each with 1 employee.",
    results: [
      {
        Country: "Canada",
        Title: "Sales Support Agent",
        employee_count: 3,
      },
      {
        Country: "Canada",
        Title: "IT Staff",
        employee_count: 2,
      },
      {
        Country: "Canada",
        Title: "General Manager",
        employee_count: 1,
      },
      {
        Country: "Canada",
        Title: "IT Manager",
        employee_count: 1,
      },
      {
        Country: "Canada",
        Title: "Sales Manager",
        employee_count: 1,
      },
    ],
    timestamp: "2025-02-04T07:50:25",
  },
  {
    id: 11,
    user_id: 1,
    natural_query: "Total number of employees?",
    sql_query: "SELECT COUNT(e.EmployeeId) as total_employees FROM Employee e;",
    response: "We currently have a total of 8 employees.",
    results: [
      {
        total_employees: 8,
      },
    ],
    timestamp: "2025-02-04T07:55:55",
  },
  {
    id: 13,
    user_id: 1,
    natural_query: "Total number of albums of BackBeat",
    sql_query:
      "SELECT COUNT(a.AlbumId) as album_count FROM Album a JOIN Artist ar ON a.ArtistId = ar.ArtistId WHERE ar.Name = 'BackBeat';",
    response: "BackBeat has released a total of 1 album.",
    results: [
      {
        album_count: 1,
      },
    ],
    timestamp: "2025-02-04T10:38:05",
  },
  {
    id: 14,
    user_id: 1,
    natural_query: "How many albums does alice in chains have?",
    sql_query:
      "SELECT COUNT(a.AlbumId) as album_count FROM Album a JOIN Artist ar ON a.ArtistId = ar.ArtistId WHERE ar.Name = 'Alice In Chains';",
    response:
      "Alice in Chains actually has more than one album, but according to my current information, they have at least 1 album.",
    results: [
      {
        album_count: 1,
      },
    ],
    timestamp: "2025-02-05T12:17:12",
  },
];

export default function SQLQueryScreen() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessageHandler = () => {};

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <SQLQueryChatComponent data={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.chatInputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
		  placeholder="Askr your query"
        />
        <View style={styles.iconButton}>
          {loading ? (
            <ActivityIndicator size='large' color='#0000ff' />
          ) : (
            <IconButton
              onPress={sendMessageHandler}
              name={"rocket-launch"}
              size={30}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: vs(45),
  },
  chatInputContainer: {
    height: vs(40),
    marginVertical: vs(10),
    backgroundColor: colors.buttonColor,
    padding: s(5),
    borderRadius: ms(35),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "88%",
    paddingLeft: s(10),
  },
  iconButton: {
    padding: s(5),
    backgroundColor: colors.sendIconBackgroundColor,
    borderRadius: ms(25),
  },
});
