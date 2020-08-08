import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'questionId': a unique uuid
    // - 'questionStatement': Question Statement parsed from request body
    // - 'questionType': Type of question (Multiple-Choice)
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      assignedTo: data.assignedTo,
      authoredBy: data.authoredBy,
      firstReveiwer: data.firstReveiwer,
      secReviewer: data.secReviewer,
      questionId: uuid.v1(),
      questionStatement: data.questionStatement,
      questionStatus: data.questionStatus,
      questionType: data.questionType,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});