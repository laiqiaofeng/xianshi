import NoteModel , { Note } from '../models/note';
import mongoose from '../../mongoose';

const createNote = (noteData : Note) => {
    const note = new NoteModel(noteData);

    return new Promise((res, rej) => {
        note.save((err : any, raw : any) => {
            if (err) {
                rej(err);
            }else {
                res(noteData.id);
            }
        })
    });
}

const queryNoteById = (userId : mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        NoteModel.find({"userId": userId}, (err : any, raw : any) => {
            if (err) {
                rej(err);
            }else {
                res(raw);
            }
        })
    });
}

const queryNoteCountById = (userId : mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        NoteModel.find({"userId": userId}).count().exec((err : any, total : any) => {
            if (err) {
                rej(err);
            }else {
                console.log('这里执行了吗', total);
                res(total);
            }
        })
    });
}

const getNoteList = (userId : mongoose.Types.ObjectId, pageIndex : number, pageSize : number) => {
    console.log('分页请求')
   return queryNoteCountById(userId).then((total : any) => {
        return  new Promise((res, rej) => {
            NoteModel.find({"userId": userId})
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .exec((err: any, data: any) => {
                if (err) {
                    rej(err);
                }else {
                    res({
                        total,
                        pageIndex,
                        list: data
                    })
                }
            })
        })
    });
}

const deleteNoteById = (noteId : mongoose.Types.ObjectId) => {
    return new Promise((res, rej) => {
        NoteModel.deleteOne({"id": noteId}, (err : any) => {
            if (err) {
                rej(err);
            }else {
                
                res('success');
            }
        })
    });
}

const updateNoteById = (noteId : mongoose.Types.ObjectId, updateDate: Record<string, any>) => {
    return new Promise((res, rej) => {
        NoteModel.update({"id": noteId}, updateDate, (err : any) => {
            if (err) {
                rej(err);
            }else {
                res('success');
            }
        })
    });
}

export {
    createNote,
    getNoteList,
    queryNoteById,
    queryNoteCountById,
    deleteNoteById,
    updateNoteById
}
