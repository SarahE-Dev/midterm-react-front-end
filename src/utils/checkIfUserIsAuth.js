import { jwtDecode } from "jwt-decode";
import setAxiosAuthToken from "./setAxiosAuthToken";

const checkIfUserIsAuth = () => {
    let getJwtToken = window.localStorage.getItem('jwt');
    if(getJwtToken){
        const currentTime = Date.now()/1000
        let decodedToken = jwtDecode(getJwtToken)
        if(decodedToken.exp < currentTime){
            return false
        }else{
            setAxiosAuthToken(getJwtToken)
            return true
        }
    }else{
        return false
    }
}

export default checkIfUserIsAuth