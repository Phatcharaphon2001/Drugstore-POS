import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Home extends Component {
  render() {

    let newDate = new Date()
    let day = newDate.getDay();
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let day_th = ["อาทิตย์","จันทร์", "อังคาร", "พุธ","พฤหัสบดี","ศุกร์","เสาร์"];
    let month_th = ["มกราคม", "กุมภาพันธ์", "มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

    return (
        <Container>
          <div className="text-center vh-100 mt-5 p-5">
            <h1 className="mb-5">วัน{day_th[day]} ที่ {date} {month_th[month]} {year}</h1>
            <Row>
              <Col xs={12} md={6} lg={3}>
                <a href="/sales" className="text-decoration-none">
                <Card className="w-100 mb-3" bg="success" text="light">
                  <Card.Body>
                    <Card.Title className="display-1"><FaIcons.FaShoppingCart/></Card.Title>
                    <Card.Text className="mb-3">
                      Sales
                    </Card.Text>
                  </Card.Body>
                  </Card>
                  </a>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <a href="/inventory" className="text-decoration-none">
                  <Card className="w-100 mb-3" bg="primary" text="light">
                    <Card.Body>
                      <Card.Title className="display-1"><MdIcons.MdOutlineInventory/></Card.Title>
                      <Card.Text className="mb-3">
                        Inventory
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <a href="/user" className="text-decoration-none">
                  <Card  className="w-100 mb-3" bg="warning" text="dark">
                    <Card.Body>
                      <Card.Title className="display-1"><IoIcons.IoMdPeople/></Card.Title>
                      <Card.Text className="mb-3">
                        User
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <a href="/report" className="text-decoration-none">
                <Card className="w-100 mb-3" bg="secondary" text="light">
                  <Card.Body>
                    <Card.Title className="display-1"><IoIcons.IoIosPaper/></Card.Title>
                    <Card.Text className="mb-3">
                      Report
                    </Card.Text>
                  </Card.Body>
                </Card>
                </a>
              </Col>
            </Row>
          </div>
        </Container>
    )
  }
}
