"use client";

import styles from "@/components/filter/filter.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setActiveGenres,
  setActiveAuthors,
  applyFilters,
  setSortOption,
} from "@/store/features/playListSlice";

interface FilterItemProps {
  list: string[];
  isactive: boolean;
  filterKey: "genre" | "author" | "year";
}

export const FilterItem = ({ list, filterKey }: FilterItemProps) => {
  const dispatch = useAppDispatch();

  const selectedItems = useAppSelector((state) => {
    switch (filterKey) {
      case "genre":
        return state.playList.activeGenres;
      case "author":
        return state.playList.activeAuthors;
      case "year":
        return state.playList.sortOption;
      default:
        return [];
    }
  });

  const handleToggle = (item: string) => {
    let updatedItems;

    if (filterKey === "year") {
      updatedItems = selectedItems.includes(item) ? [] : [item];
    } else {
      updatedItems = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
    }

    if (filterKey === "genre") {
      dispatch(setActiveGenres(updatedItems));
    }
    if (filterKey === "author") {
      dispatch(setActiveAuthors(updatedItems));
    }
    if (filterKey === "year") {
      dispatch(setSortOption(updatedItems));
    }

    dispatch(applyFilters());
  };

  return (
    <>
      {list.map((item, index) => (
        <label key={index}>
          <input
            className={styles.checkbox}
            type={filterKey === "year" ? "radio" : "checkbox"}
            checked={selectedItems.includes(item)}
            onChange={() => handleToggle(item)}
            name={filterKey === "year" ? "radio" : "checkbox"}
          />
          <p className={styles.filterItemP}>{item}</p>
        </label>
      ))}
    </>
  );
};
