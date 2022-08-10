import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchNotes } from "../../Features/notesSlice";

const SingleNote = ({ note }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [read, setRead] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { title, body } = note;
  const [initialValue, setInitialValue] = useState({
    title: title,
    body: body,
  });
  const handleEdit = (e) => {
    setInitialValue({
      ...initialValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/notes/${note._id}`, {
      initialValue,
    });
    await dispatch(fetchNotes());
  };
  return (
    <div className="p-5 border border-primary">
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="gap-2">
        <Button
          onClick={() => {
            handleShow();
            setEdit(true);
          }}
          variant="outline-primary"
          className="mb-0"
        >
          Edit
        </Button>
        <Button variant="outline-danger">Delete</Button>
        <Button
          onClick={() => {
            handleShow();
            setRead(true);
            console.log(read);
          }}
          variant="outline-success"
        >
          Read More
        </Button>
      </div>
      {read && (
        <Modal
          show={show}
          onHide={() => {
            handleClose();
            setRead(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
        </Modal>
      )}
      {edit && (
        <Modal
          show={show}
          onHide={() => {
            handleClose();
            setEdit(false);
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={initialValue.title}
                name="title"
                id=""
                onChange={handleEdit}
              />
              <textarea
                value={initialValue.body}
                name="body"
                id=""
                cols="30"
                rows="10"
                onChange={handleEdit}
              ></textarea>{" "}
              <br />
              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default SingleNote;
