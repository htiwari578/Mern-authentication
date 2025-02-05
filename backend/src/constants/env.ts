
const getEnv = (key: string, defaultValue?: string ):string => {
    const value = process.env[key] || defaultValue;

    if(value === undefined){
        throw new Error(`Missing enviorment variable ${key}`);
    }
    return value;
}

export const NONGO_URI = getEnv("MONGO_URI");