import { forwardRef, Inject, Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, MongooseFilterQuery } from 'mongoose';
import { UpdateUserDto } from 'src/libs/dtos';
import { User } from 'src/models/UserSchema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async findUserById(filter: MongooseFilterQuery<User>): Promise<User> {

        return await this.userModel.findOne(filter);

    }
    async findUsersWithFilter(@Request() req): Promise<any[]> {
        const users = await this.userModel.find({ city: req.user.city });
        const filteredUsers = users.filter(user => user._id.toString() !== req.user._id.toString())
        return filteredUsers;
    }
    async findUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findRecomendedUsers(@Request() req): Promise<any[]> {
        const recommended = await this.userModel.aggregate(
            [
                {
                    $match: {
                        'role': 'host',
                        'city': req.user.city
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'profileId',
                        as: "userComments"
                    }
                },
                {
                    $unwind: "$userComments"
                },
                {
                    $group: {
                        _id: '$_id', avg: { $avg: '$userComments.rating' }, count: { $sum: 1 }, "name": { "$first": "$email" }
                    }
                },
                {
                    $sort: { avg: -1, count: -1 },
                },
                { $limit: 5 }

            ]
        )
        return recommended;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const isUser = await this.userModel.findById(id);
        await isUser.updateOne(updateUserDto)
        return isUser;
    }

    async addNewServiceToUser(id: string, service: any): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, {
            $push: { services: service }
        });
    }
}
