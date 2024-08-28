import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { UserContext } from "../Context/UserContext";
import { fetchPlants } from "../src/api";
import LottieView from "lottie-react-native";
import Loading from "../Components/Loading";

const NewsCard = ({ title, content, date }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardContent}>{content}</Text>
    <Text style={styles.cardDate}>{date}</Text>
  </View>
);

export default function HomeScreen() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const loadPlants = async () => {
    if (!loggedInUser) return;

    setIsLoading(true);
    try {
      const plants = await fetchPlants(loggedInUser.username);

      let newsFeed = [];
      plants.forEach((plant) => {
        newsFeed.push({
          id: `${plant._id}-added`,
          title: `New Plant Added: ${plant.nickname || plant.common_name}`,
          content: `You added a new plant to your collection!`,
          date: formatDate(plant.date_added),
        });
        newsFeed.push({
          id: `${plant._id}-watered`,
          title: `${plant.nickname || plant.common_name} Watered`,
          content: `You last watered this plant on ${formatDate(plant.last_watered)}.`,
          date: formatDate(plant.last_watered),
        });
        newsFeed.push({
          id: `${plant._id}-nextWater`,
          title: `Water ${plant.nickname || plant.common_name} Soon`,
          content: `This plant needs to be watered next on ${formatDate(plant.next_watering)}.`,
          date: formatDate(plant.next_watering),
        });
      });

      newsFeed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNewsItems(newsFeed);
    } catch (error) {
      console.error("Error loading plants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
  }, [loggedInUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsItems}
        renderItem={({ item }) => <NewsCard title={item.title} content={item.content} date={item.date} />}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadPlants} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No plant news yet. Add some plants to see updates!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E7D32",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#388E3C",
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    color: "#757575",
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    color: "#388E3C",
    fontSize: 16,
    marginTop: 20,
  },
  animation: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
});
