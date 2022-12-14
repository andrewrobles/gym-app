const ObjectId = require('mongodb').ObjectId
const safeAwait = require('safe-await')
const { splitEvery } = require('ramda')

exports.repository = (collection) => {
  const findOne = async (query) => safeAwait(collection.findOne(query))

  const findOneById = async (id) => safeAwait(collection.findOne({ _id: new ObjectId(id) }))

  const getMany = async (query = {}, projection = {}, limit, skip, sort) => {
    const mongoQuery = collection.find(query)

    if (projection) {
      mongoQuery.project(projection)
    }

    if (sort) {
      mongoQuery.sort(sort)
    }

    if (skip) {
      mongoQuery.skip(skip)
    }

    if (limit) {
      mongoQuery.limit(limit)
    }

    return mongoQuery.toArray()
  }

  const deleteOne = async (query) => safeAwait(collection.deleteOne(query))

  const deleteOneById = async (id) => safeAwait(collection.deleteOne({ _id: new ObjectId(id) }))

  const insertOne = async (object) => {
    return safeAwait(collection.insertOne(object))
  }

  const insertMany = async (objects) => {
    const _objects = objects.map(object => {
      return {
        ...object,
      }
    })

    return safeAwait(collection.insertMany(_objects))
  }

  const updateOne = async (query, object, options = { upsert: false }) => {
    return safeAwait(collection.updateOne(query, { $set: object }, options))
  }

  const updateOneById = async (id, object) => {
    return safeAwait(collection.updateOne({ _id: new ObjectId(id) }, {$set: object}))
  }

  const updateMany = async (query, object, options = { upsert: false }) => {
    return safeAwait(collection.updateMany(query, { $set: object }, options))
  }

  const deleteAll = async () => {
    return safeAwait(collection.deleteMany({}))
  }

  const deleteMany = async (query) => {
    return safeAwait(collection.deleteMany(query))
  }

  const countDocuments = async (query = {}) => {
    return collection.countDocuments(query)
  }

  const aggregate = async (query) => {
    return collection.aggregate(query).toArray()
  }

  const bulkUpdateManyById = async (objects) => {
    const batchSize = 1000
    const batches = splitEvery(batchSize, objects)

    for (const batch of batches) {
      const bulk = collection.initializeUnorderedBulkOp()

      for (const batchItem of batch) {
        const { _id, ...object } = batchItem

        bulk
          .find({ _id })
          .updateOne({
            $set: { ...object },
          })
      }

      await bulk.execute()
    }
  }

  return {
    collection,
    findOne,
    findOneById,
    getMany,
    deleteOne,
    deleteOneById,
    insertOne,
    insertMany,
    updateOne,
    updateOneById,
    updateMany,
    deleteAll,
    deleteMany,
    countDocuments,
    aggregate,
    bulkUpdateManyById,
  }
}

