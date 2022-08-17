import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import LineChart from "../../../components/Chart/LineChart";
import styles from "./style.module.css"
import Table from "../../../components/Table/Table"
import { getExpensesChart, selectSummaryData } from "../../../store/dashboard-slice";

export const lineOption = {
  responsive: true,
  maintainAspectRatio:true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Expenses Report',
    },
  },
};
const columns = [
    {
      dataField: "expensesId",
      text: "id"
    },
    {
      dataField: "storeName",
      text: "Store"
    },
    {
      dataField: "value",
      text: "Expended"
    },
    {
      dataField: "detail",
      text: "Detail"
    },
    {
      dataField: "createDate",
      text: "Date"
    }
  ];
 
 
const ExpensesHistoryBody = ({data}) =>{
  const expensesChart = useSelector(getExpensesChart);
  const summaryData = useSelector(selectSummaryData)

    return(
      <Container className='d-flex flex-column mt-5'>
        <Row>
          <Col>
          <LineChart options={lineOption} data={expensesChart}/>
          </Col>
          <Col>
          <div className={styles.boxShadow + " p-2 text-center"}>
                        <div className=''>
                            Total Expenses
                        </div>
                        <div className='mt-2'>
                            {summaryData.totalExpenses}
                        </div>
                    </div>
          </Col>
        </Row>
        <Row>
        <Table keyField='expensesId'columns={columns} data={data} title={"Expenses History"}/>
        </Row>

            
        </Container>
    )
}

export default ExpensesHistoryBody;