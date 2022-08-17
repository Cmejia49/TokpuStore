import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
const DashboardFooter = ()=>{
    return(
        <Container className={styles.boxShadow + " mb-3"}>
            <div>History Transaction</div>
            <div  className="d-flex justify-content-around p-3">
            <Button as={Link} to={"/dashboard/sale"} variant="dark">Sale History</Button>
            <Button as={Link} to={"/dashboard/expenses"} variant="dark">Expenses History</Button>
            <Button  as={Link} to={"/dashboard/damage"} variant="dark">Damage History</Button>
            </div>
        </Container>
    )
}

export default DashboardFooter;