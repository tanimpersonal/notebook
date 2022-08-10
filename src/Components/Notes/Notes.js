import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../Features/notesSlice";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import SingleNote from "../SingleNote/SingleNote";
import "./notes.css";
const Notes = () => {
  const { isLoading, notes, error } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotes());
  }, []);
  console.log(notes);
  return (
    <div>
      {isLoading && <CustomSpinner></CustomSpinner>}
      <div className="notes gap-3">
        {notes &&
          notes.map((note) => (
            <SingleNote key={note._id} note={note}></SingleNote>
          ))}
      </div>
    </div>
  );
};

export default Notes;
