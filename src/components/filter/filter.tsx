"use client";
import styles from "@/components/filter/filter.module.css";
import { useState } from "react";
import { FilterItem } from "./filterItem";
import { useAppSelector } from "@/store/store";

export const Filter = () => {

  const { tracksList } = useAppSelector((state) => state.playList);
  
  const classNames = require("classnames");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const getUnValue = <T, K extends keyof T>(items: T[], key: K): string[] => {
    const unValues = new Set<string>();
    items?.forEach((item) => unValues.add(String(item[key])));

    return Array.from(unValues);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const filtersOptions = ["По умолчанию", "Сначала новые", "Сначала старые"];
  const filters = [
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
  ];

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className="author">
        <div
          onClick={() => handleFilter("author")}
          className={
            activeFilter !== "author"
              ? classNames(styles.filterButton, styles.btnText)
              : classNames(styles.filterButton, styles.activeFilterButton)
          }>
          исполнителю
        </div>
        {activeFilter === "author" && (
          <div className={styles.filterItem}>
            <div className={styles.filterItemElement}>
              {filters.map((filter) => (
                <FilterItem
                  key={filter.key}
                  list={filter.list}
                  isactive={activeFilter === filter.key}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="year">
        <div
          onClick={() => handleFilter("year")}
          className={
            activeFilter !== "year"
              ? classNames(styles.filterButton, styles.btnText)
              : classNames(styles.filterButton, styles.activeFilterButton)
          }>
          году выпуска
        </div>
        {activeFilter === "year" && (
          <div className={styles.filterItem}>
            <div className={styles.filterItemElement}>
              {filters.map((filter) => (
                <FilterItem
                  key={filter.key}
                  list={filter.list}
                  isactive={activeFilter === filter.key}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="genre">
        <div
          onClick={() => handleFilter("genre")}
          className={
            activeFilter !== "genre"
              ? classNames(styles.filterButton, styles.btnText)
              : classNames(styles.filterButton, styles.activeFilterButton)
          }>
          жанру
        </div>
        {activeFilter === "genre" && (
          <div className={styles.filterItem}>
            <div className={styles.filterItemElement}>
              {filters.map((filter) => (
                <FilterItem
                  key={filter.key}
                  list={filter.list}
                  isactive={activeFilter === filter.key}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
