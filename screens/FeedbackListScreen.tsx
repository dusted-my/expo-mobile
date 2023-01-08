import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MD2Colors } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { useQuery } from "react-query";
import { getFeedbacks } from "../queries";

const FeedbackListScreen = () => {
  const route = useRoute();
  const { cleanerId }: { cleanerId: string } = route.params as any;

  const { data, isLoading } = useQuery({
    queryKey: "feedbacks",
    queryFn: () => getFeedbacks(cleanerId),
    initialData: [],
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading Feedbacks...</Text>
      ) : !data.length ? (
        <Text>No Feedbacks Given</Text>
      ) : (
        data.map((feedback) => (
          <View style={styles.card} key={feedback.feedbackId}>
            <Rating
              readonly
              imageSize={16}
              style={{ alignItems: "flex-start", backgroundColor: "#0000" }}
              startingValue={feedback.stars}
            />
            <Text style={styles.message}>{feedback.message}</Text>
            <Text style={styles.date}>
              {dayjs(feedback.createdAt.toDate()).format(
                "ddd, D MMM YYYY hh:mm a"
              )}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  message: {
    marginVertical: 8,
  },
  date: {
    color: MD2Colors.grey500,
  },
});

export default FeedbackListScreen;
