"use client";

import Image from "next/image";
import styles from "./successfully.module.css";
import { useRouter } from "next/navigation";

export default function Successfully() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signin");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <div className={styles.modalFormLogin}>
            <div className={styles.modalLogo}>
              <Image
                src="/img/logo_modal.png"
                alt="logo"
                width={140}
                height={21}
              />
            </div>
            <div>
              <p className={styles.successText}>
                Вы успешно зарегистрированы. Пожалуйста, перейдите на страницу
                авторизации.
              </p>
            </div>
            <button onClick={handleClick} className={styles.modalBtnSignupEnt}>
              Авторизоваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
