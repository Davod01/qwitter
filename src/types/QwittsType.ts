export type TQwitt = {
  id: number,
  content: string,
  created_at: Date,
  updated_at?: Date,
  profile_id?: number
  profiles: TProfile
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