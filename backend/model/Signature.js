import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SignatureSchema = new Schema({
  isSigned: {
    type: Boolean,
    default: false
  },
  signedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  documentType: {
    type: String,
    enum: ['Order', 'Invoice', 'Contract'], // Expand as needed
    required: true
  },
  hash: {
    type: String, // Hash of signed data for validation
    required: true,
  },
  signatureFileUrl: {
    type: String, // Optional: path to image or PDF
  },
  signedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    ip: String,
    userAgent: String,
    location: String, // Optional geo info
  }
}, { timestamps: true });

const Signature = mongoose.model("Signature", SignatureSchema);
export default Signature;
