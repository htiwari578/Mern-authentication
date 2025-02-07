import bcrypt from "bcryptjs";

export const hashValue = async (value : string, saltRounds?: number) =>
    bcrypt.hash(value, saltRounds || 8);


export const compareValue = async(value: string , hashedValue: string) => 
    bcrypt.compare(value ,hashedValue).catch(() => false);