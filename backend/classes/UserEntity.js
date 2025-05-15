import UserModel from "../model/UserModel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { hashPassword } from "../utils/hashPassword.js";

class UserEntity {
    constructor(userDoc){
        this._doc = userDoc;

        this.id = userDoc._id;
        this.fullname = userDoc.fullname;
        this.email = userDoc.email;
        this.isAdmin = userDoc.isAdmin;
        this.isSigner = userDoc.isSigner;
        this.isVerified = userDoc.isVerified;
        this.addresses = userDoc.addresses;
        this.wishlist = userDoc.wishlist;
        this.orderHistory = userDoc.orderHistory;
        this.createdAt = userDoc.createdAt;
        this.updatedAt = userDoc.updatedAt;
    }

    static async findById(id) {
        const doc = await UserModel.findById(id);
        return doc ? new UserEntity(doc) : null;
    }
    
      static async findByEmail(email) {
        const doc = await UserModel.findOne({ email });
        return new UserEntity(doc);
      }
    
      static async create(data) {
        const hashedPassword = await hashPassword(data.password);
        const doc = await UserModel.create({
            ...data,
            password: hashedPassword,
        });
        return new UserEntity(doc);
      }

      static async findAll(){
        const doc = await UserModel.find();
        return new UserEntity(doc);
      }
      
      static async delete(id){
        const doc = await UserModel.deleteOne({ _id: id});
        return new UserEntity(doc);
      }

      async save() {
        this._doc.fullname = this.fullname;
        this._doc.isVerified = this.isVerified;
        this._doc.addresses = this.addresses;
        this._doc.wishlist = this.wishlist;
        this._doc.orderHistory = this.orderHistory;
        this._doc.isAdmin = this.isAdmin;
        this._doc.isSigner = this.isSigner;
    
        await this._doc.save();
      }

      addAddress(address) {
        if (address.isDefault) {
          this.addresses.forEach(addr => addr.isDefault = false);
        }
        this.addresses.push(address);
      }
    
      setDefaultAddress(index) {
        this.addresses.forEach((addr, i) => {
          addr.isDefault = i === index;
        });
      }

      async comparePassword(password){
        return await bcrypt.compare(password + process.env.PEPPER, this._doc.password);
      }

      toJSON() {
        return {
          id: this.id,
          fullname: this.fullname,
          email: this.email,
          isVerified: this.isVerified,
          isAdmin: this.isAdmin,
          isSigner: this.isSigner,
          addresses: this.addresses,
          wishlist: this.wishlist,
          orderHistory: this.orderHistory,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        };
      }
}

export default UserEntity;