import mongoose from '../../mongoose';

const Schema  = mongoose.Schema;

const NoteModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    createTime: Schema.Types.Date,
    height: {
        type: Number,
        default: 0.4
    },
    content: {
        type: String,
        default: ''
    },
    color: String,
    showElevation: {
        type: Boolean,
        default: true
    },
    showFadeShadow: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        default: ''
    },
    imageShare: {
        type: String,
        default: ''
    }
});

export interface Note {
    userId: mongoose.Types.ObjectId,
    id: mongoose.Types.ObjectId,
    createTime: Date,
    height?: number,
    color: any,
    content?: string,
    showElevation ?: boolean,
    showFadeShadow ?: boolean,
    imgUrl?: string ,
    imageShare?: string

}

const UserInfoModel = mongoose.model('note', NoteModel, 'note');

export default UserInfoModel;