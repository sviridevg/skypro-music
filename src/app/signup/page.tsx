"use client";

import Image from "next/image";
import styles from "./signup.module.css";
import classNames from "classnames";
import { useState } from "react";
import { newUser } from "@/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const [signUpData, setSignUpData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const [err, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUpData.email && !signUpData.password) {
      setError("Введите данные для регистрации");
      return;
    }
    if (!signUpData.email) {
      setError("Введите логин");
      return;
    }
    if (!signUpData.password) {
      setError("Введите пароль");
      return;
    }

    if (signUpData.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      await dispatch(
        newUser({
          email: signUpData.email,
          password: signUpData.password,
        })
      )
        .unwrap()
        .then((data) => {
          if (data.success === true) {
            router.push("/signup/successfully");
          }
        });
    } catch (error) {
      setError(`${(error as Error).message}`);
    }
  };

  const handleMainPageClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form onSubmit={handleSignup} className={styles.modalFormLogin}>
            <a>
              <div className={styles.modalLogo}>
                <Image
                  onClick={handleMainPageClick}
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </a>
            <input
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
              className={classNames(styles.modalInput, styles.passwordFirst)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <input
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
              className={classNames(styles.modalInput, styles.passwordDouble)}
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <button type="submit" className={styles.modalBtnSignupEnt}>
              <a>Зарегистрироваться</a>
            </button>
          </form>
          {err && <div className={styles.error}>{err}</div>}
        </div>
      </div>
    </div>
  );
}
