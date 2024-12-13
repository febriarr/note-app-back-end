const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = { id, createdAt, updatedAt, title, tags, body };

  // Add the new note to the notes array.
  notes.push(newNote);

  // Check if the note was added successfully.
  const isSuccess = notes.filter((note) => note.id === id).length === 1;

  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Note added successfully',
        data: {
          noteId: id,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: 'fail',
      message: 'Note failed to add',
    })
    .code(500);
};

const getAllNotes = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNotesByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id[0]);

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    messsage: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes,
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.respons({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbaharui',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil di Hapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan Gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotes,
  getNotesByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
