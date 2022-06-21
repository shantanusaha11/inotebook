import React, { useContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import { Noteitem } from "./Noteitem";

export const Notes = (props) => {
  const context = useContext(NoteContext);
  let history = useHistory();
  // eslint-disable-next-line
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      history.push("/login");
    }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    props.showAlert("updated successfully", "success");
  };

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    document.title = "iNotebook";
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Tag
                    </label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                  </div>
                </form>
            </div>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{document.title = "iNotebook";}}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>
                  Update note
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
          );
        })}
      </div>
    </>
  );
};
