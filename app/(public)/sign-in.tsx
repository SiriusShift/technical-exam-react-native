import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/authContext";
import { api } from "@/baseApi";
import { useLoginMutation } from "@/features/authentication/loginApi";

export default function SignIn() {
  const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    watch,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema.schema),
    defaultValues: loginSchema.defaultValues,
  });

  const [loginTrigger, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await loginTrigger(data).unwrap();
      if (response) {
        console.log("Login successful", response);
        await login(response.token); // Call the login function from context
      } else {
        console.log("Login failed:", response);
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.description}>Login to access your account</Text>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputText}>Email</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value}
                mode="outlined"
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.inputText}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={styles.input}
                secureTextEntry={!passwordVisible} // Toggle visibility
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
                onChangeText={onChange}
                mode="outlined"
              />
            )}
          />
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.submit}
          mode="contained"
          loading={isLoading}
          disabled={!isValid}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  form: {
    paddingHorizontal: 20,
    width: "100%",
    display: "flex",
    gap: 10,
    marginTop: 20,
    flexDirection: "column",
  },
  input: {
    height: 50,
  },
  inputText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  submit: {
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
  },
});
