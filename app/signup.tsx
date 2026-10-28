import { router } from "expo-router";
import { useState } from "react";
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
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !passwordCheck) {
      Alert.alert("안내", "모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      Alert.alert("안내", "비밀번호가 일치하지 않습니다.");
      return;
    }

    Alert.alert("회원가입 성공", "메인 화면으로 이동합니다.");
    router.push("/main" as any);
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>간단한 정보로 서비스를 시작해보세요.</Text>

        <TextInput
          style={[
            styles.input,
            focusedInput === "name" && styles.inputFocused,
          ]}
          placeholder="이름"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput("name")}
          onBlur={() => setFocusedInput("")}
        />

        <TextInput
          style={[
            styles.input,
            focusedInput === "email" && styles.inputFocused,
          ]}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
        />

        <TextInput
          style={[
            styles.input,
            focusedInput === "password" && styles.inputFocused,
          ]}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("")}
        />

        <TextInput
          style={[
            styles.input,
            focusedInput === "passwordCheck" && styles.inputFocused,
          ]}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={passwordCheck}
          onChangeText={setPasswordCheck}
          onFocus={() => setFocusedInput("passwordCheck")}
          onBlur={() => setFocusedInput("")}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>회원가입</Text>
        </Pressable>

        <View style={styles.dividerBox}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>SNS 간편 회원가입</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.snsRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/images/google.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/images/kakao.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/images/naver.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/login" as any)}>
          <Text style={styles.link}>이미 계정이 있나요? 로그인</Text>
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
    marginBottom: 28,
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

  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
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
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 24,
  },
});