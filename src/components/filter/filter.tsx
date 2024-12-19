"use client";

import { useState, useMemo } from "react";
import { FilterItem } from "./filterItem";
import { useAppSelector } from "@/store/store";
import classNames from "classnames";
import styles from "@/components/filter/filter.module.css";

export const Filter = () => {
  const {
    shuffledList = [], // устанавливаем значение по умолчанию
    whatApage,
    currentGenre,
    activeGenres = [],
    activeAuthors = [],
    sortOption = [],
  } = useAppSelector((state) => state.playList);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const uniqueValuesByKey = useMemo(() => {
    return <T, K extends keyof T>(items: T[], key: K): string[] => {
      const uniqueValues = new Set<string>();
      items.forEach((item) => uniqueValues.add(String(item[key])));
      return Array.from(uniqueValues);
    };
  }, []);

  const filters = useMemo(() => {
    if (!shuffledList || !currentGenre) return []; // Проверяем, что данные загружены
    return [
      {
        title: "Исполнителю",
        key: "author",
        list: uniqueValuesByKey(
          whatApage === "genre" ? currentGenre : shuffledList,
          "author"
        ),
      },
      {
        title: "Жанру",
        key: "genre",
        list: uniqueValuesByKey(
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
  }, [whatApage, currentGenre, shuffledList, uniqueValuesByKey]);

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const renderFilterCount = (filterKey: string) => {
    if (filterKey === "author") return activeAuthors.length;
    if (filterKey === "genre") return activeGenres.length;
    if (filterKey === "year") return sortOption.length;
    return 0;
  };

  const renderFilterButton = (filterTitle: string, filterKey: string) => (
    <>
      {filterTitle}
      {renderFilterCount(filterKey) > 0 && (
        <div className={styles.filterTab}>{renderFilterCount(filterKey)}</div>
      )}
    </>
  );

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
            )}
          >
            {renderFilterButton(filter.title, filter.key)}
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
