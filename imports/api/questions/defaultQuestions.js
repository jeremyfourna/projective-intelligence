import { Random } from 'meteor/random'

export const questions = [{
	title: 'Sur une échelle de 1 à 10, pensez-vous avoir une bonne connaissance de vous-même ?',
	level: 2,
	displayType: 'scale'
}, {
	title: 'Sur une échelle de 1 à 10, pensez-vous avoir une bonne connaissance de votre comportement ?',
	level: 3,
	displayType: 'scale'
}, {
	title: 'Préférez vous travailler seul(e) ?',
	level: 4,
	displayType: 'qcmDefault'
}, {
	title: 'Préférez-vous travailler en équipe ?',
	level: 5,
	displayType: 'qcmDefault'
}, {
	title: 'Préférez-vous échanger avec une seule personne ?',
	level: 6,
	displayType: 'qcmDefault'
}, {
	title: 'Préférez-vous échanger avec plusieurs personnes ?',
	level: 7,
	displayType: 'qcmDefault'
}, {
	title: 'On dit de vous que vous avez souvent les pieds sur terre ?',
	level: 8,
	displayType: 'qcmDefault'
}, {
	title: 'On dit de vous que vous avez souvent des idées inattendues ?',
	level: 9,
	displayType: 'qcmDefault'
}, {
	title: 'Vous préférez envisager différentes possibilités ?',
	level: 10,
	displayType: 'qcmDefault'
}, {
	title: 'Vous avez souvent le sens du détail ?',
	level: 11,
	displayType: 'qcmDefault'
}, {
	title: 'Vous appréciez les raisonnements logiques ?',
	level: 12,
	displayType: 'qcmDefault'
}, {
	title: 'Vous êtes attentif et sensible à vos propres émotions et celles des autres ?',
	level: 13,
	displayType: 'qcmDefault'
}, {
	title: 'Lorsque vous avez une décision à prendre, vous préférez écouter votre tête (logique, principe), plutôt que votre cœur (valeurs, intérêt pour les personnes) ?',
	level: 14,
	displayType: 'qcmDefault'
}, {
	title: 'Lorsque vous avez une décision  à prendre, vous préférez écouter votre cœur (valeurs, intérêt pour les personnes), plutôt que votre tête (logique, principes) ?',
	level: 15,
	displayType: 'qcmDefault'
}, {
	title: 'Vous préférez un style de vie plutôt organisé, planifié, méthodique ?',
	level: 16,
	displayType: 'qcmDefault'
}, {
	title: 'Vous préférez un style de vie plutôt réactif, spontané, adapté ?',
	level: 17,
	displayType: 'qcmDefault'
}, {
	title: 'Vous aimez travailler dans l’urgence ?',
	level: 18,
	displayType: 'qcmDefault'
}, {
	title: 'Vous aimez planifier à l’avance votre travail ?',
	level: 19,
	displayType: 'qcmDefault'
}, {
	title: 'Compte tenu de vos réponses et sur une échelle de 1 à 10, pensez-vous avoir une bonne connaissance de votre comportement ?',
	level: 20,
	displayType: 'scale'
}, {
	title: 'Sur une échelle de 1 à 10, pensez vous avoir bien identifié vos compétences ?',
	level: 21,
	displayType: 'scale'
}, {
	title: 'Etes-vous capable de faire la différence entre connaissances et compétences ?',
	level: 22,
	displayType: 'qcmDefault'
}, {
	title: 'Pensez-vous utiliser pleinement vos compétences dans l’exercice de vos fonctions ?',
	level: 23,
	displayType: 'qcmDefault'
}, {
	title: 'Etes-vous capable d’exprimer de façon chiffrée l’utilisation de vos compétences (combien, budget, burée, chiffre d’affaires…) ?',
	level: 24,
	displayType: 'qcmDefault'
}, {
	title: 'Etes-vous capable d’exprimer de façon qualitative l’utilisation de vos compétences (périmètre d’intervention, niveau d’interlocuteurs, taux de marges…)',
	level: 25,
	displayType: 'qcmDefault'
}, {
	title: 'Y a-t-il des compétences que vous maitrisez mais que vous ne souhaitez plus utiliser dans le futur ?',
	level: 26,
	displayType: 'qcmDefault'
}, {
	title: 'Y a-t-il des compétences que vous souhaitez approfondir ?',
	level: 27,
	displayType: 'qcmDefault'
}, {
	title: 'Y a-t-il des compétences nouvelles que vous souhaitez acquérir ?',
	level: 28,
	displayType: 'qcmDefault'
}, {
	title: 'Avez-vous identifié les programmes de formation nécessaires ?',
	level: 29,
	displayType: 'qcmDefault'
}, {
	title: 'Dans l’exercice de votre fonction, pouvez vous prendre conscience de vos marges de progression en termes de compétences ?',
	level: 30,
	displayType: 'qcmDefault'
}, {
	title: 'Avez-vous identifié les compétences que vous maitriser déjà pour le poste vers lequel vous souhaitez évoluer ?',
	level: 31,
	displayType: 'qcmDefault'
}, {
	title: 'Avez-vous identifié les compétences qu’il vous reste à acquérir pour le poste vers lequel vous souhaitez évoluer ?',
	level: 32,
	displayType: 'qcmDefault'
}, {
	title: 'Après avoir répondu à ces questions et sur une échelle de 1 à 10 est il facile pour vous d’identifier vos compétences ?',
	level: 33,
	displayType: 'scale'
}, {
	title: 'Avez-vous identifié une tâche que vous savez faire mieux que tout le monde, un talent  ?',
	level: 34,
	displayType: 'qcmDefault'
}, {
	title: 'Pouvez-vous identifier une ou plusieurs personnes en résonance avec ce talent ?',
	level: 35,
	displayType: 'qcmDefault'
}, {
	title: 'Y a-t-il une tâche que vous faites facilement ?',
	level: 36,
	displayType: 'qcmDefault'
}, {
	title: 'Y a-t-il une tâche que vous faites avec joie ?',
	level: 37,
	displayType: 'qcmDefault'
}, {
	title: 'Sur une échelle de 1 à 10, quel est votre degré de conscience de vos motivations ?',
	level: 38,
	displayType: 'scale'
}, {
	title: 'Vous souhaitez : Un job alimentaire ?',
	level: 39,
	displayType: 'qcmDefault'
}, {
	title: 'Vous souhaitez accroître vos savoirs faire ?',
	level: 40,
	displayType: 'qcmDefault'
}, {
	title: 'Vous souhaitez apporter votre pierre à une construction collective ?',
	level: 41,
	displayType: 'qcmDefault'
}, {
	title: 'La satisfaction d’un travail accompli est votre première motivation ?',
	level: 42,
	displayType: 'qcmDefault'
}, {
	title: 'Vous souhaitez évouler vers du management ?',
	level: 43,
	displayType: 'qcmDefault'
}, {
	title: 'Vous souhaitez évoluer vers de l’expertise ?',
	level: 44,
	displayType: 'qcmDefault'
}, {
	title: 'Vous souhaitez évoluer en autonomie de décision ?',
	level: 45,
	displayType: 'qcmDefault'
}, {
	title: 'Vous souhaitez devenir entrepreneur',
	level: 46,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous, un équilibre de vie passe aussi par votre vie sociale ?',
	level: 47,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous, un équilibre de vie passe aussi par son logement ?',
	level: 48,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous, un équilibre de vie passe aussi par sa vie financière ?',
	level: 49,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous un équilibre de vie passe aussi par un équilibre de sa vie familiale ?',
	level: 50,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous, un équilibre de vie passe aussi par un équilibre de santé ?',
	level: 51,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous, un équilibre de vie passe par : Un équilibre spirituel ?',
	level: 52,
	displayType: 'qcmDefault'
}, {
	title: 'Pour vous, un équilibre de vie passe par : Un équilibre de la vie professionnelle ?',
	level: 53,
	displayType: 'qcmDefault'
}, {
	title: 'Sur une échelle de 1 à 10, avez-vous le sentiment d’être au clair de vos motivations personnelles et professionnelles ?',
	level: 54,
	displayType: 'scale'
}, {
	title: 'Après avoir répondu à ces questions comment évaluez-vous les connaissances que vous avez de vous-même (1 à 10) ?',
	level: 55,
	displayType: 'scale'
}, {
	title: 'Quel est votre connaissance du contenu du poste vers lequel vous souhaitez évoluer ?',
	level: 56,
	displayType: 'scale'
}, {
	title: 'Êtes vous capable de nommer (titre) ce poste précisément ?',
	level: 57,
	displayType: 'yesNo'
}, {
	title: 'Connaissez-vous l’environnement de travail de ce type de poste (bureau, open space, atelier…) ?',
	level: 58,
	displayType: 'yesNo'
}, {
	title: 'Savez à qui le poste est rattaché  (titre du responsable) ?',
	level: 59,
	displayType: 'yesNo'
}, {
	title: 'Avez-vous déjà identifié le secteur d’activité vers lequel vous souhaitez évoluer ?',
	level: 60,
	displayType: 'qcmDefault'
}, {
	title: 'Avez-vous identifié à quel pôle fonctionnel appartient le poste vers lequel vous souhaitez évoluer (marketing, finances, ressources humaines, commercial, production…) ?',
	level: 61,
	displayType: 'qcmDefault'
}, {
	title: 'Avez-vous identifié le mode de travail du poste vers lequel vous souhaitez évoluer : Fonctionnement hiérarchique, transverse, matriciel… ?',
	level: 62,
	displayType: 'qcmDefault'
}, {
	title: 'Les métiers évoluent, pouvez vous mesurer la force du changement qui impacte votre poste ?',
	level: 68,
	displayType: 'qcmDefault'
}, {
	title: 'En général, est-il facile pour vous d’aller chercher de l’information ?',
	level: 69,
	displayType: 'yesNo'
}, {
	title: 'Menez-vous régulièrement une veille professionnelle sur vos compétences ?',
	level: 71,
	displayType: 'qcmDefault'
}, {
	title: 'Êtes-vous attentif aux innovations qui touchent vos centres d’intérêts ?',
	level: 72,
	displayType: 'yesNo'
}, {
	title: 'Utilisez-vous le web collaboratif (réseaux sociaux, internet…) ?',
	level: 73,
	displayType: 'yesNo'
}, {
	title: 'Sollicitez-vous votre réseau personnel pour aller chercher l’information ?',
	level: 74,
	displayType: 'qcmDefault'
}, {
	title: 'Sollicitez-vous votre réseau professionnel pour aller chercher de l’information ?',
	level: 75,
	displayType: 'qcmDefault'
}, {
	title: 'Pouvez vous provoquer une rencontre avec une personne que vous ne connaissez pas mais avec qui vous auriez avantage à échanger ?',
	level: 76,
	displayType: 'qcmDefault'
}, {
	title: 'Votre projet professionnel correspond-t-il à vos valeurs ?',
	level: 77,
	displayType: 'scale'
}, {
	title: 'Sur une échelle de 1 à 10, vous sentez vous en phase avec les valeurs de l’entreprise dans laquelle vous souhaitez évoluer ?',
	level: 78,
	displayType: 'scale'
}, {
	title: 'Vous êtes vous déjà mis à la place de votre responsable ou futur responsable ?',
	level: 79,
	displayType: 'yesNo'
}, {
	title: 'Avez-vous identifié des personnes avec qui vous souhaitez vraiment travailler ?',
	level: 80,
	displayType: 'qcmDefault'
}, {
	title: 'Sur une échelle de 1 à 10, avez-vous le sentiment d’être efficace dans votre poste ?',
	level: 81,
	displayType: 'scale'
}, {
	title: 'Sur une échelle de 1 à 10, pouvez-vous noter l’image que vous avez de vous-même ?',
	level: 82,
	displayType: 'scale'
}, {
	title: 'Parmi les situations d’entreprises suivantes, choisissez laquelle vous attire le plus ?',
	level: 63,
	displayType: 'qcm',
	choices: [{
		choiceId: Random.id(),
		label: 'Une entreprise en phase démarrage (start up, innovation)',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Une entreprise en phase de professionnalisation (plus de 10 ans, organisation, process…)',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Une entreprise en phase de re-développement / réorganisation (plus de 20 ans)',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Ne sais pas',
		qcmPoints: 1
	}]
}, {
	title: 'Avez-vous une idée de la taille de l’entreprise vers laquelle vous souhaitez évoluer ?',
	level: 64,
	displayType: 'qcm',
	choices: [{
		choiceId: Random.id(),
		label: 'TPE (Très Petite Entreprise)',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'PME (Petite Moyenne Entreprise)',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Grand groupe ou filiales',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Ne sais pas',
		qcmPoints: 1
	}]
}, {
	title: 'Avez-vous une préférence de culture d’entreprise ?',
	level: 65,
	displayType: 'qcm',
	choices: [{
		choiceId: Random.id(),
		label: 'Française',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Anglo-saxonne',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'International',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Secteur Public',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Association',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Institution',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Autres',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Ne sais pas',
		qcmPoints: 1
	}]
}, {
	title: 'Avez-vous réfléchi à votre statut ?',
	level: 66,
	displayType: 'qcm',
	choices: [{
		choiceId: Random.id(),
		label: 'Salarié (CDI / CDD)',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Vacataire',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Freelance',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Indépendant',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Associé',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Ne sais pas',
		qcmPoints: 1
	}]
}, {
	title: 'A quand remonte votre dernière formation ?',
	level: 67,
	displayType: 'qcm',
	choices: [{
		choiceId: Random.id(),
		label: 'Moins d’un an',
		qcmPoints: 3
	}, {
		choiceId: Random.id(),
		label: 'Moins de deux ans',
		qcmPoints: 2
	}, {
		choiceId: Random.id(),
		label: 'Plus de deux ans',
		qcmPoints: 1
	}]
}, {
	title: 'Allez-vous chercher de l’information régulièrement ?',
	level: 70,
	displayType: 'qcm',
	choices: [{
		choiceId: Random.id(),
		label: 'Jamais',
		qcmPoints: 1
	}, {
		choiceId: Random.id(),
		label: 'De temps en temps',
		qcmPoints: 2
	}, {
		choiceId: Random.id(),
		label: 'Souvent',
		qcmPoints: 3
	}]
}];
