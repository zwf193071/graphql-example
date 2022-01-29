const graphql = require('graphql')
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql
const _ = require('lodash')
const Person = require('../models/person')
const Job = require('../models/job')

// 创建Person结构体
const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        sex: {type: GraphQLString},
        age: {type: GraphQLInt},
        job: {
            type: JobType,
            resolve(parent, args) {
                return Job.findById(parent.jobId)
            }
        }
    })
})

const JobType = new GraphQLObjectType({
    name: 'Job',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        department: {type: GraphQLString},
        persons: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return Person.find({
                    jobId: parent.id
                })
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Person.findById(args.id)
            }

        },
        job: {
            type: JobType,
            args: {
                id: {type: GraphQLID}
            },

            resolve(parent, args) {
                return Job.findById(args.id)
            }

        },
        persons: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return Person.find({})
            }

        },

        jobs: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return Job.find({})
            }
        }

    }

})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPerson: {
            type: PersonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                sex: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                jobId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let person = new Person({
                    name: args.name,
                    sex: args.sex,
                    age: args.age,
                    jobId: args.jobId
                })
                return person.save()
            }
        },
        addJob: {
            type: JobType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                department: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let job = new Job({
                    name: args.name,
                    department: args.department
                })
                return job.save()
            }
        },
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
