"use client";

import Image from "next/image";
import styles from "./signin.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";
import {
  loginUser,
  tokenUser,
  updateTokenUser,
} from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { fetchTracks } from "@/store/features/playListSlice";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [err, setError] = useState<string | null>(null);
  const errorMessage = useAppSelector((state) => state.auth.errorMessage);
  const [signInData, setSignInData] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signInData.email) {
      setError("Введите логин");
      return;
    }
    if (!signInData.password) {
      setError("Введите пароль");
      return;
    }
    if (signInData.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    try {
      await dispatch(
        loginUser({ email: signInData.email, password: signInData.password })
      )
        .then((data) => {
          if (data.type === "User/Login/fulfilled") {
            dispatch(fetchTracks()).finally(() => {
              router.push("/");
            });
          }
        })
        .catch((data) => {
          setError(data.error.message);
        });
      await dispatch(
        tokenUser({ email: signInData.email, password: signInData.password })
      );
      await dispatch(updateTokenUser(localStorage.getItem("refresh") ?? ""));
    } catch (error) {
      return;
    }
  };

  const handleMainPageClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form
            onSubmit={handleSignin}
            className={styles.modalFormLogin}
            action="#">
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
                setSignInData({ ...signInData, email: e.target.value })
              }
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button type="submit" className={styles.modalBtnEnter}>
              <a>Войти</a>
            </button>
            <button className={styles.modalBtnSignup}>
              <a href="/signup">Зарегистрироваться</a>
            </button>
          </form>
          {(err || errorMessage) && (
            <div className={styles.error}>{err || errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
