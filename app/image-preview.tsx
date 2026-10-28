import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

export default function ImagePreview() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [currentImage, setCurrentImage] = useState(imageUri ?? "");

  const editImage = () => {
    router.push({
      pathname: "/image-editor",
      params: { imageUri: currentImage },
    } as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>이미지 확인</Text>
      <Text style={styles.subtitle}>선택한 공간 사진을 확인해 주세요.</Text>

      {currentImage ? (
        <Image source={{ uri: currentImage }} style={styles.previewImage} />
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>선택된 이미지가 없습니다.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.editButton} onPress={editImage}>
        <Text style={styles.editButtonText}>사진 편집</Text>
      </TouchableOpacity>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: COLORS.pressedWarm },
        ]}
        onPress={() =>
          router.push({
            pathname: "/analyzing",
            params: { imageUri: currentImage },
          } as any)
        }
      >
        <Text style={styles.buttonText}>공간 분석 시작</Text>
      </Pressable>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.back()}
      >
        <Text style={styles.secondaryText}>다시 선택하기</Text>
      </TouchableOpacity>
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
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    textAlign: "center",
    color: COLORS.muted,
    marginBottom: 28,
  },
  previewImage: {
    width: "100%",
    height: 360,
    borderRadius: 16,
    resizeMode: "contain",
    backgroundColor: "#E9E0D0",
    marginBottom: 12,
  },
  emptyBox: {
    width: "100%",
    height: 360,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    color: COLORS.muted,
    fontSize: 14,
  },
  editButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  editButtonText: {
    fontFamily: FONTS.bold,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: FONTS.bold,
    color: COLORS.textOnDark,
    fontSize: 16,
    textAlign: "center",
  },
  secondaryButton: {
    marginTop: 12,
    padding: 14,
    alignItems: "center",
  },
  secondaryText: {
    fontFamily: FONTS.regular,
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 14,
  },
});