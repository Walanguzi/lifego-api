# Auth endpoints
### Register
**Endpoint**:  `POST: /api/register`

**Payload**:

    displayName: String!
    email: String!
    password: String!

**Response**:

    {
        "message": "Successfully registered",
        "user": {
            "id": "2cjjwpejvjk9p2yvy",
            "privacy": "everyone",
            "displayName": "Display Name",
            "email": "example@email.com",
            "updatedAt": "2018-07-31T12:44:49.054Z",
            "createdAt": "2018-07-31T12:44:49.054Z",
            "pictureUrl": null,
            "social": false,
            "reminders": true
        }
    }

### Login
**Endpoint**:  `POST: /api/auth/login`

**Payload**:

    email: String!
    password: String!

**Response**:

    {
        "token": "generated token",
        "message": "Successfully logged in"
    }

### Social login
**Endpoint**:  `POST: /api/auth/social_login`

**Payload**:

    displayName: String!
    email: String!
    password: String!
    social: (Boolean=true)!

**Response**:

    {
        "token": "generated token",
        "message": "Successfully logged in"
    }

### Reset Password
**Endpoint**:  `POST: /api/auth/reset_password`

**Payload**:

    email: String!

**Response**:

    {
        "message": `Password has been reset and sent to example@email.com`
    }

### Change email
**Endpoint**:  `POST: /api/auth/change_email`

**Payload**:

    email: String!
    mewEmail: String!
    password: String!

**Response**:

    {
        "token": "new generated token",
        "message": "Email changed"
    }

### Change password
**Endpoint**:  `POST: /api/auth/change_password`

**Payload**:

    oldPassword: String!
    mewPassword: String!
    confirm: String!

**Response**:

    {
        "token": "new generated token",
        "message": "Password changed"
    }

### Delete account
**Endpoint**:  `POST: /api/auth/delete_account`

**Payload**:

    oldPassword: String!
    mewPassword: String!
    confirm: String!

**Response**:

    {
      "message": "Success"
    }

### Sample error Response
    {
      "message": "Wrong email or password"
    }


# GraphQL endpoint
**Endpoint**:  `POST: /api/graphql`

**Header**:

    token: String!

**Payload**:

    query: GraphQLQuery!

