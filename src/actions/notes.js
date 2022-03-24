import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, `${uid}`,"journal/notes"), newNote);
        
        dispatch(activeNote(docRef.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes.reverse()));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        const noteToFirestore = {...note};

        delete noteToFirestore.id;
        if(!note.url){
            delete noteToFirestore.url;
        }

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef, noteToFirestore);

        dispatch(refreshNotesWithAdd(note.id, note));
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved!', 'Your note has been saved', 'success');
    }
}

export const refreshNotesWithAdd = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        ...note
    }
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const activeNote = getState().notes.active;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote))

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            
            if (result.isConfirmed) {
                const uid = getState().auth.uid;
                const noteRef = doc(db, `${uid}/journal/notes/${id}`);
                deleteDoc(noteRef);
        
                dispatch(deleteNote(id));
                Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success'
                )
            }
          })   
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})