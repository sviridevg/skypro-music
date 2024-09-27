export type TrackTypes = {
    _id: number,
    name: string,
    author: string,
    releaseDate: string,
    genre: string[],
    duration_in_seconds: number,
    album: string,
    logo: unknown,
    trackFile: string,
    staredUser: number[],
}