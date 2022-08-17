import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const AccountHeader =({createClick})=>{
    return(
        <div className="m-5">
        <div className="d-flex flex-row justify-content-between">
            <div>
                <h5>Accounts</h5>
            </div>
            <Button as={Link} to={"/account/addAccount/"} variant='dark'>Create Account</Button>
        </div>
        </div>
    )
}

export default AccountHeader;