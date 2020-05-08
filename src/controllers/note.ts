import * as noteDAO from '../DAO/note';
import { Note } from '../models/note';
import mongoose from '../../mongoose';
import deleteFolder from '../../utils/deleteFolder';

function createNote (options : Record<string, any>, url : string = '' ) {
    const userId : string = options['userId']![0] || '';
    const content : string = options['content']![0] || ''; 
    const height : number = options['height']![0] || 0.4;
    const showElevation : boolean = options['showElevation']![0] === 'true';
    const showFadeShadow : boolean = options['showFadeShadow']![0] === 'true';
    const color : any = options['color']![0] || '';
    const note : Note = {
        userId: mongoose.Types.ObjectId(userId),
        id: mongoose.Types.ObjectId(),
        content,
        createTime: new Date(),
        height,
        showElevation,
        showFadeShadow,
        color,
        imgUrl: url 
    }
    return noteDAO.createNote(note);
}

function getNoteList (query : Record<string, any> ) {
    const userId : mongoose.Types.ObjectId = mongoose.Types.ObjectId(query['userId'] || '');
    const pageIndex : number = Number(query['pageIndex']) || 1;
    const pageSize : number = Number(query.pageSize) || 10;
    return noteDAO.getNoteList(userId, pageIndex, pageSize);
}

function deleteNote ( body: Record<string, any> ) {
    const noteId : mongoose.Types.ObjectId = mongoose.Types.ObjectId(body['noteId'] || '');
    const imgUrl : string = body.imgUrl;
    return noteDAO.deleteNoteById(noteId).then(data => {
        if (imgUrl) {
            const oldUrl  = `public/${imgUrl.substring(imgUrl.indexOf('images/'), imgUrl.length)}`
            deleteFolder(oldUrl);
            console.log('图片删除成功', oldUrl, imgUrl);
        }
        return "success";
    });
}

function updateNote ( body: Record<string, any> ) {
    const noteId : mongoose.Types.ObjectId = mongoose.Types.ObjectId(body['noteId'] || '');
    const update : Record<string, any> = body.update;
    return noteDAO.updateNoteById(noteId, update);
}

function getNoteCount ( query: Record<string, any> ) {
    const userId : mongoose.Types.ObjectId = mongoose.Types.ObjectId(query['userId'] || '');

    return noteDAO.queryNoteCountById(userId);
}

export {
    createNote,
    getNoteList,
    deleteNote,
    updateNote,
    getNoteCount
}