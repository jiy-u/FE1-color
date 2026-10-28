import { router, useLocalSearchParams } from "expo-router";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function AnalysisResult() {
  const { imageUri, detectedWalls } = useLocalSearchParams<{
    imageUri: string;
    detectedWalls?: string;
  }>();

  const wallCount = detectedWalls ?? "3";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>분석 결과</Text>
        <Text style={styles.subtitle}>
          AI가 인식한 공간 영역을 확인해 주세요.
        </Text>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>이미지를 불러올 수 없습니다.</Text>
          </View>
        )}

        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>공간 분석 결과</Text>
          <Text style={styles.resultText}>✓ 벽지</Text>
          <Text style={styles.resultText}>✓ 바닥</Text>
          <Text style={styles.resultText}>✓ 천장</Text>
          <Text style={styles.resultText}>✓ 몰딩</Text>
          <Text style={styles.resultSummary}>총 4개 영역 인식 완료</Text>
        </View>

        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>공간이 잘 분석되었나요?</Text>
          <Text style={styles.confirmDesc}>
            영역이 어색하게 나뉘었다면 직접 수정할 수 있어요.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: COLORS.pressedWarm },
            ]}
            onPress={() =>
              router.push({
                pathname: "/design-option",
                params: { imageUri, detectedWalls: wallCount },
              } as any)
            }
          >
            <Text style={styles.buttonText}>네, 좋아요</Text>
          </Pressable>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: "/area-edit",
                params: { imageUri, detectedWalls: wallCount },
              } as any)
            }
          >
            <Text style={styles.editButtonText}>직접 수정할게요</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
  },

  backButton: {
    marginTop: 38,
    width: 42,
    height: 42,
    justifyContent: "center",
  },

  backArrow: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.primary,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    textAlign: "center",
    color: COLORS.muted,
    marginBottom: 24,
  },
  previewImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    resizeMode: "cover",
    backgroundColor: "#E9E0D0",
    marginBottom: 16,
  },

  emptyBox: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyText: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 14,
  },
  resultBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },

  resultTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.primary,
    marginBottom: 12,
  },

  resultText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.accent,
    marginBottom: 8,
  },

  resultSummary: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginTop: 12,
    color: COLORS.primary,
  },
  confirmBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },

  confirmTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.primary,
    marginBottom: 6,
  },

  confirmDesc: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  buttonText: {
    fontFamily: FONTS.bold,
    color: COLORS.textOnDark,
    fontSize: 15,
    textAlign: "center",
  },

  editButton: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  editButtonText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 15,
    textAlign: "center",
  },
});