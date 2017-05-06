import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';
import 'meteor/dexterneo:pdfmake';

import { Answers } from '../../../api/answers/schema.js';
import { UserQuestions } from '../../../api/userQuestions/schema.js';
import { logoPDF, ferreinLogo } from './pictures.js';

import './seeUserResult.jade';
import '../loader.jade';

Template.seeUserResult.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allAnswersForQuestionsGroupResult', this.data.questionsGroupId);
		this.subscribe('allUserQuestionsForUser', this.data.userId, this.data.questionsGroupId);
		this.subscribe('aUser', this.data.userId);
	});
});

Template.seeUserResult.onRendered(function() {
	$(document).ready(function() {
		$('ul.tabs').tabs();
		$('.collapsible').collapsible({ accordion: true });
	});
});

Template.seeUserResult.helpers({
	// Number -> Boolean
	isActive(index) {
		if (index === 0) {
			return 'active';
		} else {
			return false;
		}
	},
	// _ -> Array
	answerLevel4() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId,
			answerLevel: 4
		});
	},
	// _ -> Array
	answerLevel3() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId,
			answerLevel: 3
		});
	},
	// _ -> Object
	answerData() {
		return Answers.findOne({ _id: this.toString() });
	},
	// _ -> Number
	resultForFinalScore() {
		let parentScope = Template.instance().data;
		let pos = `profile.score.${parentScope.questionsGroupId}`;
		let score = Meteor.users.findOne({
			_id: parentScope.userId
		}, {
			fields: {
				_id: 1,
				[pos]: 1
			}
		});
		let long = UserQuestions.find({
			userId: parentScope.userId,
			questionsGroupId: parentScope.questionsGroupId
		}).count();
		let result = {
			long,
			score: score.profile.score[parentScope.questionsGroupId],
		};
		return result;
	},
	resultForAnswer() {
		let result = {
			score: 0,
			long: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Template.instance().data.userId
		}, {
			fields: {
				choiceSelected: 1,
				userId: 1,
				answered: true,
				questionId: 1,
				questionsGroupId: 1,
				points: 1
			}
		}).fetch();
		userQuestionsForResult.map((cur) => {
			return result.score += cur.points;
		});
		return result;
	},
	lowAnswer() {
		let minBorn = this.long;
		let highBorn = this.long * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.long === 1) {
			if (this.score === 1) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.score < minBorn + gap) {
				return true;
			} else {
				return false;
			}
		}
	},
	midAnswer() {
		let minBorn = this.long;
		let highBorn = this.long * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.long === 1) {
			if (this.score === 2) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.score < minBorn + gap * 2 && this.score >= minBorn + gap) {
				return true;
			} else {
				return false;
			}
		}
	},
	highAnswer() {
		let minBorn = this.long;
		let highBorn = this.long * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.long === 1) {
			if (this.score === 3) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.score >= minBorn + gap * 2) {
				return true;
			} else {
				return false;
			}
		}
	},
	answerHighAnswer() {
		return Template.parentData().highAnswer;
	},
	answerMidAnswer() {
		return Template.parentData().midAnswer;
	},
	answerLowAnswer() {
		return Template.parentData().lowAnswer;
	}
});

