import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LineChart from "../../../components/Chart/LineChart";
import styles from "./style.module.css"
import Table from "../../../components/Table/Table"
import { getSaleChart, selectSummaryData } from "../../../store/dashboard-slice";

export const lineOption = {
  responsive: true,
  maintainAspectRatio:true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sale Report',
    },
  },
};
const columns = [
    {
      dataField: "saleId",
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
      dataField: "itemCode",
      text: "Code"
    },
    {
      dataField: "price",
      text: "price"
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
 
 
const SaleHistoryBody = ({data,totalSize}) =>{
  const saleChart = useSelector(getSaleChart);
  const summaryData = useSelector(selectSummaryData)

    return(
      <Container className='d-flex flex-column mt-5'>
        <Row>
          <Col>
          <div className={styles.boxShadow + " " +styles.chartContainer}>
          <LineChart options={lineOption} data={saleChart}/>
          </div>
          </Col>
          <Col>
            <Row>
                <Col>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Sale
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalSale}
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Cost
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalCost}
                        </div>
                    </div>
                </Col>
          </Row>
          <Row className="mt-3">
                <Col>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                        Total Profit
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalProfit}
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Net Income
                        </div>
                        <div className='mt-2'>
                            {summaryData.netIncome}
                        </div>
                    </div>
                </Col>
          </Row>
          </Col>
        </Row>
        <Row>
        <Table keyField='saleId'columns={columns} data={data} title={"Sale History"}/>
        </Row>

            
        </Container>
    )
}

export default SaleHistoryBody;