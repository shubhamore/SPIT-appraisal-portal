const asyncHandler = require('express-async-handler')
const Extracurricular = require('../models/student');
exports.setYourCommittee = asyncHandler(async(req,res) =>{
        const committeeDetails = req.body.committeeDetails
        const tenure = req.body.tenure
        const position = req.body.position
        const email = req.body.email
        console.log("hello")
        try {
            const extracurricular = await Extracurricular.findOne({emailID:email})
            extracurricular.committee.unshift({committeeDetails:committeeDetails,tenure:tenure,position:position})
            await extracurricular.save()
            res.status(200).json('Your Committee Added Succesfully')
        } catch (error) {
            console.error(error)
        }
})
exports.setVolunteerWork = asyncHandler(async(req,res) =>{
        const eventName = req.body.eventName
        const date = req.body.date
        const organization = req.body.organization
        const description = req.body.description
        const email = req.body.email
        try {
            const extracurricular = await Extracurricular.findOne({emailID:email})
            extracurricular.volunteerWork.unshift({eventName:eventName,date:date,organization:organization,description:description})
            await extracurricular.save()
            res.status(200).json('Your Volunteer Work Added Succesfully')
        } catch (error) {
            console.error(error)
        }
})

exports.setParticipation = asyncHandler(async(req,res) =>{
        const eventName = req.body.eventName
        const date = req.body.date
        const organization = req.body.organization
        const description = req.body.description
        const email = req.body.email
        try {
            const extracurricular = await Extracurricular.findOne({emailID:email})
            extracurricular.participation.unshift({eventName:eventName,date:date,organization:organization,description:description})
            await extracurricular.save()
            res.status(200).json('Your Event Participation Added Succesfully')
        } catch (error) {
            console.error(error)
        }
})

exports.deleteYourCommittee = asyncHandler(async(req,res)=>{
    try {
        const committees = req.body.committee
        const email = req.body.email
        await Extracurricular.findOneAndUpdate({emailID:email},{$set:{committee:committees}})
        res.status(200).json('Your Committee deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.deleteYourVolunteerWork = asyncHandler(async(req,res)=>{
    try {
        const volunteerWork = req.body.volunteerWork
        const email = req.body.email
        await Extracurricular.findOneAndUpdate({emailID:email},{$set:{volunteerWork:volunteerWork}})
        res.status(200).json('Your Volunteer WORK deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.deleteParticipation = asyncHandler(async(req,res)=>{
    try {
        const participation = req.body.participation
        const email = req.body.email
        await Extracurricular.findOneAndUpdate({emailID:email},{$set:{participation:participation}})
        res.status(200).json('Your Event Participation deleted Succesfully')
    } catch (error) {
        console.error(error)
    }
})

exports.getYourCommittee = asyncHandler(async(req,res)=>{
    console.log("j")
    const email = req.body.email
    try {
        const yourCommittees = await Extracurricular.find({emailID:email}).select('committee -_id')
        res.status(200).json(yourCommittees)    
    } catch (error) {
        console.error(error)
    }
})
exports.getYourVolunteerWork = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const yourVolunteerWork = await Extracurricular.findOne({emailID:email}).select('volunteerWork -_id')
        res.status(200).json(yourVolunteerWork)    
    } catch (error) {
        console.error(error)
    }
})
exports.getParticipation = asyncHandler(async(req,res)=>{
    const email = req.body.email
    try {
        const participation = await Extracurricular.findOne({emailID:email}).select('participation -_id')
        res.status(200).json(participation)    
    } catch (error) {
        console.error(error)
    }
})