import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function Analyzing() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  // 나중에는 서버 분석 결과로 받아올 값
  const detectedWalls = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push({
        pathname: "/analysis-result",
        params: {
          imageUri,
          detectedWalls: String(detectedWalls),
        },
      } as any);
    }, 2500);

    return () => clearTimeout(timer);
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.accent} />

      <Text style={styles.title}>공간을 분석 중입니다</Text>
      <Text style={styles.subtitle}>
        벽지, 바닥, 천장, 몰딩 영역을 분석하고 있어요
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.primary,
    marginTop: 28,
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
  },
});