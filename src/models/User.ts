import { Schema, model } from "mongoose";

import type { IUserSignupRequest } from "@type/user";

const userSchema = new Schema<IUserSignupRequest>({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUserSignupRequest>("User", userSchema);

export default User;
