"use client";
import styles from "@/components/filter/filter.module.css";

interface FilterItemList {
  list: string[];
  isactive: boolean;
}

export const FilterItem = ({ list, isactive }: FilterItemList) => {
  return (
    <>{isactive && list.map((item, index) => <p key={index}>{item}</p>)}</>
  );
};
