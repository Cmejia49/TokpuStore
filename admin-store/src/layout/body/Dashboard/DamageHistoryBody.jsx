import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./style.module.css"
import Table from "../../../components/Table/Table"
import { getDamageChart, selectSummaryData } from "../../../store/dashboard-slice";
import { BarChart } from "../../../components/Chart/BarChart";

export const lineOption = {
  responsive: true,
  maintainAspectRatio:true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Damage Report',
    },
  },
};
const columns = [
    {
      dataField: "damageId",
      text: "id"
    },
    {
      dataField: "storeName",
      text: "Store"
    },
    {
      dataField: "productName",
      text: "Name"
    },
    {
      dataField: "itemPrice",
      text: "Price"
    },
    {
      dataField: "quantity",
      text: "Quantity"
    },
    {
        dataField: "createDate",
        text: "Date"
    }
  ];
 
 
const DamageHistoryBody = ({data}) =>{
  const damageChart = useSelector(getDamageChart);
  const summaryData = useSelector(selectSummaryData)

    return(
      <Container className='d-flex flex-column mt-5'>
        <Row>
          <Col>
          <div className={styles.boxShadow + " " +styles.chartContainer}>
          <BarChart options={lineOption} data={damageChart}/>
          </div>
          </Col>
          <Col>
          <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total totalDamage
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalDamage}
                        </div>
                    </div>
          </Col>
        </Row>
        <Row>
        <Table keyField='damageId'columns={columns} data={data} title={"Damage History"}/>
        </Row>

            
        </Container>
    )
}

export default DamageHistoryBody;