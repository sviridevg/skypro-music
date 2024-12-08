"use client";
import { useState } from "react";
import { FilterItem } from "./filterItem";
import { useAppSelector, useAppDispatch } from "@/store/store";
import classNames from "classnames";
import styles from "@/components/filter/filter.module.css";

export const Filter = () => {

  const { shuffledList } = useAppSelector((state) => state.playList);
  const { whatApage } = useAppSelector((state) => state.playList);
  const { currentGenre, activeGenres, activeAuthors, sortOption } =
    useAppSelector((state) => state.playList);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Функция для извлечения уникальных значений по ключу
  const extractUniqueValues = <T, K extends keyof T>(
    items: T[],
    key: K
  ): string[] => {
    const uniqueValues = new Set<string>();
    items.forEach((item) => uniqueValues.add(String(item[key])));
    return Array.from(uniqueValues);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  // Изначальные фильтры (они не изменяются)
  const filters = [
    {
      title: "Исполнителю",
      key: "author",
      list: extractUniqueValues(
        whatApage === "genre" ? currentGenre : shuffledList,
        "author"
      ),
    },
    {
      title: "Жанру",
      key: "genre",
      list: extractUniqueValues(
        whatApage === "genre" ? currentGenre : shuffledList,
        "genre"
      ),
    },
    {
      title: "Году",
      key: "year",
      list: ["По умолчанию", "Сначала новые", "Сначала старые"],
    },
  ];

  return (
    <div className={classNames(styles.centerblockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>

      {filters.map((filter) => (
        <div key={filter.key} className={filter.key}>
          <div
            onClick={() => handleFilter(filter.key)}
            className={classNames(
              styles.filterButton,
              activeFilter !== filter.key
                ? styles.btnText
                : styles.activeFilterButton
            )}>
            {filter.title === "Исполнителю" && (
              <>
                {filter.title}
                {activeAuthors.length > 0 && (
                  <div className={styles.filterTab}>{activeAuthors.length}</div>
                )}
              </>
            )}
            {filter.title === "Жанру" && (
              <>
                {filter.title}
                {activeGenres.length > 0 && (
                  <div className={styles.filterTab}>{activeGenres.length}</div>
                )}
              </>
            )}
            {filter.title === "Году" && (
              <>
                {filter.title}
                {sortOption.length > 0 && (
                  <div className={styles.filterTab}>{sortOption.length}</div>
                )}
              </>
            )}
          </div>
          {activeFilter === filter.key && (
            <div className={styles.filterItem}>
              <div className={styles.filterItemElement}>
                <FilterItem
                  list={filter.list}
                  isactive={activeFilter === filter.key}
                  filterKey={filter.key as "genre" | "author" | "year"}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
