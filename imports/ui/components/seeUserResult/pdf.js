import R from 'ramda'

import { logoPDF, ferreinLogo } from './pictures.js'

const logoTop = {
	image: logoPDF,
	fit: [150, 150],
	absolutePosition: { x: 0, y: 0 },
}

const logoBot = {
	image: ferreinLogo,
	fit: [100, 100],
	absolutePosition: { x: 65, y: 735 },
	pageBreak: 'after'
}

function page1(companyName) {
	return [
		logoTop, {
			text: [
				"Rapport d'autodiagnostic \n",
				"Projective Indicator©\n\n"
			],
			alignment: 'center',
			fontSize: 40,
			margin: [0, 300, 0, 0],
		}, {
			text: companyName,
			alignment: 'center',
			fontSize: 25,
		},
		logoBot
	]
}

const page2 = [
	logoTop, {
		text: "Le Projective Indicator© \n\n",
		style: "title"
	}, {
		text: [
			"Le Projective Indicator© est issue d'un programme de Recherche et Développement qui s'appuie sur les dernières avancées scientifiques en matière de prise de décision en environnement professionnel \n\n",
			"Trouver du sens à ses responsabilités professionnelles participe d'un équilibre de vie \n\n",
		],
		fontSize: 20,
		margin: [0, 0, 0, 0],
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
]

const page3 = [
	logoTop, {
		text: "Votre rapport d'autodiagnostic Projective Indicator© \n\n",
		style: "subTitle"
	}, {
		text: [
			"Le Projective Indicator© a pour but de vous accompagner en connaissance de vous-même ainsi que de votre environnement de travail. Il vous permet de prendre conscience des éléments clés de votre évolution professionnelle et personnelle afin de développer votre agentivité (volonté d’être acteur de son propre développement)\n\n",
			{ text: "Ce rapport est individuel et confidentiel et vous est uniquement destiné.", italics: true }
		],
		fontSize: 15,
	}, {
		text: "\n\nComment lire ce rapport :",
		fontSize: 22,
	}, {
		text: '\nGlobal\n\n',
		alignment: 'center',
		fontSize: 22
	}, {
		columns: [{
			text: [{
				text: 'Données personnelles\n\n',
				fontSize: 18
			}, {
				text: 'Aptitudes\n\n'
			}, {
				text: 'Compétences\n\n'
			}, {
				text: 'Motivations\n\n'
			}, {
				text: 'Joie et talent'
			}]
		}, {
			text: [{
				text: 'Données\ncollectives\n\n',
				fontSize: 18
			}, {
				text: 'Territoires\n\n',
			}, {
				text: 'Travailler ensemble\n\n',
			}, {
				text: 'Stratégie',
			}]
		}, {
			text: [{
				text: 'Facilitateurs\n\n\n',
				fontSize: 18
			}, {
				text: 'Empathie\n\n',
			}, {
				text: 'Vicariance\n\n',
			}, {
				text: 'SEP',
			}]
		}]
	}, { text: '\n\n + Glossaire en fin de document', alignment: 'center' },
	logoBot
]

function page4(data) {
	return [
		logoTop, {
			text: "Votre rapport global \n\n",
			style: "subTitle"
		}, {
			columns: [{
				text: [{
					text: 'Individuel (Egocentré)\n\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Ego centré'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Facilitateurs Intelligence Projective\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Intelligence Projective'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Collectif (Allocentré)\n\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Allo centré'), data).score.toString(),
					alignment: 'center'
				}]
			}]
		}, {
			text: '\n Commentaires\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: "Ce diagramme illustre votre positionnement sur les 3 axes clés de votre intelligence projective :",
			bold: true,
			margin: [0, 0, 0, 5]
		}, {
			ul: [{
				text: [{
					text: "Individuel",
					bold: true
				}, " (Egocentré) : ce qui vous concerne, la connaissance que vous avez de vos Aptitudes (votre comportement), de vos Compétences (savoirs-faire) et de vos Motivations (personnelles et professionnelles)"],
				margin: [0, 0, 0, 5]
			}, {
				text: [{
					text: "Collectif",
					bold: true
				}, " (Allocentré) : la connaissance de votre Territoire (votre Poste), de l’organisation de votre Travailler ensemble (votre environnement direct) et de la Stratégie de l’entreprise"],
				margin: [0, 0, 0, 5]
			}, {
				text: [{
					text: "Facilitateurs de votre Intelligence Projective",
					bold: true
				}, " : votre capacité à aller chercher de l’information (Vicariance), votre capacité à vous mettre à la place de l’autre (empathie) et votre sentiment d’efficacité personnelle (SEP)"],
				margin: [0, 0, 0, 5]
			}]
		}, {
			text: '\n\n Recommandations\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: "Pour chacun des axes vous avez obtenu :",
			bold: true,
			margin: [0, 0, 0, 5]
		}, {
			text: [{
				text: "Entre 1-2",
				bold: true
			}, " vous avez besoin de temps et de méthodes pour aller chercher de l’information et alimenter votre réflexion personnelle et professionnelle"],
			margin: [0, 0, 0, 5]
		}, {
			text: [{
				text: "3",
				bold: true
			}, " vous avez besoin de progresser en réflexion et prise d’information sur l’axe concerné (voir analyse détaillée en suivi)"],
			margin: [0, 0, 0, 5]
		}, {
			text: [{
				text: "Entre 4-5",
				bold: true
			}, " vous avez a priori les informations nécessaires pour avancer dans votre réflexion professionnelle"],
			margin: [0, 0, 0, 5]
		},
		logoBot
	]
}

