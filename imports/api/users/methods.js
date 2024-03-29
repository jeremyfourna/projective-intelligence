/*eslint no-undef: "off"*/

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';
import { moment } from 'meteor/momentjs:moment'
import 'meteor/lfergon:exportcsv';

import { QuestionsGroups } from '../questionsGroups/schema.js';
import { Questions } from '../questions/schema.js';
import { UserQuestions } from '../userQuestions/schema.js';
import { Answers } from '../answers/schema.js';

Meteor.methods({
  addQuestionsGroupIntoUser(data) {
    let methodSchema = new SimpleSchema({
      userId: { type: String },
      questionsGroupId: { type: String },
      questionsGroupIndex: { type: Number, min: 0 }
    });
    check(data, methodSchema);
    const pos = `profile.questionsGroups.${data.questionsGroupIndex}.added`;
    const pos1 = `profile.questionsGroups.${data.questionsGroupIndex}.nbAnswered`;
    const pos2 = `profile.questionsGroups.${data.questionsGroupIndex}.nbQuestions`;
    const pos3 = `profile.score.${data.questionsGroupId}`;
    const pos4 = `profile.questionsGroups.${data.questionsGroupIndex}.date`;
    let nbQuestions = Questions.find({ questionsGroupId: data.questionsGroupId }, {
      fields: {
        _id: 1
      }
    }).count();
    return Meteor.users.update({ _id: data.userId }, {
      $set: {
        [pos]: true,
        [pos1]: 0,
        [pos2]: nbQuestions,
        [pos3]: 0,
        [pos4]: moment().format('LL')
      }
    });
  },
  addNewQuestionsGroupIntoProfile(data) {
    let methodSchema = new SimpleSchema({
      userId: { type: String },
      questionsGroupId: { type: String }
    });
    check(data, methodSchema);
    let questionsGroupIdExist = QuestionsGroups.findOne({ _id: data.questionsGroupId });
    if (questionsGroupIdExist) {
      return Meteor.users.update({ _id: data.userId }, {
        $push: {
          'profile.questionsGroups': { _id: data.questionsGroupId, added: false }
        }
      });
    } else {
      throw new Meteor.Error(500, 'Erreur 500 : L\'identifiant du questionnaire n\'existe pas', 'L\'identifiant du questionnaire n\'existe pas');
    }
  },
  updatePersonalInfos(data) {
    let methodSchema = new SimpleSchema({
      userId: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      gender: { type: String },
      year: { type: Number, min: 1900, max: 2016 },
      month: { type: Number, min: 1, max: 12 },
      day: { type: Number, min: 1, max: 31 },
      currentPosition: { type: String }
    });
    check(data, methodSchema);
    return Meteor.users.update({ _id: data.userId }, {
      $set: {
        'profile.firstName': data.firstName,
        'profile.lastName': data.lastName,
        'profile.gender': data.gender,
        'profile.year': data.year,
        'profile.month': data.month,
        'profile.day': data.day,
        'profile.currentPosition': data.currentPosition
      }
    });
  },
  updateUserScore(data) {
    let methodSchema = new SimpleSchema({
      userQuestionId: { type: String },
      choiceSelected: { type: String },
      qcmPoints: { type: Number, min: 1, max: 3, optional: true },
      userId: { type: String },
      questionsGroupId: { type: String },
      displayType: { type: String, allowedValues: ['scale', 'yesNo', 'qcm'] },
      questionsGroupIndex: { type: Number, min: 0 }
    });
    check(data, methodSchema);
    const pos = `profile.score.${data.questionsGroupId}`;
    const pos1 = `profile.questionsGroups.${data.questionsGroupIndex}.nbAnswered`;
    let num = Number(data.choiceSelected);
    if (data.displayType === 'scale') {
      if (num < 4) {
        return Meteor.users.update({ _id: data.userId }, {
          $inc: {
            [pos]: 1,
            [pos1]: 1
          }
        });
      } else if (num < 7) {
        return Meteor.users.update({ _id: data.userId }, {
          $inc: {
            [pos]: 2,
            [pos1]: 1
          }
        });
      } else {
        return Meteor.users.update({ _id: data.userId }, {
          $inc: {
            [pos]: 3,
            [pos1]: 1
          }
        });
      }
    } else {
      return Meteor.users.update({ _id: data.userId }, {
        $inc: {
          [pos]: data.qcmPoints,
          [pos1]: 1
        }
      });
    }
  },
  fixUserSchema() {
    let users = Meteor.users.find({}).fetch();
    const pos = `profile.score.rwWByqe4EkPAAPByK`;
    const pos1 = `profile.questionsGroups.0.nbAnswered`;
    const pos2 = `profile.questionsGroups.0.nbQuestions`;
    return users.map((cur) => {
      let nbAnswered = 0
      if (cur.score > 0) {
        nbAnswered = 81;
      } else {
        nbAnswered = cur.profile.nbAnswered || 0;
      }
      let score = cur.profile.score;
      Meteor.users.update({
        _id: cur._id
      }, {
        $unset: { 'profile.nbAnswered': '', 'profile.nbQuestions': '', 'profile.score': '' }
      });
      return Meteor.users.update({
        _id: cur._id
      }, {
        $set: {
          [pos]: score,
          [pos1]: nbAnswered,
          [pos2]: 81
        }
      });
    });
  },
  fixNbAnswered() {
    const pos = `profile.questionsGroups.0.nbAnswered`;
    let data = Meteor.users.find({}, {
      profile: 1
    }).fetch();
    return data.map((cur) => {
      let questions = UserQuestions.find({ userId: cur._id, answered: true }, {
        _id: 1
      }).count();
      return Meteor.users.update({ _id: cur._id }, {
        $set: {
          [pos]: questions
        }
      });
    });
  },
  fixScore() {
    const pos = `profile.score.rwWByqe4EkPAAPByK`;
    let data = Meteor.users.find({}, {
      profile: 1
    }).fetch();
    return data.map((cur) => {
      let score = 0;
      let questions = UserQuestions.find({ userId: cur._id, answered: true }, {
        _id: 1,
        points: 1
      }).fetch();
      if (questions !== []) {
        questions.map((cur1) => {
          return score += cur1.points;
        });
      }
      return Meteor.users.update({ _id: cur._id }, {
        $set: {
          [pos]: score
        }
      });
    });
  },
  exportCSV(questionsGroupId) {

    function questionnaireDone(questionsGroup) {
      if (questionsGroup.nbAnswered === questionsGroup.nbQuestions) {
        return 'OUI';
      } else {
        return 'NON';
      }
    }

    check(questionsGroupId, String);
    let answersCollection = Answers.find({
      questionsGroupId,
      answerLevel: {
        $lt: 4
      }
    }, {
      fields: {
        level: 1,
        title: 1,
        answerLevel: 1,
        questionsIdLinked: 1,
        questionsGroupId: 1
      },
      sort: {
        answerLevel: -1,
        level: 1
      }
    }).fetch();
    let usersCollection = Meteor.users.find({
      'profile.questionsGroups._id': questionsGroupId
    }, {
      fields: {
        _id: 1,
        'emails': 1,
        'profile.firstName': 1,
        'profile.lastName': 1,
        'profile.score': 1,
        'profile.questionsGroups': 1

      }
    }).fetch();
    let data = [];
    usersCollection.map((cur) => {
      let questionsList = UserQuestions.find({
        questionsGroupId,
        userId: cur._id,
        answered: true
      }, {
        fields: {
          questionsGroupId: 1,
          userId: 1,
          points: 1,
          questionId: 1
        }
      }).fetch();
      let ind = lodash.findIndex(cur.profile.questionsGroups, ['_id', questionsGroupId]);
      let user = {
        _id: cur._id,
        email: cur.emails[0].address,
        firstName: cur.profile.firstName || 'N/A',
        lastName: cur.profile.lastName || 'N/A',
        score: cur.profile.score[questionsGroupId] || 0,
        testDone: questionnaireDone(cur.profile.questionsGroups[ind])
      };
      answersCollection.map((cur1) => {
        let userQuestionsForAnswer = questionsList.filter((cur2) => {
          return cur1.questionsIdLinked.includes(cur2.questionId);
        });
        let prop = `${cur1.title} (max: ${cur1.questionsIdLinked.length * 3})`;
        if (userQuestionsForAnswer.length) {
          let score = 0;
          userQuestionsForAnswer.map((cur2) => {
            return score += cur2.points;
          });
          return user[prop] = score;
        } else {
          return user[prop] = 0;
        }
      });
      return data.push(user);
    });
    const heading = true;
    const delimiter = ';';
    return exportcsv.exportToCSV(data, heading, delimiter);
  }
});
