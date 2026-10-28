import { router } from "expo-router";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

export default function Result() {
  const handleSave = () => {
    Alert.alert("저장 완료", "시안이 저장되었습니다.", [
      {
        text: "확인",
        onPress: () => router.replace("/main" as any),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>최종 시안</Text>
        <Text style={styles.subtitle}>
          선택한 마감재가 적용된 시안을 확인해 주세요.
        </Text>

        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>적용 결과 미리보기</Text>

          <View style={styles.previewBox}>
            <Text style={styles.previewText}>3D 시안 이미지 영역</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>선택한 마감재</Text>

          <View style={styles.summaryRow}>
            <View style={[styles.colorBox, { backgroundColor: "#eee3ce" }]} />
            <View>
              <Text style={styles.summaryLabel}>전체 벽</Text>
              <Text style={styles.summaryDesc}>아이보리 계열</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={[styles.colorBox, { backgroundColor: "#b98b5b" }]} />
            <View>
              <Text style={styles.summaryLabel}>바닥</Text>
              <Text style={styles.summaryDesc}>우드 계열</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={[styles.colorBox, { backgroundColor: "#f7f4ee" }]} />
            <View>
              <Text style={styles.summaryLabel}>몰딩</Text>
              <Text style={styles.summaryDesc}>오프화이트 계열</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => router.push("/material-select" as any)}
        >
          <Text style={styles.newButtonText}>새 시안 만들기</Text>
        </TouchableOpacity>
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
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },

  title: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    textAlign: "center",
    color: COLORS.muted,
    marginBottom: 24,
    lineHeight: 21,
  },

  previewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  previewTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: 14,
  },

  previewBox: {
    height: 260,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },

  previewText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.muted,
  },

  summaryBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  summaryTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  colorBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },

  summaryLabel: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: 3,
  },

  summaryDesc: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.muted,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  saveButtonText: {
    color: COLORS.textOnDark,
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: 16,
  },

  newButton: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  newButtonText: {
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
});