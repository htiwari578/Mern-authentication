

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}
export const createAccount = async (data: CreateAccountParams)=> {
    //verify existing user dosn't exist
}