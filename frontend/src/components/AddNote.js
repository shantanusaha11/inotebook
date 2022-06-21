import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const handleClick = (e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title: "", description: "", tag: ""});
      props.showAlert("Added Successfully","success");
  }
  const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
  }
  return (
    <div className="container my-3">
      <h1>Add note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label> 
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} required value={note.tag}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
