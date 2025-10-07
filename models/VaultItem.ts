import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IVaultItem extends Document {
  userId: mongoose.Types.ObjectId;
  encryptedData: string; // JSON string containing encrypted: title, username, password, url, notes
  createdAt: Date;
  updatedAt: Date;
}

const VaultItemSchema: Schema<IVaultItem> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    encryptedData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VaultItem: Model<IVaultItem> = 
  mongoose.models.VaultItem || mongoose.model<IVaultItem>('VaultItem', VaultItemSchema);

export default VaultItem;

