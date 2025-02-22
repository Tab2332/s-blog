import mongoose from 'mongoose'

interface GlobalMongoose {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: GlobalMongoose | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI')
}

const cached: GlobalMongoose = global.mongoose || {
  conn: null,
  promise: null,
}

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      cached.conn = mongoose
      return mongoose
    })
  }

  try {
    const mongoose = await cached.promise
    return mongoose
  } catch (e) {
    cached.promise = null
    throw e
  }
}

export default connectDB 