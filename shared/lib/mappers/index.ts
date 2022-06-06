import { ObjectId } from "mongodb";

export const mapId = <T extends { _id: ObjectId }>(v: T) => ({
  ...v,
  _id: v._id.toHexString(),
})
