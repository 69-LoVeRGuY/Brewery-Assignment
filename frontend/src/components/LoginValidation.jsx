function Validate(values){
    let error={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "")
        error.email = "Email should not be empty";
    else if(!email_pattern.test(values.email))
        error.email = "Email should contain @ and .com"
    else    
        error.email="";

    if(values.password === "")
        error.password = "Password cannot be empty";
    else if(!password_pattern.test(values.password))
        error.password = "Password should include alphabets and digits only";
    else    
        error.password = "";
    return error;
}

export default Validate;