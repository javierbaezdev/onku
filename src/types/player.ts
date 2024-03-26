export interface Volume {
  initialValue: number
  max: number
  min: number
  lastVolume?: number
  isMute: boolean
  value?: number
}

export interface PlayerBar {
  initialValue: number
  max: number
  min: number
  isPlaying: boolean
  currentTime: number
  isRandom: boolean
  isLoop: boolean
}
