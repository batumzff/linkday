// MongoDB initialization script for LinkDay database

// Switch to linkday database
db = db.getSiblingDB('linkday');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'username', 'password'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'User full name is required'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
          description: 'Valid email is required'
        },
        username: {
          bsonType: 'string',
          minLength: 3,
          maxLength: 30,
          description: 'Username must be between 3-30 characters'
        },
        password: {
          bsonType: 'string',
          minLength: 6,
          description: 'Password must be at least 6 characters'
        },
        bio: {
          bsonType: 'string',
          maxLength: 160,
          description: 'Bio must be max 160 characters'
        },
        theme: {
          enum: ['light', 'dark', 'colorful'],
          description: 'Theme must be light, dark, or colorful'
        }
      }
    }
  }
});

db.createCollection('links', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'title', 'url'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'User ID is required'
        },
        title: {
          bsonType: 'string',
          maxLength: 100,
          description: 'Title must be max 100 characters'
        },
        url: {
          bsonType: 'string',
          description: 'URL is required'
        },
        description: {
          bsonType: 'string',
          maxLength: 300,
          description: 'Description must be max 300 characters'
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.links.createIndex({ userId: 1, order: 1 });
db.links.createIndex({ userId: 1, createdAt: 1 });

print('✅ LinkDay database initialized successfully with collections and indexes!');