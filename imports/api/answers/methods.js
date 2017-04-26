import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';

import { Answers, answerSchema } from './schema.js';
import { Questions } from '../questions/schema.js';

Meteor.methods({
	addAnswer(data) {

		function populateQuestionsIdLinked(arrayOfAnswersId, arrayOfQuestionsId) {
			if (arrayOfAnswersId.length === 0) {
				return arrayOfQuestionsId;
			} else {
				let answersIdList = Answers.find({
					_id: {
						$in: arrayOfAnswersId
					}
				}, {
					fields: {
						_id: 1,
						questionsIdLinked: 1,
						answersIdLinked: 1
					}
				}).fetch();
				return answersIdList.map((cur) => {
					return populateQuestionsIdLinked(cur.answersIdLinked, cur.questionsIdLinked);
				});
			}
		}

		check(data, answerSchema);
		if (!data.questionsIdLinked) {
			data.questionsIdLinked = [];
		}
		if (!data.answersIdLinked) {
			data.answersIdLinked = [];
		} else {
			data.questionsIdLinked = lodash.uniq(lodash.flattenDeep(populateQuestionsIdLinked(data.answersIdLinked, [])));
		}
		return Answers.insert(data);
	},
	addQuestionToAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			questionId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$addToSet: {
				questionsIdLinked: data.questionId
			}
		});
	},
	addAnswerToAnswersLinked(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			lowerAnswerId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$addToSet: {
				answersIdLinked: data.lowerAnswerId
			}
		});
	},
	removeQuestionFromAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			questionId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$pull: {
				questionsIdLinked: data.questionId
			}
		});
	},
	removeQuestionFromAnswersLinked(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			lowerAnswerId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$pull: {
				answersIdLinked: data.lowerAnswerId
			}
		});
	},
	updateAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			level: { type: Number, min: 1 },
			lowAnswer: { type: String },
			midAnswer: { type: String, optional: true },
			highAnswer: { type: String },
			title: { type: String, optional: true }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$set: {
				level: data.level,
				lowAnswer: data.lowAnswer,
				midAnswer: data.midAnswer,
				highAnswer: data.highAnswer,
				title: data.title
			}
		});
	},
	addDefaultSetOfAnswers(data) {
		const methodSchema = new SimpleSchema({
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);

		const higherAnswerLevel2 = [{
			title: 'Aptitudes',
			lowQuestion: 2,
			topQuestion: 20,
			lowAnswer: 'Vous avez besoin de temps et de méthodes pour aller chercher de l’information sur la connaissance de vos caractéristiques comportementales : cela peut faire partie d’un axe de formation en développement personnel',
			midAnswer: 'Vous avez besoin de progresser en prise d’information et en réflexion sur la connaissance de vos caractéristiques comportementales',
			highAnswer: 'Vous avez a priori une bonne connaissance de votre comportement, il vous appartient de progresser en appréciation de vos points forts et de vos points de progression'
		}, {
			title: 'Compétences',
			lowQuestion: 21,
			topQuestion: 32,
			lowAnswer: 'Vous avez des compétences : il vous appartient d’en prendre conscience, dans avoir la juste appréciation et de penser à leur amélioration (programme de formation) en perspective de votre évolution professionnelle',
			midAnswer: 'Vous avez besoin de progresser en appréciation de vos compétences, vous devez pouvoir les mesurer (en termes quantitatifs et qualitatifs)',
			highAnswer: 'Vous avez a priori une bonne identification de vos compétences, il vous appartient de les maintenir à jour et de travailler sur ce que vous souhaitez approfondir et acquérir'
		}, {
			title: 'Motivations',
			lowQuestion: 37,
			topQuestion: 54,
			lowAnswer: 'Vous semblez avoir des difficultés à cerner vos motivations personnelles et professionnelles , il serait utile de prendre le temps de la réflexion et de faire un point carrière',
			midAnswer: 'Vous avez besoin de progresser en identification de vos motivations, cela peut concerner votre poste actuel et/ou votre évolution ce carrière',
			highAnswer: 'Vous avez a priori identifié ce qui vous pousse à agir à titre personnel et professionnel, pensez maintenant au moyen et long terme'
		}, {
			title: 'Joie et Talents',
			lowQuestion: 33,
			topQuestion: 36,
			lowAnswer: 'Vous avez forcement des talents que vous pouvez exercer avec satisfaction, constatez le et faites vous confiance',
			midAnswer: 'Suivez votre intuition et allez cherchez de l’information, échangez avec les autres pour progresser',
			highAnswer: 'Vous avez bien identifié ce pourquoi vous êtes doué et que vous faites avec plaisir, investissez cet axe de développement professionnel de façon réaliste et réalisable'
		}, {
			title: 'Territoire',
			lowQuestion: 55,
			topQuestion: 58,
			lowAnswer: 'Vous semblez avoir besoin de visibilité sur votre poste et son périmètre. Allez chercher de l’information pour clarifier votre positionnement dans l’organisation',
			midAnswer: 'Vous avez besoin de clarifier votre positionnement dans l’organisation, positionnement actuel ou futur, allez chercher de l’information pour faire évoluer les choses',
			highAnswer: 'Vous avez une vision claire de votre positionnement dans l’entreprise, pensez maintenant moyen et long terme'
		}, {
			title: 'Travailler ensemble',
			lowQuestion: 59,
			topQuestion: 61,
			lowAnswer: 'Vous semblez avoir besoin de plus d’informations et de précisions pour bien appréhender l’organisation dans laquelle vous évoluez. Osez poser des questions et demandez éventuellement du soutien (RH, N+1….)',
			midAnswer: 'Vous pouvez encore avoir besoin de clarifications pour mieux maitriser l’organisation dans laquelle vous évoluez, allez chercher de l’information (RH, N+1, Collègues, réseau …)',
			highAnswer: 'Vous avez a priori une vision claire de l’organisation dans laquelle vous évoluez, de votre responsabilité fonctionnelle et de votre mode de travail (hiérarchique, transverse, matriciel…), pensez aux évolutions à moyen et long terme'
		}, {
			title: 'Stratégie',
			lowQuestion: 62,
			topQuestion: 65,
			lowAnswer: 'Vous semblez avoir besoin de plus d’informations et de précisions pour bien appréhender la stratégie de l’entreprise dans laquelle vous évoluez. Osez poser des questions et demandez éventuellement du soutien (RH, N+1….)',
			midAnswer: 'Vous pouvez avoir besoin de clarifications concernant la stratégie de l’entreprise dans laquelle vous évoluez, repérez ou allez chercher de l’information (Communication interne, RH, N+1, Collègues, réseau …)',
			highAnswer: 'Vous avez a priori une vision claire de la stratégie d’entreprise, restez à l’écoute de ce qui l’influence à moyen et long terme'
		}, {
			title: 'Vicariance',
			lowQuestion: 66,
			topQuestion: 75,
			lowAnswer: 'Vous semblez avoir besoin de vous rassurer pour aller chercher de l’information. S’agit il d’une maitrise technique des outils de communication ou de timidité ?',
			midAnswer: 'Vous comprenez la nécessité d’aller chercher de l’information mais vous pouvez encore progresser en maitrise technique et en communication, osez…',
			highAnswer: 'Vous semblez avoir une bonne maitrise de ce qu’il faut faire pour aller chercher de l’information. Les outils et techniques évoluent en permanence, maintenez vous à niveau.'
		}, {
			title: 'Empathie',
			lowQuestion: 76,
			topQuestion: 78,
			lowAnswer: 'Vous semblez avoir besoin de plus d’informations et de précisions pour comprendre le rôle et la place de chacun. Vous gagneriez à aller chercher de l’information pour prendre un recul d’analyse et vous mettre « à la place de l’autre ».',
			midAnswer: 'Vous pouvez avoir besoin de travailler encore la compréhension des responsabilités professionnelles de votre entourage et de votre hiérarchie',
			highAnswer: 'Vous avez a priori une bonne construction de votre écoute des autres et une capacité à vous mettre à leur place pour faire votre propre opinion et élaborer vos choix d’orientation'
		}, {
			title: 'Sentiment d\'Efficacité Personnel et Estime de Soi',
			lowQuestion: 79,
			topQuestion: 82,
			lowAnswer: 'Il semble être nécessaire de renforcer votre confiance en vous. Prenez le temps d’identifier et de réaliser ce que vous êtes capable de bien faire. N’hésitez pas à demandez du soutien à votre N+1 ou RH',
			midAnswer: 'Il semble que vous pouvez vous accorder un peu plus de temps pour prendre du recul et apprécier à sa juste valeur ce que vous êtes capable de bien faire et qui doit vous aider dans votre évolution professionnelle',
			highAnswer: 'Vous savez à priori que vous êtes capable de faire du bon travail, c’est une indication pour votre évolution professionnelle, continuez de travailler en ce sens et pensez aussi à ce que vous pouvez améliorer.'
		}];

		const higherAnswerLevel3 = [{
			title: 'Ego centré',
			lowQuestion: 1,
			topQuestion: 4
		}, {
			title: 'Allo centré',
			lowQuestion: 5,
			topQuestion: 7
		}, {
			title: 'Intelligence Projective',
			lowQuestion: 8,
			topQuestion: 10
		}];

		const finalQuestion = [{
			title: 'Résultat final',
			level: 1,
			answerLevel: 4,
			createdAt: new Date(),
			questionsGroupId: data.questionsGroupId,
			lowAnswer: 'Vous avez besoin de temps et de méthodes pour aller chercher de l’information et alimenter votre réflexion professionnelle',
			midAnswer: 'Vous avez besoin de progresser en réflexion et prise d’information sur l’axe concerné (voir analyse détaillée en suivi)',
			highAnswer: 'Vous avez a priori les informations nécessaires pour avancer dans votre réflexion professionnelle'
		}];

		const questions = Questions.find({
			questionsGroupId: data.questionsGroupId
		}, {
			fields: {
				_id: 1,
				level: 1,
				displayType: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		if (questions.length !== 81) {
			throw new Meteor.Error(500, 'Erreur 500 : Le set de réponse par défaut ne convient pas aux questions de ce groupe de questions', 'Le set de réponse par défaut ne convient pas aux questions de ce groupe de questions');
		}

		// Add all answer for all user questions
		questions.map((cur) => {
			const answerData = {
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				level: cur.level,
				title: `Titre pour la question n°${cur.level}`,
				answerLevel: 1,
				type: cur.displayType,
				questionsIdLinked: [cur._id],
				lowAnswer: cur.lowAnswer || 'low answer',
				midAnswer: cur.midAnswer || 'mid answer',
				highAnswer: cur.highAnswer || 'high answer'
			}
			return Meteor.call('addAnswer', answerData);
		});

		// Fetch all those level 1 answer
		const answersLevel1 = Answers.find({
			answerLevel: 1,
			questionsGroupId: data.questionsGroupId
		}, {
			fields: {
				_id: 1,
				answerLevel: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		higherAnswerLevel2.map((cur, index) => {
			let answerList = answersLevel1.filter((cur1) => {
				return cur1.level >= cur.lowQuestion && cur1.level <= cur.topQuestion;
			});
			let answerIdList = answerList.map((cur) => {
				return cur._id
			});
			let answerData = {
				title: cur.title,
				level: index + 1,
				answerLevel: 2,
				answersIdLinked: answerIdList,
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				lowAnswer: cur.lowAnswer || 'low answer',
				midAnswer: cur.midAnswer || 'mid answer',
				highAnswer: cur.highAnswer || 'high answer'
			};
			return Meteor.call('addAnswer', answerData);
		});

		// Fetch all those level 2 answer
		const answersLevel2 = Answers.find({
			answerLevel: 2,
			questionsGroupId: data.questionsGroupId
		}, {
			fields: {
				_id: 1,
				answerLevel: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		higherAnswerLevel3.map((cur, index) => {
			let answerList = answersLevel2.filter((cur1) => {
				return cur1.level >= cur.lowQuestion && cur1.level <= cur.topQuestion;
			});
			let answerIdList = answerList.map((cur) => {
				return cur._id
			});
			let answerData = {
				title: cur.title,
				level: index + 1,
				answerLevel: 3,
				answersIdLinked: answerIdList,
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				lowAnswer: cur.lowAnswer || 'low answer',
				midAnswer: cur.midAnswer || 'mid answer',
				highAnswer: cur.highAnswer || 'high answer'
			};
			return Meteor.call('addAnswer', answerData);
		});

		// Fetch all those level 3 answer
		const answersLevel3 = Answers.find({
			answerLevel: 3,
			questionsGroupId: data.questionsGroupId
		}, {
			fields: {
				_id: 1,
				answerLevel: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		return finalQuestion.map((cur) => {
			let answerIdList = answersLevel3.map((cur) => {
				return cur._id
			});
			cur.answersIdLinked = answerIdList;
			return Meteor.call('addAnswer', cur);
		});
	}
});
