const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    yearofAssesment: {
        type: String,
    },
    facultyName: {
        type: String,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    Dimension1: {
        info: {
            courses: [
                {
                    name: {
                        type: String,
                        default: null
                    },
                    class: {
                        type: String,
                        default: null
                    },
                    sem: {
                        type: String,
                        default: null
                    },
                    AP2MarksObtained: {
                        type: Number,
                        default: 0
                    },
                    AP3LecturesTarget: {
                        type: Number,
                        default: 0
                    },
                    AP3LectureConducted: {
                        type: Number,
                        default: 0

                    },
                    AP3PercentAchieved: {
                        type: Number,
                        // max: 100
                    },
                    AP4PercentFeedback: {
                        type: Number,
                        // max: 100
                    },
                    AP5AttendanceStudent: {
                        type: Number,
                        default: 0
                    },
                    AP8ActivityRemedial: {
                        type: String,
                        default: "Null",
                    },
                    AP9noteworthyDetails: {
                        type: String,
                        default: "Null",
                    },
                    // AP10paperSet: [{
                    //     paperSetForCourse: {
                    //         type: String,
                    //         default: "Null"
                    //     },
                    //     marks: {
                    //         type: Number,
                    //         default: 0
                    //     }
                    // }]
                },
            ],

            AP1Marks: {
                type: Number,
                default: null,
                // max: 10
            },
            AP2Average: {
                type: Number,
                //max: 10
                default: null
            },
            AP2Marks: {
                type: Number,
                //max: 10   
                default: null
            },
            AP3Average: {
                type: Number,
                //max: 30
                default: null
            },
            AP3Marks: {
                type: Number,
                //max: 30
                default: null

            },
            AP4Marks: {
                type: Number,
                //max: 30
                default: null

            },
            AP5Average: {
                type: Number,
                //max: 5
                default: null
            },
            AP5Marks: {
                type: Number,
                // max: 5
                default: null
            },
            AP8Marks: {
                type: Number,
                // max: 5
                default: null
            },
            AP9Marks: {
                type: Number,
                // max: 10
                default: null
            },
            // AP10Marks: {
            //     type: Number,
            //     // max: 10
            // },
        },

        AP6: {
            menteeFeedback: [
                {
                    type: Number, //  changes from string quantified and filled here
                },
            ],
            averageMarks: {
                type: Number,
                default: null,
            },
        },
        AP7: {
            guestLectureData: [
                {
                    date: {
                        type: String,
                    },
                    title: {
                        type: String,
                    },
                    speakerName: {
                        type: String,
                    },
                    arrangedFor: {
                        type: String,
                    },
                },
            ],

            totalMarks: {
                type: Number,
                default: null,
            },
        },

        // AP9: {
        //     activityData: [{
        //         semester: {
        //             type: String
        //         },
        //         subject: {
        //             type: String
        //         },
        //         activityDetails: {
        //             type: String
        //         }
        //     }],
        //     average: {
        //         type: Number
        //     }
        // },
        AP10: {
            paper: [
                {
                    course: {
                        type: String,
                    },
                    marks: {
                        type: Number,
                    },
                },
            ],
            averageMarks: {
                type: Number,
            },
        },

        totalMarks: {
            type: Number,
        },
    },

    Dimension2: {
        RP1: {
            papers: [
                {
                    title: {
                        type: String,
                    },
                    conferenceOrJournal: {
                        name: {
                            type: String,
                        },
                        type: {
                            type: String,
                            //drop down
                            //Journal , Conference 
                        },
                        reputation: {
                            type: String,
                            //drop down
                            //High,Medium,None 
                        },
                    },
                    author: {
                        type: String,
                    },
                    publisher: {
                        type: String,
                    },
                    paperLink: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
                // max: 30
            },
        },
        // },
        RP2: {
            patents: [
                {
                    name: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    status: {
                        type: String,
                        //drop down
                        //Obtained,Published
                    },
                },
            ],
            books: [
                {
                    title: {
                        type: String,
                    },
                    author: {
                        type: String,
                    },
                    publisher: {
                        type: String,
                    },
                    status: {
                        type: String,
                        //drop down
                        //Published ,Book Chapter/Monograms/Copyright
                    },
                },
            ],
            moocs: [
                {
                    name: {
                        type: String,
                    },
                    duration: {
                        type: Number,
                        //has to be given in hours 

                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
                max: 30,
            },
        },
        RP3: {
            sponsored: [
                {
                    date: {
                        type: String,
                    },
                    title: {
                        type: String,
                    },
                    agency: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    amount: {
                        type: Number,
                        default: 0,
                    },
                    status: {
                        type: String,
                        default: "Null",
                        //drop down
                        //Submitted,Submitted and Approved
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        RP4: {
            number: {
                type: Number,
                default:null
            },
            totalMarks: {
                type: Number,
                // max: 25
            },
        },

        RP5: {
            selfDevelopment: [
                {
                    type: {
                        type: String,
                        //drop down
                        //STTP , FDP , MOOC ,Industry Internship
                    },
                    title: {
                        type: String,
                    },
                    organization: {
                        type: String,
                    },
                    dates: {
                        type: String,
                    },
                    duration: {
                        type: Number,
                        //duration in weeks for MOOC , Industry Internship 
                        //duration in days for STTP , FDP
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        RP6: {
            softHardDev: [
                {
                    type: {
                        type: String,
                    },
                    model: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
                //max: 10
            },
        },

        RP7: {
            activityNotCovered: [
                {
                    date: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
                //max: 10
            },
        },

        totalMarks: {
            type: Number,
        },
    },
    Dimension3: {
        IP1: [
            {
                role: {
                    type: String,
                    // required: true,
                },
                tick: {
                    type: Boolean,
                    // required: true,
                },
                marks: {
                    type: Number,
                    default: 20,
                },
            },
        ],
        IP2: [
            {
                role: {
                    type: String,
                },
                tick: {
                    type: Boolean,
                },
                marks: {
                    type: Number,
                    default: 10,
                },
            },
        ],
        DP1: [
            {
                role: {
                    type: String,
                },
                tick: {
                    type: Boolean,
                },
                marks: {
                    type: Number,
                    default: 10,
                },
            },
        ],
        totalIP1IP2DP1Marks: {
            type: Number,
        },
        OP1: {
            organized: [
                {
                    name: {
                        type: String,
                    },
                    type: {
                        type: String,
                        //drop down 
                        //FDP , Training Organised

                    },
                    sponsorerName: {
                        type: String,
                    },
                    fund: {
                        type: Number,
                    },
                    days: {
                        type: Number,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },
        Invited: {
            invitedAt: [
                {
                    industryName: {
                        type: String,
                    },
                    dates: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    type: {
                        type: String,
                        // drop down 
                        //Guest Faculty,Visiting Professor
                    },
                    duration: {
                        type: Number,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        Partof: {
            committee: [
                {
                    name: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                    organization: {
                        type: String,
                    },
                    date: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        Article: {
            articleDetails: [{
                name: {
                    type: String,
                },
            }],
            totalMarks: {
                type: Number,
            },
        },

        coGuide: {
            data: [
                {
                    institutionName: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },

        collaboration: {
            institutionDetails: [
                {
                    name: {
                        type: String,
                    },
                    details: {
                        type: String,
                    },
                },
            ],
            totalMarks: {
                type: Number,
            },
        },
        totalMarks: {
            type: Number,
        },
    },

    Dimension4: {
        feedbackMarks: {
            A: {
                type: Number,
                default: 0,
            },
            B: {
                type: Number,
                default: 0,
            },
            C: {
                type: Number,
                default: 0,
            },
            D: {
                type: Number,
                default: 0,
            },
            E: {
                type: Number,
            },
        },

        confidentialReport: {
            HODRemarks: {
                type: String,
                default: null,
            },

            principalRemarks: {
                type: Number,
                default: 0,
            },
            perceptionMarks: {
                type: Number,
                default: 0,
            },
            // grandTotal: {
            //     type: Number
            // },
        },
    },

    finalGrandTotal: {
        dimension1: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.4,
            },
            finalMarks: {
                type: Number,
            },
        },
        dimension2: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.2,
            },
            finalMarks: {
                type: Number,
            },
        },
        dimension3: {
            totalMarks: {
                type: Number,
                default: 0,
            },
            multiplyingFactor: {
                type: Number,
                default: 0.2,
            },
            finalMarks: {
                type: Number,
            },
        },
        dimension4: {
            totalMarks: {
                type: Number,
                default: 0, 
            },
            multiplyingFactor: {
                type: Number,
                default: 0.2,
            },
            finalMarks: {
                type: Number,
            },
        },

        GrandTotal: {
            type: Number,
            default: 0,
        },
    },
});

const Appraisal = mongoose.model('Appraisal', appraisalSchema);

module.exports = Appraisal;