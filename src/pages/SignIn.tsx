import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const SignIn = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignIn'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeValue = useCallback((key: string, value: string) => {
    switch (key) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  }, []);

  const onSubmit = useCallback(() => {}, []);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.elementWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요."
          onChangeText={e => onChangeValue('email', e)}
          value={email}
          importantForAutofill="yes"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
        />
      </View>
      <View style={styles.elementWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          key="password"
          placeholder="비밀번호를 입력해주세요."
          onChangeText={e => onChangeValue('password', e)}
          secureTextEntry
          value={password}
          importantForAutofill="yes"
          autoComplete="password"
          ref={passwordRef}
          onSubmitEditing={() => {
            !!email && !!password && onSubmit();
          }}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !email || !password
              ? styles.loginButton
              : [styles.loginButton, styles.loginButtonActive]
          }
          disabled={!email || !password}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  inputWrapper: {padding: 20},
  elementWrapper: {paddingBottom: 20},
  label: {fontWeight: 'bold', fontSize: 16, marginBottom: 20},
  textInput: {padding: 5, borderBottomWidth: 0.2},
  buttonZone: {alignItems: 'center'},
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonActive: {backgroundColor: 'blue'},
  loginButtonText: {color: '#ffffff'},
});
