import bcrypt from "bcrypt"


export const hash = (plainText, saltRound=process.env.SALTROUND)=>{
    const hashResult = bcrypt.hashSync(plainText,parseInt(saltRound));
    return hashResult;
}

export const compare = async (password,hashValue) =>{
    const compareResult =  await bcrypt.compare(password,hashValue);
    return compareResult;
}