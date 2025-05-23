import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { formSchema, loginSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/authContext";
import { api } from "@/baseApi";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/features/authentication/authApi";
import { Link } from "expo-router";

export default function SignUp() {
  const { register } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    watch,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema.schema),
    defaultValues: formSchema.defaultValues,
  });

  const [trigger, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await trigger(data).unwrap();
      if (response) {
        console.log("Register successful", response);
        await register(response.token); // Call the login function from context
      } else {
        console.log("Login failed:", response);
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.description}>Fillup the form to start</Text>
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
          Sign up
        </Button>
        <Link
          href="/(public)/sign-in"
          style={{ textAlign: "center", marginTop: 10 }}
        >
          Already have an account? Sign in here
        </Link>
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
