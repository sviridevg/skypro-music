import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetTracks, setSearchKeyword } from "@/store/features/playListSlice";
import styles from "@/components/search/search.module.css";

export const Search = () => {
  const dispatch = useAppDispatch();
  const searchKeyword = useAppSelector((state) => state.playList.searchKeyword);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchKeyword(value));
    if (!value) {
      dispatch(resetTracks());
    }
  };

  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchKeyword}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};
