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
  songs: Song[]
}
