import { router } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("안내", "이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    // 더미 로그인 — 서버 연동 시 이 부분을 API 호출로 교체
    if (autoLogin) {
      // 체크했으면 저장 → 다음 앱 실행 시 자동 로그인
      await SecureStore.setItemAsync("userEmail", email);
      await SecureStore.setItemAsync("userToken", "dummy-token-" + email);
    } else {
      // 체크 안 했으면 저장 정보 삭제 → 다음엔 로그인 화면으로
      await SecureStore.deleteItemAsync("userEmail");
      await SecureStore.deleteItemAsync("userToken");
    }

    router.replace("/main" as any);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>
        <Text style={styles.subtitle}>Visioneers에 오신 것을 환영합니다.</Text>

        <TextInput
          style={[
            styles.input,
            focusedInput === "email" && styles.inputFocused,]}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          importantForAutofill="no"
          textContentType="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input,
            focusedInput === "password" && styles.inputFocused,]}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("")}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="off"
          importantForAutofill="no"
          textContentType="none"
        />

        {/* 자동 로그인 체크란 */}
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAutoLogin((prev) => !prev)}
          activeOpacity={0.7}>
          <View style={[styles.checkbox, autoLogin && styles.checkboxChecked]}>
            {autoLogin && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>자동 로그인</Text>
        </TouchableOpacity>

        <Pressable
          style={({ pressed }) => [styles.button,pressed && styles.buttonPressed,]}onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => router.push("/main" as any)}>
          <Text style={styles.guestText}>게스트로 시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgot-password" as any)}>
          <Text style={styles.forgotText}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>

        <View style={styles.dividerBox}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>SNS 간편 로그인</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.snsRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/signup" as any)}>
          <Text style={styles.link}>계정이 없나요? 회원가입</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
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
    fontSize: 14,
    textAlign: "center",
    color: COLORS.muted,
    marginBottom: 24,
  },

  input: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.primary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  inputFocused: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 2,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  checkboxChecked: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  checkMark: {
    fontFamily: FONTS.bold,
    color: COLORS.textOnDark,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },

  checkLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.primary,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    marginTop: 4,
  },

  buttonPressed: {
    backgroundColor: COLORS.pressedWarm,
  },

  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textOnDark,
    textAlign: "center",
  },

  guestButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E9E4DA",
  },

  guestText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    textAlign: "center",
    color: COLORS.primary,
  },

  forgotText: {
    fontFamily: FONTS.regular,
    textAlign: "right",
    marginTop: 12,
    color: COLORS.muted,
    fontSize: 13,
  },

  dividerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    fontFamily: FONTS.regular,
    marginHorizontal: 10,
    color: COLORS.muted,
    fontSize: 13,
  },

  snsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 4,
  },

  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  link: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 24,
  },
});

