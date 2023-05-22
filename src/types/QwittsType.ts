export type TQwitt = {
  id?: number,
  qwitt: string,
  created_at?: Date,
  updated_at?: Date,
  profile_id?: string,
  qwitt_id?: number | null,
  profiles?: TProfile,
  likes?: Like[],
  count?: count[]
}

export type TProfile = {
  id: string,
  username: string,
  name: string,
  last_name?: string,
  avatar_url?: string,
  website?: string,
  created_at?: Date,
  updated_at?: Date
}

export type Like = {
  profile_id: string,
  qwitt_id: number,
  created_at?: Date
}

export type comment = {
  id: number,
  content: string,
  profile_id: string,
  qwitt_id: number,
  created_at: Date
}

export type count = {
  count?: number
}