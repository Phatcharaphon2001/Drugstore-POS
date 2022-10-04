import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import ReportTable from '../components/ReportTable';
import ReportHead from '../components/ReportHead';

export default class Report extends Component {
  render() {
    return (
      <Container>

      <ReportHead/>

      <br></br>

      <ReportTable/>

      </Container>
      
    )
  }
}

//ReportTable ยังไม่ทำให้ตารางสวยงาม