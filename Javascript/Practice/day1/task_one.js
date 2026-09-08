/*1. User Registration Validator

Write a function that validates a registration object.

Requirements:

Name must be at least 2 characters.
Email must have a reasonable email format.
Password must be at least 8 characters.
Age must be 18 or older.
Return a useful validation result.

Skills: functions, objects, conditionals, strings.
*/

function validateRegistration(registration) {

    const {name, email, birthdate ,password} = registration;
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear()

    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
         today.getDate() < birth.getDate())
    ) {
        age--;
    }

    if(name.length < 2 ){
        return JSON.stringify({error : 'UserName is too short'});
    }
    if(age < 18){
        return JSON.stringify({error: "user is under age"})
    }
    if(password.length < 8 ){
        return JSON.stringify({error: "password must be 8 characters at least"})
    }
    if (!email.includes("@")) {
        return { error: "Invalid email" };
    }

    return { success: true };

}