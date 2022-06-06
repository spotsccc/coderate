import { v4 } from "uuid";
import { addDays, isBefore } from "date-fns";

export type AuthToken = {
  tokenString: string
  userId: string
  expires: Date
}

export const generateAccessToken = (userId: string): AuthToken => ({
  tokenString: v4(),
  userId: userId,
  expires: addDays(new Date(), 1),
})

export const generateRefreshToken = (userId: string): AuthToken => ({
  tokenString: v4(),
  userId: userId,
  expires: addDays(new Date(), 7),
})
