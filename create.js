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
    // - 'assignedTo': data.assignedTo
    // - 'authoredBy': data.authoredBy
    // - 'firstReviewer': data.firstReviewer
    // - 'secReviewer' : data.secReviewer
    // - 'unit' : data.unit
    // - 'topic' : data.topic
    // - 'openStaxTrad2e' : data.openStaxTrad2e
    // - 'openStaxAF2e' : data.openStaxAF2e
    // - 'thoughtType' : data.thoughtType
    // - 'timeSuggested' : data.timeSuggested
    // - 'multipart' : data.multipart
    // - 'globalStatment' : data.globalStatement
    // - 'multipartPreamble' : data.multipartPreamble
    // - 'childQuestionType' : data.childQuestionType
    // - 'questionImageName' : data.questionImageName
    // - 'questionImage' : data.questionImage
    // - 'mcAnswerOption1Thru5' : data.mcAnswerOption1Thru5
    // - 'mcOption1' : data.mcOption1
    // - 'mcOption1Feedback' : data.mcOption1Feedback
    // - 'mcOption1FeedbackImageName' : data.mcOption1FeedbackImageName
    // - 'mcOption2' : data.mcOption2
    // - 'mcOption2Feedback' : data.mcOption2Feedback
    // - 'mcOption2FeedbackImageName' data.mcOption2FeedbackImageName
    // - 'mcOption3' : data.mcOption3
    // - 'mcOption3Feedback' : data.mcOption3Feedback
    // - 'mcOption3FeedbackImageName' : data.mcOption3FeedbackImageName
    // - 'mcOption4' : data.mcOption4
    // - 'mcOption4Feedback' : data.mcOption4Feedback
    // - 'mcOption4FeedbackImageName' : data.mcOption4FeedbackImageName
    // - 'mcOption5' : data.mcOption5
    // - 'mcOption5Feedback' : data.mcOption5Feedback
    // - 'mcOption5FeedbackImageName' : data.mcOption5FeedbackImageName
    // - 'correctAnswer1Thru5' data.correctAnswer1Thru5
    // - 'solution' : data.solution
    // - 'solutionImage' : data.solutionImage
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      questionId: uuid.v1(),
      assignedTo: data.assignedTo,
      authoredBy: data.authoredBy,
      firstReviewer: data.firstReviewer,
      secReviewer: data.secReviewer,
      questionUnit: data.questionUnit,
      topic: data.topic,
      openStaxTrad2e: data.openStaxTrad2e,
      openStaxAF2e: data.openStaxAF2e,
      thoughtType: data.thoughtType,
      timeSuggested: data.timeSuggested,
      multipart: data.multipart,
      globalStatement: data.globalStatement,
      multipartPreamble: data.multipartPreamble,
      childQuestionType: data.childQuestionType,
      questionStatement: data.questionStatement,
      questionImageName: data.questionImageName,
      questionImage: data.questionImageName,
      mcAnswerOption1Thru5: data.mcAnswerOption1Thru5,
      mcOption1: data.mcOption1,
      mcOption1Feedback: data.mcOption1Feedback,
      mcOption1FeedbackImageName: data.mcOption1Feedback,
      mcOption2: data.mcOption2,
      mcOption2Feedback: data.mcOption2Feedback,
      mcOption2FeedbackImageName: data.mcOption2FeedbackImageName,
      mcOption3: data.mcOption3,
      mcOption3Feedback: data.mcOption3Feedback,
      mcOption3FeedbackImageName: data.mcOption3FeedbackImageName,
      mcOption4: data.mcOption4,
      mcOption4Feedback: data.mcOption4Feedback,
      mcOption4FeedbackImageName: data.mcOption4FeedbackImageName,
      mcOption5: data.mcOption5,
      mcOption5Feedback: data.mcOption5Feedback,
      mcOption5FeedbackImageName: data.mcOption5FeedbackImageName,
      correctAnswer1Thru5: data.correctAnswer1Thru5,
      solution: data.solution,
      solutionImage: data.solutionImage,
      questionStatus: data.questionStatus,
      questionType: data.questionType,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});