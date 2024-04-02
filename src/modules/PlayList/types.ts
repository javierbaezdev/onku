export interface Song {
  id: string
  name: string
  cover: string
  url: string
}

export interface PlayList {
  id: string
  name: string
  cover: string
  fullCover: string
  songs: Song[]
}

export interface Favorite extends Song {
  playListId: string
  playList: { name: string }
}
