# MongoDB

**=>** MongoDB is a popular NoSQL database program, known for its flexibility and scalability. It stores data in JSON-like documents with dynamic schemas, allowing for easy integration with applications. MongoDB is often used in web development, mobile apps, and big data environments. Here's a basic cheatsheet for MongoDB:

### Installation:

```bash
# For Ubuntu
sudo apt-get install -y mongodb

# For macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
```

### Starting MongoDB Server:

```bash
# Default port is 27017
mongod
```

### Connecting to MongoDB:

```bash
mongo
```

### Basic Database Operations:

```bash
# Show all databases
show dbs

# Create or switch to a database
use my_database

# Insert a document
db.collection_name.insertOne({ key: "value" })

# Query documents
db.collection_name.find()

# Update documents
db.collection_name.updateOne({ key: "value" }, { $set: { key: "new value" } })

# Delete documents
db.collection_name.deleteOne({ key: "value" })
```

### Indexes:

```bash
# Create an index
db.collection_name.createIndex({ key: 1 })

# List all indexes
db.collection_name.getIndexes()

# Drop an index
db.collection_name.dropIndex("index_name")
```

### Aggregation:

```bash
# Aggregation pipeline example
db.collection_name.aggregate([
  { $match: { key: "value" } },
  { $group: { _id: "$key", total: { $sum: 1 } } }
])
```

### Backup and Restore:

```bash
# Backup
mongodump --db my_database --out /path/to/backup/directory

# Restore
mongorestore --db my_database /path/to/backup/directory/my_database
```

### Security:

```bash
# Enable authentication
# Add the following lines to mongod.conf
security:
  authorization: enabled

# Create a user
use admin
db.createUser({ user: "admin", pwd: "password", roles: ["userAdminAnyDatabase"] })

# Authenticate
mongo --username admin --password password --authenticationDatabase admin
```

This cheatsheet covers the basic operations and commands for working with MongoDB. There are many more advanced features and configurations available, such as replication, sharding, and fine-grained access control.
