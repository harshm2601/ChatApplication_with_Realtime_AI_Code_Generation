import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

export const createProject = async ({
    name, userId
}) => {
    if(!name){
        throw new Error("Name is required");
    }
    if(!userId){
        throw new Error("UserId is required");
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [ userId ]
        });
    } catch (error) {
        if(error.code === 11000){
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;
}

export const getAllProjectByUserId = async ({userId}) => {
    if(!userId){
        throw new Error('UserId is required')
    }

    const alluserProjects = await projectModel.find({
        users: userId
    })

    return alluserProjects
}

export const addUserToProject = async ({ projectId, users, userId }) => {
    // Input validation section
    if(!projectId){
        throw new Error("ProjectId is required");
    }

    //check for ProjectId is it mongooseId 
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid ProjectId");
    }

    if(!users){
        throw new Error("users are required");    
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid userID in user Array");
    }

    if(!userId){
        throw new Error("UserId is required");
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid userId");
    }

    // Check if the requesting user belongs to the project
    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if(!project){
        throw new Error("user not belong to this project");
    }

    // Add new users to the project
    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })
    // $addToSet: Ensures no duplicate users are added (only adds unique users)
    // $each: Allows adding multiple users at once
    return updatedProject
}