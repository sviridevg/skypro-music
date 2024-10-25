
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackTypes } from '@/types/tracks';

export const useLikeTrack = (id: number) => {
  // const dispatch = useAppDispatch();

  // const { access, refresh } = useAppSelector(state => state.auth.token);
  // const user = useAppSelector(state => state.auth.email);

  const favoriteTracks = useAppSelector(state => state.playList.isFavorite);

  const isLiked: boolean = favoriteTracks.some( track => track === id);

  // const handleLike = async (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   e.stopPropagation();

    // if (!access || !refresh || !user) {
    //   return alert('Зарегистрируйтесь или войдите');
    // }

    // const action = isLiked ? onDislikeTracks : onLikeTracks;

  //   if (id)
  //     try {
  //       await action(id, access, refresh);
  //       dispatch(
  //         addFavoriteTracks({ access: access, refresh: refresh })
  //       ).unwrap();
  //       if (isLiked) {
  //         dispatch(setDislikeTracks(id));
  //       } else dispatch(setLikeTracks(id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };
  return { isLiked };
};
