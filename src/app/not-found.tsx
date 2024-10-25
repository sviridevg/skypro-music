import classNames from "classnames";
import styles from "../app/not-found.module.css";
import { Inter } from "next/font/google";
const montserrat = Inter({ subsets: ["cyrillic"] });
import Image from "next/image";

export default function NotFound() {
  return (
    <div className={classNames(styles.wrapper, montserrat.className)}>
      <div className={styles.containerNotFoun}>
        <div className={styles.modalBlock}>
          <p className={styles.fourHundredAndFour}>404</p>
          <div className={styles.modalBlockContainer}>
            <h1>Страница не найдена</h1>
            <Image
              src="/icon/smile_crying.svg"
              alt="logo"
              width={52}
              height={52}
            />
          </div>
          <h2>Возможно, она была удалена или перенесена на другой адрес</h2>
          <button className={styles.modalBtnSignupEnt}>
            <a href="/">Вернуться на главную</a>
          </button>
        </div>
      </div>
    </div>
  );
}