### GraphQLQueries
#### Create bucketlist:
**query**

    mutation { createBucketlist(name: \"bucketlist name\", privacy:\"friends\") { name }}

**response**

    {
        "data": {
            "createBucketlist": {
                "name": "name"
            }
        }
    }

#### Get bucketlist:
**query**

    mutation { getBucketlist(id: \"wefgiobjoijeov\") { name }}

**response**

    {
        "data": {
            "getBucketlist": {
                "name": "bucketlist name"
            }
        }
    }

#### Update bucketlist:
**query**

    mutation { updateBucketlist(id: \"wefgiobjoijeov\",name: \"updated name\", privacy:\"everyone\") { name }}

**response**

    {
        "data": {
            "updateBucketlist": {
                "name": "updated name"
            }
        }
    }

#### List user's bucketlists:
**query**

    mutation { list(offset: 0, limit: 10, name:\"name\") { bucketlists: { name }, nextOffset, prevOffset }}

**response**

    {
        "data": {
            "list": {
                "bucketlists": {
                    "name": "bucketlist name"
                },
                "nextOffset": 10,
                "prevOffset": 0
            }
        }
    }

#### List all visible bucketlists:
**query**

    mutation { listAll(offset: 0, limit: 10, name:\"name\") { name }}

**response**

    {
        "data": {
            "listAll": {
              "bucketlists": {
                  "name": "bucketlist name"
              },
              "nextOffset": 10,
              "prevOffset": 0
            }
        }
    }

#### List all public bucketlists:
**query**

    mutation { explore(offset: 0, limit: 10, name:\"name\") { name }}

**response**

    {
        "data": {
            "explore": {
              "bucketlists": {
                  "name": "bucketlist name"
              },
              "nextOffset": 10,
              "prevOffset": 0
            }
        }
    }

#### Delete bucketlist:
**query**

    mutation { deleteBucketlist(id: \"wefgiobjoijeov\") { message }}

**response**

    {
        "data": {
            "deleteBucketlist": {
                "message": "Success"
            }
        }
    }

#### Create item:
**query**

    mutation { createItem(bucketlistId: \"wefgiobjoijeov\", name: \"item name\") { name }}

**response**

    {
        "data": {
            "createItem": {
                "name": "item name"
            }
        }
    }

#### Update item:
**query**

    mutation { updateItem(id: \"fjhitoyhjtoin\", bucketlistId: \"wefgiobjoijeov\", name: \"updated name\") { name }}

**response**

    {
        "data": {
            "updateItem": {
                "name": "updated name"
            }
        }
    }


#### Delete item:
**query**

    mutation { deleteItem(id: \"wefgiobjoijeov\", bucketlistId: \"wefgiobjoijeov\") { message }}

**response**

    {
        "data": {
            "deleteItem": {
                "message": "Success"
            }
        }
    }

#### Create comment:
**query**

    mutation { createComment(bucketlistId: \"wefgiobjoijeov\", content: \"comment content\") { content }}

**response**

    {
        "data": {
            "createComment": {
                "content": "comment content"
            }
        }
    }

#### Update comment:
**query**

    mutation { updateComment(id: \"fjhitoyhjtoin\", bucketlistId: \"wefgiobjoijeov\", content: \"updated content\") { content }}

**response**

    {
        "data": {
            "updateComment": {
                "content": "updated content"
            }
        }
    }


#### Delete comment:
**query**

    mutation { deleteItem(id: \"wefgiobjoijeov\", bucketlistId: \"wefgiobjoijeov\") { message }}

**response**

    {
        "data": {
            "deleteComment": {
                "message": "Success"
            }
        }
    }

#### Like bucketlist:
**query**

    mutation { like(bucketlistId: \"wefgiobjoijeov\",likerId: \"fjhitoyhjtoin\") { id }}

**response**

    {
        "data": {
            "like": {
                "id": "fejgoejgeoigej"
            }
        }
    }

#### Unlike bucketlist:
**query**

    mutation { unlike(bucketlistId: \"wefgiobjoijeov\",id: \"fejgoejgeoigej\") { id }}

**response**

    {
        "data": {
            "unlike": {
                "message": "Success"
            }
        }
    }

#### Start conversation:
**query**

    mutation { startConversation(receiverId: \"wefgiobjoijeov\") { receiverId }}

**response**

    {
        "data": {
            "startConversation": {
                "receiverId": "wefgiobjoijeov"
            }
        }
    }

#### Get conversations:
**query**

    mutation { getConversations { receiverId }}

**response**

    {
        "data": {
            "getConversations": [
              {
                  "receiverId": "wefgiobjoijeov"
              }
            ]
        }
    }

#### Delete conversation:
**query**

    mutation { deleteConversation(id: \"fejgoejgeoigej\") { message }}

**response**

    {
        "data": {
            "deleteConversation": [
              {
                  "message": "Success"
              }
            ]
        }
    }

#### Create message:
**query**

    mutation { createMessage(conversationId: \"wefgiobjoijeov\", content: \"message content\") { content }}

**response**

    {
        "data": {
            "createMessage": {
                "content": "message content"
            }
        }
    }

#### Update message:
**query**

    mutation { updateMessage(id: \"fjhitoyhjtoin\", conversationId: \"wefgiobjoijeov\", content: \"updated content\") { content }}

**response**

    {
        "data": {
            "updateMessage": {
                "content": "updated content"
            }
        }
    }

#### Delete message:
**query**

    mutation { deleteMessage(id: \"fjhitoyhjtoin\", conversationId: \"wefgiobjoijeov\") { message }}

**response**

    {
        "data": {
            "deleteMessage": {
                "message": "Success"
            }
        }
    }

#### Get notifications:
**query**

    mutation { getNotifications { text }}

**response**

    {
        "data": {
            "getNotifications": [
                {
                    "text": "new comment"
                }
            ]
        }
    }

#### Mark notification as read:
**query**

    mutation { markNotificationAsRead(id: \"fjhitoyhjtoin\") { read }}

**response**

    {
        "data": {
            "markNotificationAsRead": {
                "read": true
            }
        }
    }

#### Delete notification:
**query**

    mutation { deleteNotification(id: \"fjhitoyhjtoin\") { message }}

**response**

    {
        "data": {
            "deleteNotification": {
                "message": "Success"
            }
        }
    }

#### Get user notifications:
**query**

    mutation { getUserNotifications { text }}

**response**

    {
        "data": {
            "getUserNotifications": [
                {
                    "text": "new comment"
                }
            ]
        }
    }

#### Mark user notification as read:
**query**

    mutation { markUserNotificationAsRead(id: \"fjhitoyhjtoin\") { read }}

**response**

    {
        "data": {
            "markUserNotificationAsRead": {
                "read": true
            }
        }
    }

#### Delete user notification:
**query**

    mutation { deleteUserNotification(id: \"fjhitoyhjtoin\") { message }}

**response**

    {
        "data": {
            "deleteUserNotification": {
                "message": "Success"
            }
        }
    }

#### Get profile:
**query**

    mutation { getProfile { displayName }}

**response**

    {
        "data": {
            "getProfile": {
                "displayName": "Display Name"
            }
        }
    }

#### Get profile using id:
**query**

    mutation { getOtherProfile(id: \"fjhitoyhjtoin\") { displayName }}

**response**

    {
        "data": {
          "getOtherProfile": {
              "displayName": "Display Name"
          }
        }
    }

#### Add friend:
**query**

    mutation { addFriend(id: \"fjhitoyhjtoin\") { message }}

**response**

    {
        "data": {
            "addFriend": {
                "message": "Success"
            }
        }
    }

#### Remove friend:
**query**

    mutation { removeFriend(id: \"fjhitoyhjtoin\") { message }}

**response**

    {
        "data": {
            "removeFriend": {
                "message": "Success"
            }
        }
    }

#### Update profile:
**query**

    mutation { updateProfile(displayName: \"updated name\") { displayName }}

**response**

    {
        "data": {
            "updateProfile": {
                "displayName": "updated name"
            }
        }
    }

#### Search users:
**query**

    mutation { searchUsers(name: "\display\") { displayName }}

**response**

    {
        "data": {
            "searchUsers": [
                {
                    "displayName": "Display Name"
                }
            ]
        }
    }

#### Delete account:
**query**

    mutation { deleteAccount(email: \"example@email.com\", password: \"password\") { message }}

**response**

    {
        "data": {
            "deleteAccount": {
                "message": "Success"
            }
        }
    }

#### Sample error response
    {
        "data": null,
        "errors": [
            {
                "message": "Invalid token",
                "code": 401
            }
        ]
    }
