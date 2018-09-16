import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

export const ContactSchema = new Schema(
    {
        email: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
        firstname: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true
        },
        lastname: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: false
        },
        phonenumber: {
			type: String,
			trim: true,
			index: true,
			unique: true,
			required: true
        },
        user:
            {
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        
    },
    { collection: 'contacts' }
)
ContactSchema.plugin(timestamps);
ContactSchema.plugin(mongooseStringQuery);

ContactSchema.index({ email: 1, phone_number: 1 });
module.exports = exports = mongoose.model('Contact', ContactSchema);
export default mongoose.model('Contact', ContactSchema);
