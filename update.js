import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'questionId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      questionId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET questionStatement = :questionStatement, questionImageName = :questionImageName, questionImage = :questionImage, mcAnswerOption1Thru5 = :mcAnswerOption1Thru5," +
                      "mcOption1 = :mcOption1, mcOption1Feedback = :mcOption1Feedback, mcOption1FeedbackImageName = :mcOption1FeedbackImageName, mcOption2 = :mcOption2, mcOption2Feedback =" +
                      ":mcOption2Feedback, mcOption2FeedbackImageName = :mcOption2FeedbackImageName, mcOption3 = :mcOption3, mcOption3Feedback = :mcOption3Feedback, mcOption3FeedbackImageName" +
                      " = :mcOption3FeedbackImageName, mcOption4 = :mcOption4, mcOption4Feedback = :mcOption4Feedback, mcOption4FeedbackImageName = :mcOption4FeedbackImageName, mcOption5 = " +
                      ":mcOption5, mcOption5Feedback = :mcOption5Feedback, mcOption5FeedbackImageName = :mcOption5FeedbackImageName, correctAnswer1Thru5 = :correctAnswer1Thru5, solution = " +
                      ":solution, solutionImage = :solutionImage, attachment = :attachment, questionStatus = :questionStatus, questionType = :questionType, assignedTo = :assignedTo, authoredBy " +
                      "= :authoredBy, firstReviewer = :firstReviewer, secReviewer = :secReviewer, questionUnit = :questionUnit, topic = :topic, openStaxTrad2e = :openStaxTrad2e, openStaxAF2e = " +
                      ":openStaxAF2e, thoughtType = :thoughtType, timeSuggested = :timeSuggested, multipart = :multipart, globalStatement = :globalStatement, multipartPreamble = " +
                      ":multipartPreamble, childQuestionType = :childQuestionType",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":questionStatement": data.questionStatement || null,
      ":questionImageName": data.questionImagename || null,
      ":questionImage": data.questionImage || null,
      ":mcAnswerOption1Thru5": data.mcAnswerOption1Thru5 || null,
      ":mcOption1": data.mcOption1 || null,
      ":mcOption1Feedback": data.mcOption1Feedback || null,
      ":mcOption1FeedbackImageName": data.mcOption1FeedbackImageName || null,
      ":mcOption2": data.mcOption2 || null,
      ":mcOption2Feedback": data.mcOption2Feedback || null,
      ":mcOption2FeedbackImageName": data.mcOption2FeedbackImageName | null,
      ":mcOption3": data.mcOption3 || null,
      ":mcOption3Feedback": data.mcOption3Feedback || null,
      ":mcOption3FeedbackImageName": data.mcOption3FeedbackImageName || null,
      ":mcOption4": data.mcOption4 || null,
      ":mcOption4Feedback": data.mcOption4Feedback || null,
      ":mcOption4FeedbackImageName": data.mcOption4FeedbackImageName || null,
      ":mcOption5": data.mcOption5 || null,
      ":mcOption5Feedback": data.mcOption5Feedback || null,
      ":mcOption5FeedbackImageName": data.mcOption5FeedbackImageName || null,
      ":correctAnswer1Thru5": data.correctAnswer1Thru5 || null,
      ":solution": data.solution || null,
      ":solutionImage": data.solutionImage || null,
      ":questionType":  data.questionType || null,
      ":questionStatus": data.questionStatus || null,
      ":assignedTo": data.assignedTo || null,
      ":authoredBy": data.authoredBy || null,
      ":firstReviewer": data.firstReviewer || null,
      ":secReviewer": data.secReviewer || null,
      ":questionUnit": data.questionUnit || null,
      ":topic": data.topic || null,
      ":openStaxTrad2e": data.openStaxTrad2e || null,
      ":openStaxAF2e": data.openStaxAF2e || null,
      ":thoughtType": data.thoughtType || null,
      ":timeSuggested": data.timeSuggested || null,
      ":multipart": data.multipart || null,
      ":globalStatement": data.globalStatement || null,
      ":multipartPreamble": data.multipartPreamble || null,
      ":childQuestionType": data.childQuestionType || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});