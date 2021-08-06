import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { endTimeRange, startTimeRange } from '../../helpers/timeRange';

const BookingForm = ({ booking, rooms, handleChange, handleSubmit }) => (
  <Form>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter the title of your booking"
          value={booking?.title}
          name="title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Resume your booking"
          value={booking?.description}
          name="description"
          onChange={handleChange}
        />
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridStart">
        <Form.Label>Start time</Form.Label>
        <Form.Select size="sm" name="startTime" onChange={handleChange}>
          {startTimeRange.map((start) => (
            <option value={start.value} selected={booking?.startTime === start.value}>
              {start.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridEnd">
        <Form.Label>End time</Form.Label>
        <Form.Select size="sm" name="endTime" onChange={handleChange}>
          {endTimeRange.map((end) => (
            <option value={end.value} selected={booking?.endTime === end.value}>
              {end.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Row>
    <Form.Group className="mb-3" controlId="formGridRoom">
      <Form.Label>Room</Form.Label>
      <Form.Select size="sm" onChange={handleChange} name="room">
        {rooms.length > 0 &&
          rooms.map((room) => (
            <option value={room.id} selected={room.id === booking?.roomId}>
              {room.name}
            </option>
          ))}
      </Form.Select>
    </Form.Group>
    <Button type="submit" onClick={handleSubmit}>
      Send
    </Button>
  </Form>
);
export default BookingForm;
