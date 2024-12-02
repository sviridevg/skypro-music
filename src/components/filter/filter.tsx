"use client";
import styles from "@/components/filter/filter.module.css";
import { useState, useMemo } from "react";
import { FilterItem } from "./filterItem";
import { useAppSelector } from "@/store/store";

export const Filter = () => {
  const { tracksList } = useAppSelector((state) => state.playList);
  const classNames = require("classnames");

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Мемоизация уникальных значений для каждого фильтра
  const getUnValue = useMemo(
    () =>
      <T, K extends keyof T>(items: T[], key: K): string[] => {
        const unValues = new Set<string>();
        items.forEach((item) => unValues.add(String(item[key])));
        return Array.from(unValues);
      },
    []
  );

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const filtersOptions = ["По умолчанию", "Сначала новые", "Сначала старые"];

  // Мемоизация фильтров
  const filters = useMemo(
    () => [
      {
        title: "исполнителю",
        key: "author",
        list: getUnValue(tracksList, "author"),
      },
      {
        title: "жанру",
        key: "genre",
        list: getUnValue(tracksList, "genre"),
      },
      {
        title: "году",
        key: "year",
        list: filtersOptions,
      },
    ],
    [tracksList, getUnValue]
  );

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>

      {filters.map((filter) => (
        <div key={filter.key} className={filter.key}>
          <div
            onClick={() => handleFilter(filter.key)}
            className={
              activeFilter !== filter.key
                ? classNames(styles.filterButton, styles.btnText)
                : classNames(styles.filterButton, styles.activeFilterButton)
            }>
            {filter.title}
          </div>
          {activeFilter === filter.key && (
            <div className={styles.filterItem}>
              <div className={styles.filterItemElement}>
                <FilterItem
                  list={filter.list}
                  isactive={activeFilter === filter.key}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