Template.seeUserResult.events({
	'click #downloadPDF': function(event) {
		event.preventDefault();
		const logoTop = {
			image: logoPDF,
			fit: [150, 150],
			absolutePosition: { x: 0, y: 0 },
		};
		const logoBot = {
			image: ferreinLogo,
			fit: [100, 100],
			absolutePosition: { x: 450, y: 730 },
			pageBreak: 'after'
		};
		const page1 = [
			logoTop, {
				text: [
					"Rapport d'autodiagnostic \n",
					"Projective Indicator©"
				],
				alignment: 'center',
				fontSize: 30,
				margin: [0, 350, 0, 0],
			},
			logoBot
		];
		const page2 = [
			logoTop, {
				text: [
					{ text: "Le Projective Indicator© \n\n", alignment: 'center', },
					"Le Projective Indicator© est issue d'un programme de Recherche et Développement qui s'appuie sur les dernières avancées scientifiques en matière de prise de décision en environnement professionnel \n\n",
					"Trouver du sens à ses responsabilités professionnelles participe d'un équilibre de vie \n\n",
				],
				fontSize: 20,
				margin: [0, 100, 0, 0],
			}, {
				text: "Pour trouver du sens il est nécessaire d'avoir les bonnes informations :",
				fontSize: 20,
				margin: [0, 0, 0, 0]
			}, {
				ul: [
					'En connaissance de soi',
					'En connaissance de son environnement'
				],
				fontSize: 20,
				margin: [0, 0, 0, 0]
			}, {
				text: "\n\nC'est à cette condition que votre Intellicence Projective peut se mettre en oeuvre",
				fontSize: 20,
				margin: [0, 0, 0, 0]
			},
			logoBot
		];
		const page3 = [
			logoTop, {
				text: [
					{ text: "Votre rapport d'autodiagnostic Projective Indicator© \n\n", alignment: 'center' },
					"Le Projective Indicator© a pour but de vous accompagner en connaissance de vous-même ainsi que de votre environnement de travail. Il vous permet de prendre conscience des éléments clés de votre évolution professionnelle et personnelle afin de développer votre agentivité (volonté d’être acteur de son propre développement)\n",
					{ text: "Ce rapport est individuel et confidentiel et vous est uniquement destiné.", italics: true }
				],
				fontSize: 20,
				margin: [0, 100, 0, 0],
			}, {
				text: "\n\nComment lire ce rapport :",
				fontSize: 20,
				margin: [0, 0, 0, 0]
			},
			{ text: '\nGlobal\n\n', alignment: 'center', fontSize: 20 }, {
				columns: [{
					text: [{ text: 'Données personnelles\n\n', fontSize: 20 }, { text: 'Aptitudes\n', fontSize: 20, }, { text: 'Compétences\n', fontSize: 20, }, { text: 'Motivations\n', fontSize: 20, }, { text: 'Joie et talent', fontSize: 20 }]
				}, {
					text: [{ text: 'Données collectives\n\n', fontSize: 20 }, { text: 'Territoires\n', fontSize: 20, }, { text: 'Travailler ensemble\n', fontSize: 20 }, { text: 'Stratégie', fontSize: 20, }]
				}, {
					text: [{ text: 'Facilitateurs\n\n\n', fontSize: 20 }, { text: 'Empathie\n', fontSize: 20, }, { text: 'Vicariance\n', fontSize: 20, }, { text: 'SEP', fontSize: 20, }]
				}]
			}, { text: '\n\n + Glossaire en fin de document', alignment: 'center' },
			logoBot
		];
		const page4 = [
			logoTop, {
				text: [
					{ text: "Votre rapport global \n\n", alignment: 'center' }
				],
				fontSize: 20,
				margin: [0, 100, 0, 0],
			}, {
				columns: [{
					text: [{ text: 'Individuel (Egocentré)\n\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Facilitateurs Intelligence Projective\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Collectif (Allocentré)\n\n\n', alignment: 'center' }, { text: '2', alignment: 'center' }]
				}]
			}, { text: '\n\n Commentaires\n', fontSize: 20 }, {
				text: "Ce diagramme illustre votre positionnement sur les 3 axes clés de votre intelligence projective :",
				bold: true
			}, {
				ul: [
					{ text: [{ text: "Individuel", bold: true }, " (Egocentré) : ce qui vous concerne, la connaissance que vous avez de vos Aptitudes (votre comportement), de vos Compétences (savoirs-faire) et de vos Motivations (personnelles et professionnelles)"] },
					{ text: [{ text: "Collectif", bold: true }, " (Allocentré) : la connaissance de votre Territoire (votre Poste), de l’organisation de votre Travailler ensemble (votre environnement direct) et de la Stratégie de l’entreprise"] },
					{ text: [{ text: "Facilitateurs de votre Intelligence Projective", bold: true }, " votre capacité à aller chercher de l’information (Vicariance), votre capacité à vous mettre à la place de l’autre (empathie) et votre sentiment d’efficacité personnelle (SEP)"] }
				]
			}, { text: '\n\n Recommandations\n', fontSize: 20 }, {
				text: "Pour chacun des axes vous avez obtenu :",
				bold: true
			},
			{ text: [{ text: "Entre 1-2", bold: true }, " vous avez besoin de temps et de méthodes pour aller chercher de l’information et alimenter votre réflexion personnelle et professionnelle"] },
			{ text: [{ text: "3", bold: true }, " vous avez besoin de progresser en réflexion et prise d’information sur l’axe concerné (voir analyse détaillée en suivi)"] },
			{ text: [{ text: "Entre 4-5", bold: true }, " vous avez a priori les informations nécessaires pour avancer dans votre réflexion professionnelle"] },
			logoBot
		];
		const page5 = [
			logoTop, {
				text: [
					{ text: "Informations vous concernant \n\n", alignment: 'center' }
				],
				fontSize: 20,
				margin: [0, 100, 0, 0],
			}, {
				columns: [{
					text: [{ text: 'Aptitudes\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Compétences\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Motivations\n\n', alignment: 'center' }, { text: '2', alignment: 'center' }]
				}, {
					text: [{ text: 'Joie et Talent\n\n', alignment: 'center' }, { text: '2', alignment: 'center' }]
				}]
			}, { text: '\n Commentaires\n', fontSize: 20 }, {
				text: "Ce diagramme reprend 4 dimensions Individuelles (Egocentrée) c'est-à-dire : ce qui vous concerne, la con-naissance que vous avez de vos Aptitudes (votre Comportement, de vos Compétences (vos savoirs-faire) et de vos Motivations (personnelles et professionnelles). Une indication vous est donnée sur l’identification de ce que vous faites avec « Joie et Talents »"
			}, { text: '\nRecommandations\n', fontSize: 20 },
			{ text: [{ text: "Aptitudes\n\n", bold: true }, " 1-2 vous avez besoin de temps et de méthodes pour aller chercher de l’information sur la connaissance de vos caractéristiques comportementales : cela peut faire partie d’un axe d’accompagnement en développement personnel"] },
			{ text: [{ text: "\n\nCompétences\n\n", bold: true }, " 1-2 vous avez des compétences : il vous appartient d’en prendre conscience, dans avoir la juste appréciation et de penser à leur développement (programme de formation) en perspective de votre évolution professionnelle"] },
			{ text: [{ text: "\n\nMotivations :\n\n", bold: true }, " 1-2 vous semblez avoir des difficultés à cerner vos motivations personnelles et professionnelles , il serait utile de prendre le temps de la réflexion et de faire un point carrière"] },
			{ text: [{ text: "\n\nJoie et Talents\n\n", bold: true }, " 1-2 vous avez forcement des talents que vous pouvez exercer avec satisfaction, accordez vous du temps pour en prendre conscience– faites vous accompagner au besoin"] },
			logoBot
		];
		const page6 = [
			logoTop, {
				text: [
					{ text: "Informations sur votre environnement \n\n", alignment: 'center' }
				],
				fontSize: 20,
				margin: [0, 100, 0, 0],
			}, {
				columns: [{
					text: [{ text: 'Territoire\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Stratégie\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Travailler ensemble\n\n', alignment: 'center' }, { text: '2', alignment: 'center' }]
				}]
			}, { text: '\n Commentaires\n', fontSize: 20 }, {
				text: "Environnement (Allocentré) : la connaissance du fonctionnement de votre environnement professionnel, c'est-à-dire votre Territoire (votre poste), de l’organisation de votre Travailler ensemble (votre environnement direct) et de la Stratégie de l’entreprise"
			}, { text: '\nRecommandations\n', fontSize: 20 },
			{ text: [{ text: "Territoire\n\n", bold: true }, " 1-2 Vous semblez avoir besoin de visibilité sur votre poste et son périmètre. Allez chercher de l’information pour clarifier votre positionnement dans l’organisation (N+1)"] },
			{ text: [{ text: "\n\nTravailler ensemble\n\n", bold: true }, " 1-2 Vous semblez avoir besoin de plus d’informations et de précisions pour bien appréhender l’organisation dans laquelle vous évoluez. Osez poser des questions et demandez du soutien (RH, N+1....)"] },
			{ text: [{ text: "\n\nStratégie\n\n", bold: true }, " 1-2 Vous semblez avoir besoin de plus d’informations et de précisions pour bien appréhender la stratégie de l’entreprise dans laquelle vous évoluez. Osez poser des questions et demandez du soutien (RH, N+1....)"] },
			logoBot
		];
		const page7 = [
			logoTop, {
				text: [
					{ text: "Facilitateurs IP \n\n", alignment: 'center' }
				],
				fontSize: 20,
				margin: [0, 100, 0, 0],
			}, {
				columns: [{
					text: [{ text: 'Vicariance\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'SEP et Estime de Soi\n\n', alignment: 'center' }, { text: '1', alignment: 'center' }]
				}, {
					text: [{ text: 'Empathie\n\n', alignment: 'center' }, { text: '2', alignment: 'center' }]
				}]
			}, { text: '\n\n Commentaires\n', fontSize: 20 }, {
				text: "Ces éléments constituent des facilitateurs au développement de votre Intelligence Projective. Il est important de les développer car il permettent d’avancer dans votre évolution professionnelle :",
				bold: true
			}, {
				ul: [
					{ text: ["L’empathie qui est la capacité de se mettre à la place de l’autre et permet ainsi de comprendre les responsabilités de l’autre (son n+1, n-1, RH)"] },
					{ text: ["La vicariance qui représente ce que vous pouvez apprendre de l’expérience de l’Autre et ainsi anticiper les mutations technologiques de son poste et environnement professionnel"] },
					{ text: ["Le SEP et l’estime de soi : Sentiment d’Efficacité Personnel qui représente la confiance d’un individu quant à ses capacités à réaliser des performances particulières. L’estime de soi qui réunit l’image de soi et la confiance en soi d’une manière générale"] }
				]
			}, { text: '\nRecommandations\n', fontSize: 20 },
			{ text: [{ text: "Empathie\n\n", bold: true }, " 1-2 Vous semblez avoir besoin de plus d’informations et de précisions pour comprendre le rôle et la place de chacun. Vous gagneriez à aller chercher de l’information pour prendre du recul d’analyse et vous mettre « à la place de l’autre »"] },
			{ text: [{ text: "\n\nVicariance\n\n", bold: true }, " 1-2 Vous semblez avoir besoin de vous rassurer pour aller chercher de l’information. Identifiez s’il s’agit d’une maitrise technique des outils de communication ou d’une simple timidité ?"] },
			{ text: [{ text: "\n\nSEP / Estime de soi\n\n", bold: true }, " 1-2 Il semble être nécessaire de renforcer votre confiance en vous. Prenez le temps d’identifier et de réaliser ce que vous êtes capable de bien faire. N’hésitez pas à demandez du soutien à votre N+1 ou RH"] },
			logoBot
		];
		const page8 = [{
				text: [
					{ text: "GLOSSAIRE : \n\n" }
				],
				fontSize: 20
			},
			{ text: [{ text: "Agentivité :", bold: true }, " « constat de la capacité de l’être humain à être acteur de son propre développement ». Il développe des capacités « d’agentivité »"] },
			{ text: [{ text: "\nAllo centré :", bold: true }, " Terme utilisé dans le cadre des informations que le bénéficiaire doit recevoir (instant T) et chercher (instant T+1) sur son environnement d’entreprise, dans sa réflexion de « carte »"] },
			{ text: [{ text: "\nAptitude :", bold: true }, " Disposition naturelle d’un sujet qui donne une capacité à faire (LAROUSSE) - Utilisées dans le PI© en termes de comportements"] },
			{ text: [{ text: "\nCompétences :", bold: true }, " savoir faire éprouvé : mesurable quantitativement et qualitativement"] },
			{ text: [{ text: "\nEgocentré :", bold: true }, " terme utilisé dans le cadre des informations que le consultant va donner au bénéficiaire pour l’aider dans sa réflexion de route, à savoir des informations concernant ses Aptitudes, Compétences et Motivations"] },
			{ text: [{ text: "\nEmpathie :", bold: true }, " Capacité de se mettre à la place de l’autre, de comprendre ses émotions sans pour autant les partager. L’empathie donne la capacité de dire : Oui, Non ou Oui mais à certaines conditions"] },
			{ text: [{ text: "\nIntelligence Projective :", bold: true }, " Capacité de l’individu de mettre ses Aptitudes Compétences et Motivations au service d’un projet collectif et capacité du collectif d’accueillir et de faire évoluer le projet de l’individu dans le projet collectif"] },
			{ text: [{ text: "\nMode de travail :", bold: true }, " forme d’organisation du travail et de relations professionnelles : hiérarchique, transverse, matricielle"] },
			{ text: [{ text: "\nMotivations :", bold: true }, " Ensemble des forces consicientes ou inconscientes qui engagent une personne pour une activité précise"] },
			{ text: [{ text: "\nPoste :", bold: true }, " Situation de travail individuelle constituée d’un ensemble de tâches concourant à la réalisation d’une activité professionnelle. Se détermine par un intitulé de poste"] },
			{ text: [{ text: "\nProjection professionnelle :", bold: true }, " Capacité d’anticipation et de représentation du devenir socioprofessionnel (route et carte)"] },
			{ text: [{ text: "\nProjets professionnels :", bold: true }, " Scénarios professionnels avec un titre de poste, un attachement hiérarchique, un secteur d’activité, un pôle fonctionnel, un mode de fonctionnement et un contexte d’entreprise. Le tout doit être réaliste (en phase avec les Aptitudes, Compétences et Motivations de la personne) et réalisable (en phase avec la réalité du contexte du marché de l’emploi)"] },
			{ text: [{ text: "\nSecteur d’activité :", bold: true }, " Regroupement d’entreprises de fabrication, de commerce et de service qui ont la même activité principale, au regard de la nomenclature et du classement de l’activité économique considérée."] },
			{ text: [{ text: "\nSEP :", bold: true }, " Sentiment d’efficacité personnelle qui représente la confiance d’un individu quant à ses capacités à réaliser des performances particulières"] },
			{ text: [{ text: "\nVicariance :", bold: true }, " capacité d’apprendre de l’expérience des autres, le Web 2.0 permet la vicariance."] }
		];


		const content = page1.concat(page2, page3, page4, page5, page6, page7, page8);
		var docDefinition = {
			pageSize: 'A4',
			content: content
		};
		return pdfMake.createPdf(docDefinition).download("Rapport d'autodiagnostic Projective Indicator©.pdf");
	}
});