function page5(data) {
	return [
		logoTop, {
			text: "Informations vous concernant \n\n",
			style: "subTitle"
		}, {
			columns: [{
				text: [{
					text: 'Aptitudes\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Aptitudes'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Compétences\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Compétences'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Motivations\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Motivations'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Joie et Talent\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Joie et Talents'), data).score.toString(),
					alignment: 'center'
				}]
			}]
		}, {
			text: '\n Commentaires\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: "Ce diagramme reprend 4 dimensions Individuelles (Egocentrée) c'est-à-dire : ce qui vous concerne, la con-naissance que vous avez de vos Aptitudes (votre Comportement, de vos Compétences (vos savoirs-faire) et de vos Motivations (personnelles et professionnelles). Une indication vous est donnée sur l’identification de ce que vous faites avec « Joie et Talents »"
		}, {
			text: '\nRecommandations\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: [{
				text: "Aptitudes\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Aptitudes'), data).text]
		}, {
			text: [{
				text: "\n\nCompétences\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Compétences'), data).text]
		}, {
			text: [{
				text: "\n\nMotivations :\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Motivations'), data).text]
		}, {
			text: [{
				text: "\n\nJoie et Talents\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Joie et Talents'), data).text]
		},
		logoBot
	]
}

function page6(data) {
	return [
		logoTop, {
			text: "Informations sur votre environnement \n\n",
			style: "subTitle"
		}, {
			columns: [{
				text: [{
					text: 'Territoire\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Territoire'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Stratégie\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Stratégie'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Travailler ensemble\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Travailler ensemble'), data).score.toString(),
					alignment: 'center'
				}]
			}]
		}, {
			text: '\n Commentaires\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: "Environnement (Allocentré) : la connaissance du fonctionnement de votre environnement professionnel, c'est-à-dire votre Territoire (votre poste), de l’organisation de votre Travailler ensemble (votre environnement direct) et de la Stratégie de l’entreprise"
		}, {
			text: '\nRecommandations\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: [{
				text: "Territoire\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Territoire'), data).text]
		}, {
			text: [{
				text: "\n\nTravailler ensemble\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Travailler ensemble'), data).text]
		}, {
			text: [{
				text: "\n\nStratégie\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Stratégie'), data).text]
		},
		logoBot
	]
}

function page7(data) {
	return [
		logoTop, {
			text: "Facilitateurs IP \n\n",
			style: "subTitle"
		}, {
			columns: [{
				text: [{
					text: 'Vicariance\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Vicariance'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'SEP et Estime de Soi\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Sentiment d\'Efficacité Personnel et Estime de Soi'), data).score.toString(),
					alignment: 'center'
				}]
			}, {
				text: [{
					text: 'Empathie\n\n',
					alignment: 'center'
				}, {
					text: R.find(R.propEq('title', 'Empathie'), data).score.toString(),
					alignment: 'center'
				}]
			}]
		}, {
			text: '\n Commentaires\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: "Ces éléments constituent des facilitateurs au développement de votre Intelligence Projective. Il est important de les développer car il permettent d’avancer dans votre évolution professionnelle :",
			bold: true
		}, {
			ul: [{
				text: ["L’empathie qui est la capacité de se mettre à la place de l’autre et permet ainsi de comprendre les responsabilités de l’autre (son n+1, n-1, RH)"],
				margin: [0, 0, 0, 5]
			}, {
				text: ["La vicariance qui représente ce que vous pouvez apprendre de l’expérience de l’Autre et ainsi anticiper les mutations technologiques de son poste et environnement professionnel"],
				margin: [0, 0, 0, 5]
			}, {
				text: ["Le SEP et l’estime de soi : Sentiment d’Efficacité Personnel qui représente la confiance d’un individu quant à ses capacités à réaliser des performances particulières. L’estime de soi qui réunit l’image de soi et la confiance en soi d’une manière générale"],
				margin: [0, 0, 0, 5]
			}]
		}, {
			text: '\nRecommandations\n',
			fontSize: 20,
			margin: [0, 0, 0, 10]
		}, {
			text: [{
				text: "Empathie\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Empathie'), data).text]
		}, {
			text: [{
				text: "\n\nVicariance\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Vicariance'), data).text]
		}, {
			text: [{
				text: "\n\nSEP / Estime de soi\n",
				bold: true,
				margin: [0, 0, 0, 5]
			}, R.find(R.propEq('title', 'Sentiment d\'Efficacité Personnel et Estime de Soi'), data).text]
		},
		logoBot
	]
}

const page8 = [{
	text: [{
		text: "GLOSSAIRE : \n\n"
	}],
	fontSize: 22
}, {
	text: [{
		text: "Agentivité :",
		bold: true
	}, " « constat de la capacité de l’être humain à être acteur de son propre développement ». Il développe des capacités « d’agentivité »"]
}, {
	text: [{
		text: "\nAllo centré :",
		bold: true
	}, " Terme utilisé dans le cadre des informations que le bénéficiaire doit recevoir (instant T) et chercher (instant T+1) sur son environnement d’entreprise, dans sa réflexion de « carte »"]
}, {
	text: [{
		text: "\nAptitude :",
		bold: true
	}, " Disposition naturelle d’un sujet qui donne une capacité à faire (LAROUSSE) - Utilisées dans le PI© en termes de comportements"]
}, {
	text: [{
		text: "\nCompétences :",
		bold: true
	}, " savoir faire éprouvé : mesurable quantitativement et qualitativement"]
}, {
	text: [{
		text: "\nEgocentré :",
		bold: true
	}, " terme utilisé dans le cadre des informations que le consultant va donner au bénéficiaire pour l’aider dans sa réflexion de route, à savoir des informations concernant ses Aptitudes, Compétences et Motivations"]
}, {
	text: [{
		text: "\nEmpathie :",
		bold: true
	}, " Capacité de se mettre à la place de l’autre, de comprendre ses émotions sans pour autant les partager. L’empathie donne la capacité de dire : Oui, Non ou Oui mais à certaines conditions"]
}, {
	text: [{
		text: "\nIntelligence Projective :",
		bold: true
	}, " Capacité de l’individu de mettre ses Aptitudes Compétences et Motivations au service d’un projet collectif et capacité du collectif d’accueillir et de faire évoluer le projet de l’individu dans le projet collectif"]
}, {
	text: [{
		text: "\nMode de travail :",
		bold: true
	}, " forme d’organisation du travail et de relations professionnelles : hiérarchique, transverse, matricielle"]
}, {
	text: [{
		text: "\nMotivations :",
		bold: true
	}, " Ensemble des forces consicientes ou inconscientes qui engagent une personne pour une activité précise"]
}, {
	text: [{
		text: "\nPoste :",
		bold: true
	}, " Situation de travail individuelle constituée d’un ensemble de tâches concourant à la réalisation d’une activité professionnelle. Se détermine par un intitulé de poste"]
}, {
	text: [{
		text: "\nProjection professionnelle :",
		bold: true
	}, " Capacité d’anticipation et de représentation du devenir socioprofessionnel (route et carte)"]
}, {
	text: [{
		text: "\nProjets professionnels :",
		bold: true
	}, " Scénarios professionnels avec un titre de poste, un attachement hiérarchique, un secteur d’activité, un pôle fonctionnel, un mode de fonctionnement et un contexte d’entreprise. Le tout doit être réaliste (en phase avec les Aptitudes, Compétences et Motivations de la personne) et réalisable (en phase avec la réalité du contexte du marché de l’emploi)"]
}, {
	text: [{
		text: "\nSecteur d’activité :",
		bold: true
	}, " Regroupement d’entreprises de fabrication, de commerce et de service qui ont la même activité principale, au regard de la nomenclature et du classement de l’activité économique considérée."]
}, {
	text: [{
		text: "\nSEP :",
		bold: true
	}, " Sentiment d’efficacité personnelle qui représente la confiance d’un individu quant à ses capacités à réaliser des performances particulières"]
}, {
	text: [{
		text: "\nVicariance :",
		bold: true
	}, " capacité d’apprendre de l’expérience des autres, le Web 2.0 permet la vicariance."]
}]

const style = {
	title: {
		alignment: 'center',
		fontSize: 30,
		margin: [0, 100, 0, 0]
	},
	subTitle: {
		alignment: 'center',
		fontSize: 22,
		margin: [0, 120, 0, 0]
	}
}


export function docDefinition(data) {
	function content(data) {
		return page1(data.company).concat(page2, page3, page4(data.level3), page5(data.level2), page6(data.level2), page7(data.level2), page8)
	}

	return {
		pageSize: 'A4',
		content: content(data),
		styles: style,
		/*defaultStyle: {
			font: 'Dincond'
		}*/
	}
}
