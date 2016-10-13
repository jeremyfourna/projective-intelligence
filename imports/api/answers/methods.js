import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Answers, answerSchema } from './schema.js';
import { Questions } from '../questions/schema.js';

Meteor.methods({
	addAnswer(data) {
		check(data, answerSchema);
		if (!data.questionsIdLinked) {
			data.questionsIdLinked = [];
		}
		if (!data.answersIdLinked) {
			data.answersIdLinked = [];
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
		const nbQuestionsForQuestionsGroupId = Questions.find({
			questionsGroupId: data.questionsGroupId
		}, {
			fields: {
				_id: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		if (nbQuestionsForQuestionsGroupId.length !== 82) {
			throw new Meteor.Error(500, 'Erreur 500 : Le set de réponse par défaut ne convient pas aux questions de ce groupe de questions', 'Le set de réponse par défaut ne convient pas aux questions de ce groupe de questions');
		}

		function arrayForAnswer(array, level) {
			let questionsId = [];
			if (level === 1) {
				array.map((cur) => {
					if (cur.level >= 22 && cur.level <= 32) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 2) {
				array.map((cur) => {
					if (cur.level >= 34 && cur.level <= 37) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 3) {
				array.map((cur) => {
					if (cur.level >= 39 && cur.level <= 46) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 4) {
				array.map((cur) => {
					if (cur.level >= 47 && cur.level <= 53) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 5) {
				array.map((cur) => {
					if (cur.level === 60) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 6) {
				array.map((cur) => {
					if (cur.level === 61) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 7) {
				array.map((cur) => {
					if (cur.level === 62) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 8) {
				array.map((cur) => {
					if (cur.level === 63) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 9) {
				array.map((cur) => {
					if (cur.level === 64) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 10) {
				array.map((cur) => {
					if (cur.level === 65) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 11) {
				array.map((cur) => {
					if (cur.level === 66) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 12) {
				array.map((cur) => {
					if (cur.level === 67) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 13) {
				array.map((cur) => {
					if (cur.level === 68) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 14) {
				array.map((cur) => {
					if (cur.level === 69) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 15) {
				array.map((cur) => {
					if (cur.level === 70) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 16) {
				array.map((cur) => {
					if (cur.level === 71) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 17) {
				array.map((cur) => {
					if (cur.level === 72) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 18) {
				array.map((cur) => {
					if (cur.level === 73) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 19) {
				array.map((cur) => {
					if (cur.level === 74) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 20) {
				array.map((cur) => {
					if (cur.level === 75) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 21) {
				array.map((cur) => {
					if (cur.level === 76) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 22) {
				array.map((cur) => {
					if (cur.level === 77) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 23) {
				array.map((cur) => {
					if (cur.level === 78) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 24) {
				array.map((cur) => {
					if (cur.level === 79) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 25) {
				array.map((cur) => {
					if (cur.level === 80) {
						return questionsId.push(cur._id);
					}
				});
			} else if (level === 26) {
				array.map((cur) => {
					if (cur.level === 81) {
						return questionsId.push(cur._id);
					}
				});
			}
			return questionsId;
		}

		const answers = [{
			level: 1,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 1),
			lowAnswer: 'Vous avez certainement des compétences mais vous semblez avoir des difficultés à les identifier. Souvenez-vous la différence entre une connaissance (savoir ce qu\'est un clou et un marteau) du savoir - faire(j\'ai déjà planté un clou et je peux le refaire) et une compétence(\"savoir faire éprouvé\": je plante régulièrement des clous - combien et dans quel type de surface = mesure quantitative et qualitative)',
			midAnswer: 'Vous devez progresser dans l\'expression de vos compétences: vous devez y mettre de la mesure quantitative et qualitative- lire les programmes de formation, les fiches de postes, échanger avec professionnels est un exercice qui peut vous apprendre beaucoup',
			highAnswer: 'Il semble que vous avez une bonne appropriation des compétences que vous maitrisez et des possibilités de les approfondir ou d\'en acquérir de nouvelles - bravo'
		}, {
			level: 2,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 2),
			lowAnswer: 'Vous avez certainement des talents qu\'il vous reste à découvrir : rapprochez-vous de ce qui vous fait le plus plaisir!',
			midAnswer: 'Vous avez certainement des talents qu\'il vous reste à découvrir : rapprochez-vous de ce qui vous fait le plus plaisir!',
			highAnswer: 'Bravo il semblerait que vous ayez identifié un ou des talents que vous exercez avec plaisir et enthousiasme, à vous d\'identifier les postes, les organisations et les stratégies d\'entreprise qui vous permettent de vous réaliser'
		}, {
			level: 3,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 3),
			lowAnswer: 'Vous avez certainement des talents qu\'il vous reste à découvrir : rapprochez-vous de ce qui vous fait le plus plaisir!',
			midAnswer: 'Vous avez certainement des talents qu\'il vous reste à découvrir : rapprochez-vous de ce qui vous fait le plus plaisir!',
			highAnswer: 'Bravo il semblerait que vous ayez identifié un ou des talents que vous exercez avec plaisir et enthousiasme, à vous d\'identifier les postes, les organisations et les stratégies d\'entreprise qui vous permettent de vous réaliser'
		}, {
			level: 4,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 4),
			lowAnswer: 'Vous devez prendre le temps de mener une réflexion sur ce qui est important pour entretenir votre équilibre de vie - les 7 composantes communément admises sont: familiale, sociale, financière, spirituellle (pas forcément au sens religieux), professionnelle, la santé et le lieu de vie.',
			midAnswer: 'Vous devez prendre le temps de mener une réflexion sur ce qui est important pour entretenir votre équilibre de vie - les 7 composantes communément admises sont: familiale, sociale, financière, spirituellle (pas forcément au sens religieux), professionnelle, la santé et le lieu de vie.',
			highAnswer: 'Bravo vous avez une appropriation de toutes les composantes de ce qui fait un équilibre de vie - à vous de le cultiver et de le maintenir'
		}, {
			level: 5,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 5),
			lowAnswer: 'Renseignez-vous sur les différents secteurs d\'activités et trouver ceux qui vous motivent!',
			midAnswer: 'Renseignez-vous sur les différents secteurs d\'activités et trouver ceux qui vous motivent!',
			highAnswer: 'Vous semblez avoir des idées sur les secteurs d\'activités qui vous motivent; continuez à investiguer'
		}, {
			level: 6,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 6),
			lowAnswer: 'Un projet professionnel fait partie d\'une organisation globale, pole "opérationnel" ou "support" renseignez- vous et choisissez!',
			midAnswer: 'Un projet professionnel fait partie d\'une organisation globale, pole "opérationnel" ou "support" renseignez- vous et choisissez!',
			highAnswer: 'Vous semblez avoir une idée du pôle fonctionnel que vous visez la fonction que vous souhaitez occuper dans l\'entreprise'
		}, {
			level: 7,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 7),
			lowAnswer: 'Le mode de fonctionnement d\'un poste peut être différent suivant les entreprises, renseignez-vous!',
			midAnswer: 'Le mode de fonctionnement d\'un poste peut être différent suivant les entreprises, renseignez-vous!',
			highAnswer: 'Bravo vous avez une bonne culture du mode de fonctionnement des entreprises, n\'hésitez pas à poser des questions en entretien'
		}, {
			level: 8,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 8),
			lowAnswer: 'En fonction de votre projet professionnel vous pouvez souhaiter rejoindre des entreprises dans des situations de développement différents, renseignez-vous avant et pendant les entretiens',
			midAnswer: 'En fonction de votre projet professionnel vous pouvez souhaiter rejoindre des entreprises dans des situations de développement différents, renseignez-vous avant et pendant les entretiens',
			highAnswer: 'Vous avez une bonne idée des phases de développement des entreprises n\'hésitez pas à poser des questions en entretien'
		}, {
			level: 9,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 9),
			lowAnswer: 'Les tailles des entreprises impliquent des modes d\'organisation différents, faites  votre opinion!',
			midAnswer: 'Les tailles des entreprises impliquent des modes d\'organisation différents, faites  votre opinion!',
			highAnswer: 'Vous savez déjà dans quel type d\'entreprise vous souhaitez évoluer, avancez vers votre cible'
		}, {
			level: 10,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 10),
			lowAnswer: 'Les cultures d\'entreprises sont différentes et correspondent plus ou moins à votre profil, renseignez-vous (privé, public, associatif, anglosaxonne…)',
			midAnswer: 'Les cultures d\'entreprises sont différentes et correspondent plus ou moins à votre profil, renseignez-vous (privé, public, associatif, anglosaxonne…)',
			highAnswer: 'Vous êtes motivé(e) par une culture d\'entreprise ciblez votre recherche et contactez les'
		}, {
			level: 11,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 11),
			lowAnswer: 'Il existe différents statuts de collaboration renseignez-vous sur ce qui peut vous convenir (cdi, cdd, freelance, vacataire…)',
			midAnswer: 'Il existe différents statuts de collaboration renseignez-vous sur ce qui peut vous convenir (cdi, cdd, freelance, vacataire…)',
			highAnswer: 'Vous avez compris qu\'un statut de collaboration définit un mode de travail qui doit correspondre à votre profil'
		}, {
			level: 12,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 12),
			lowAnswer: 'Prenez conscience de l\'importance de vous former régulièrement : les connaissances permettent le développement des compétences',
			midAnswer: 'N\'attendez pas pour vous former les connaissances vous permettent d\'acquérir des compétences',
			highAnswer: 'Vous semblez maintenir à jour les connaissances qui vous permettent d\'acquérir des compétences continuez à vous former'
		}, {
			level: 13,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 13),
			lowAnswer: 'Il faut vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez',
			midAnswer: 'Il faut vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez',
			highAnswer: 'Continuez de vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez'
		}, {
			level: 14,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 14),
			lowAnswer: 'Vous devez vous renseigner sur les différents canaux d\'informations relatifs à vos centres d\'intérêts (internet, réseau personnel, presse…)',
			midAnswer: 'Vous devez vous renseigner sur les différents canaux d\'informations relatifs à vos centres d\'intérêts (internet, réseau personnel, presse…)',
			highAnswer: 'Posez-vous la question de  la qualité de l\'information que vous allez chercher et comment accroitre votre efficacité'
		}, {
			level: 15,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 15),
			lowAnswer: 'Il vous faut instaurer de la régularité de votre flux d\'informations (newsletter, abonnements, groupes d\'échanges…)',
			midAnswer: 'Il vous faut instaurer de la régularité de votre flux d\'informations (newsletter, abonnements, groupes d\'échanges…)',
			highAnswer: 'Vous pouvez éventuellement la qualité et la pertinence des informations que vous  allez chercher'
		}, {
			level: 16,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 16),
			lowAnswer: 'Tenez-vous au courant de l\'évolution des compétences nécessaires au poste que vous visez (programme de formation, annonce de recrutement, cv similaires au votre…)',
			midAnswer: 'Tenez-vous au courant de l\'évolution des compétences nécessaires au poste que vous visez (programme de formation, annonce de recrutement, cv similaires au votre…)',
			highAnswer: 'Vous identifiez les évolutions des compétences que vous avez, renseignez-vous pour les maintenir à jour (programmes de formation)'
		}, {
			level: 17,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 17),
			lowAnswer: 'Les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, soyez en veille!',
			midAnswer: 'Les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, soyez en veille!',
			highAnswer: 'Vous avez compris que les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, continuez votre veille!'
		}, {
			level: 18,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 18),
			lowAnswer: 'Les réseaux sociaux sont utilisés par plus d\'un milliard de personnes dans le monde',
			midAnswer: 'Les réseaux sociaux sont utilisés par plus d\'un milliard de personnes dans le monde',
			highAnswer: 'Vous utilisez les réseaux sociaux, faites bien le distinguo entre réseaux sociaux professionnels et personnels'
		}, {
			level: 19,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 19),
			lowAnswer: 'Votre réseau personnel est aussi une source d\'information et d\'opportunité qu\'il ne faut pas hésiter à utiliser, vous renverrez l\'ascenseur!',
			midAnswer: 'Votre réseau personnel est aussi une source d\'information et d\'opportunité qu\'il ne faut pas hésiter à utiliser, vous renverrez l\'ascenseur!',
			highAnswer: 'Rappelez-vous qu\'utiliser votre réseau est un échange, renvoyez aussi de l\'information'
		}, {
			level: 20,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 20),
			lowAnswer: 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !',
			midAnswer: 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !',
			highAnswer: 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !'
		}, {
			level: 21,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 21),
			lowAnswer: 'Les opportunités sont faites de rencontres, il faut savoir provoquer le destin',
			midAnswer: 'Les opportunités sont faites de rencontres, il faut savoir provoquer le destin',
			highAnswer: 'Rappelez-vous que chaque personnes que vous rencontrez doit vous donner deux noms sur lesquels rebondir'
		}, {
			level: 22,
			type: 'scale',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 22),
			lowAnswer: 'Vous auriez avantage à valider un projet professionnel en phase a minima avec vos valeurs  personnelles',
			midAnswer: 'Continuez votre réflexion et vos recherches vers un projet professionnel en phase avec vos valeurs personnelles',
			highAnswer: 'Vous avez compris l\'importance d\'un projet professionnel en phase avec vos valeurs'
		}, {
			level: 23,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 23),
			lowAnswer: 'Un recrutement est un engagement bilatéral : identifiez les attentes de votre interlocuteur',
			midAnswer: 'Un recrutement est un engagement bilatéral : identifiez les attentes de votre interlocuteur',
			highAnswer: 'Une entreprise recherche tout autant  des compétences que des motivations, sachez parler des deux'
		}, {
			level: 24,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 24),
			lowAnswer: 'Nous vous encourageons à  rencontrer  des professionnels  pour cerner les aspects humains et techniques de votre motivation',
			midAnswer: 'Nous vous encourageons à  rencontrer  des professionnels  pour cerner les aspects humains et techniques de votre motivation',
			highAnswer: 'Continuer à montrer votre motivation avec détermination'
		}, {
			level: 25,
			type: 'qcm',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 25),
			lowAnswer: 'Ne vous découragez pas et continuez  à construire un projet professionnel réaliste et réalisable',
			midAnswer: 'Ne vous découragez pas et continuez  à construire un projet professionnel réaliste et réalisable',
			highAnswer: 'Prenez en compte votre zone de performance et réfléchissez sur vos points de progression'
		}, {
			level: 26,
			type: 'scale',
			answerLevel: 1,
			questionsIdLinked: arrayForAnswer(nbQuestionsForQuestionsGroupId, 26),
			lowAnswer: 'Vous devez reprendre confiance en vous, entourez-vous de personnes positives et aidantes',
			midAnswer: 'Vous pouvez améliorer votre confiance en vous, cultivez la pensée positive',
			highAnswer: 'Continuer de cultiver la pensée positive et l\'humilité'
		}];
		return answers.map((cur) => {
			cur.questionsGroupId = data.questionsGroupId;
			cur.createdAt = new Date();
			return Meteor.call('addAnswer', cur);
		});
	}
});
