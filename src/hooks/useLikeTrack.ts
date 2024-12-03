import { addFavoritesForId, dellFavoritesForId } from '@/api/tracks';
import { dellFavoriteTrack, pushFavoriteTrack, setDellFavoriteTrack, setFavoriteTrack } from '@/store/features/playListSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useMemo } from 'react';

export const useLikeTrack = (id: number) => {
  const dispatch = useAppDispatch();

  const favoriteTracks = useAppSelector(state => state.playList.isFavorite);

  // Мемоизируем вычисление isLiked
  const isLiked = useMemo(() => favoriteTracks.some(track => track === id), [favoriteTracks, id]);

  const toggleLike = async () => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const user = localStorage.getItem('email');
  
    if (!access || !refresh || !user) {
      return alert('Зарегистрируйтесь или войдите');
    }
  
    const action = isLiked ? dellFavoritesForId : addFavoritesForId;
  
    if (id) {
      try {
        await action(id);
  
        if (isLiked) {
          dispatch(dellFavoriteTrack(id));
          dispatch(setDellFavoriteTrack(id));
        } else {
          dispatch(pushFavoriteTrack(id));
          dispatch(setFavoriteTrack(id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return { isLiked, toggleLike };
};
