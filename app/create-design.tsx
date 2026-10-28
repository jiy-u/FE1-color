import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function CreateDesign() {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "/image-editor",
        params: { imageUri: result.assets[0].uri },
      } as any);
    }
  };

  const takePhoto = async () => {
    Alert.alert(
      "카메라 권한 안내",
      "공간 사진을 촬영하기 위해 카메라 접근 권한이 필요합니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "권한 허용하기",
          onPress: async () => {
            const permission =
              await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
              Alert.alert("안내", "카메라 권한이 허용되지 않았습니다.");
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: false,
              quality: 1,
            });

            if (!result.canceled) {
              router.push({
                pathname: "/image-editor",
                params: { imageUri: result.assets[0].uri },
              } as any);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>새 시안 생성</Text>
        <Text style={styles.subtitle}>공간 사진을 업로드해 주세요.</Text>

        <TouchableOpacity style={styles.optionCard} onPress={takePhoto}>
          <Feather
            name="camera"
            size={24}
            color={COLORS.accent}
            style={{ marginRight: 16 }}
          />
          <View style={styles.optionTextBox}>
            <Text style={styles.optionTitle}>사진 촬영</Text>
            <Text style={styles.optionDesc}>
              카메라로 공간을 직접 촬영합니다.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={pickImage}>
          <Feather
            name="image"
            size={24}
            color={COLORS.accent}
            style={{ marginRight: 16 }}
          />
          <View style={styles.optionTextBox}>
            <Text style={styles.optionTitle}>갤러리에서 선택</Text>
            <Text style={styles.optionDesc}>
              갤러리에서 이미지를 선택한 뒤 편집합니다.
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
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

  content: {
    flex: 1,
    justifyContent: "center",
    marginTop: -70,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    textAlign: "center",
    color: COLORS.muted,
    marginBottom: 36,
  },

  optionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  optionTextBox: {
    flex: 1,
  },

  optionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.primary,
    marginBottom: 4,
  },

  optionDesc: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 20,
  },

  arrow: {
    fontSize: 28,
    color: COLORS.muted,
  },
});