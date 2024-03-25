export interface Volume {
  initialValue: number
  max: number
  min: number
  lastVolume?: number
  isMute: boolean
}

export interface PlayerBar {
  initialValue: number
  max: number
  min: number
  isPlaying: boolean
}
