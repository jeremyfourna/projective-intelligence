import R from 'ramda'
import { moment } from 'meteor/momentjs:moment'
import canvg from 'canvg-browser'

import { logoPDF, ferreinLogo, intProj, egoCentre, alloCentre } from './pictures.js'
import { radarChart } from './svg.js'

const logoTop = {
  image: logoPDF,
  fit: [150, 150],
  absolutePosition: { x: 0, y: 0 },
}

function enterpriseName(name) {
  return {
    text: name,
    alignment: 'left',
    fontSize: 20,
    absolutePosition: { x: 450, y: 75 }
  }
}

const logoBot = {
  image: ferreinLogo,
  fit: [90, 90],
  absolutePosition: { x: 60, y: 770 },
  pageBreak: 'after'
}

const intProjLogo = {
  image: intProj,
  fit: [120, 35],
  absolutePosition: { x: 450, y: 20 },
}

const egoCentreLogo = {
  image: egoCentre,
  fit: [120, 50],
  absolutePosition: { x: 500, y: 20 },
}

const alloCentreLogo = {
  image: alloCentre,
  fit: [120, 50],
  absolutePosition: { x: 480, y: 20 },
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
    },
    enterpriseName(companyName), {
      text: moment().format('LL'),
      absolutePosition: { x: 20, y: 780 },
      fontSize: 20,
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
      "Le Projective Indicator© est issue d'un programme de Recherche et Développement qui s'appuie sur les dernières avancées scientifiques en matière de prise de décision en environnement professionnel \n\n\n",
      "Trouver du sens à ses responsabilités professionnelles participe d'un équilibre de vie \n\n\n",
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
    text: "\n\n\nVotre Intellicence Projective peut alors se mettre en oeuvre",
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
    }],
    alignment: 'center'
  }, { text: '\n\n + Glossaire en fin de document', alignment: 'center' },
  logoBot
]

function page4(data) {

  const newData = [data.map((cur) => {
    return {
      axis: cur.title,
      value: cur.score
    }
  })]

  radarChart('#chart-page-4', newData);


  function svgToCanvas() {
    var nodesToRecover = [];
    var nodesToRemove = [];

    var svgElems = document.getElementsByTagName("svg");

    for (var i = 0; i < svgElems.length; i++) {
      var node = svgElems[i];
      var parentNode = node.parentNode;
      var svg = parentNode.innerHTML;

      var canvas = document.createElement('canvas');

      canvg(canvas, svg);

      nodesToRecover.push({
        parent: parentNode,
        child: node
      });
      parentNode.removeChild(node);

      nodesToRemove.push({
        parent: parentNode,
        child: canvas
      });

      parentNode.appendChild(canvas);
    }
  }

  svgToCanvas()

  var canvas = document.getElementsByTagName("canvas")[0];
  var img = canvas.toDataURL("image/png");

  const schemaPNG = {
    image: img,
    fit: [250, 200],
    alignment: 'center'
  }


  return [
    logoTop, {
      text: "Votre rapport global \n\n",
      style: "subTitle"
    },
    schemaPNG, {
      text: 'Comment lire ce diagramme\n',
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
      text: '\nVotre score & interprétez le résultat\n',
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
  const newData = [data.map((cur) => {
    return {
      axis: cur.title,
      value: cur.score
    }
  }).filter((cur) => {
    return cur.axis === "Aptitudes" || cur.axis === "Compétences" || cur.axis === "Motivations" || cur.axis === "Joie et Talents"
  })]

  radarChart('#chart-page-5', newData);



  function svgToCanvas() {
    var nodesToRecover = [];
    var nodesToRemove = [];

    var svgElems = document.getElementsByTagName("svg");

    for (var i = 0; i < svgElems.length; i++) {
      var node = svgElems[i];
      var parentNode = node.parentNode;
      var svg = parentNode.innerHTML;

      var canvas = document.createElement('canvas');

      canvg(canvas, svg);

      nodesToRecover.push({
        parent: parentNode,
        child: node
      });
      parentNode.removeChild(node);

      nodesToRemove.push({
        parent: parentNode,
        child: canvas
      });

      parentNode.appendChild(canvas);
    }
  }

  svgToCanvas()

  var canvas = document.getElementsByTagName("canvas")[1];
  var img = canvas.toDataURL("image/png");

  const schemaPNG = {
    image: img,
    fit: [250, 200],
    alignment: 'center'
  }

  return [
    logoTop, egoCentreLogo, {
      text: "Informations vous concernant \n\n",
      style: "subTitle"
    },
    schemaPNG, {
      text: '\n Comment lire ce diagramme\n',
      fontSize: 20,
      margin: [0, 0, 0, 10]
    }, {
      text: "Ce diagramme reprend 4 dimensions Individuelles (Egocentrée) c'est-à-dire : ce qui vous concerne, la con-naissance que vous avez de vos Aptitudes (votre Comportement, de vos Compétences (vos savoirs-faire) et de vos Motivations (personnelles et professionnelles). Une indication vous est donnée sur l’identification de ce que vous faites avec « Joie et Talents »"
    }, {
      text: '\nVotre score & interprétez le résultat\n',
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
        text: "\nCompétences\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Compétences'), data).text]
    }, {
      text: [{
        text: "\nMotivations :\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Motivations'), data).text]
    }, {
      text: [{
        text: "\nJoie et Talents\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Joie et Talents'), data).text]
    },
    logoBot
  ]
}

function page6(data) {
  const newData = [data.map((cur) => {
    return {
      axis: cur.title,
      value: cur.score
    }
  }).filter((cur) => {
    return cur.axis === "Territoire" || cur.axis === "Travailler ensemble" || cur.axis === "Stratégie"
  })]

  radarChart('#chart-page-6', newData);


  function svgToCanvas() {
    var nodesToRecover = [];
    var nodesToRemove = [];

    var svgElems = document.getElementsByTagName("svg");

    for (var i = 0; i < svgElems.length; i++) {
      var node = svgElems[i];
      var parentNode = node.parentNode;
      var svg = parentNode.innerHTML;

      var canvas = document.createElement('canvas');

      canvg(canvas, svg);

      nodesToRecover.push({
        parent: parentNode,
        child: node
      });
      parentNode.removeChild(node);

      nodesToRemove.push({
        parent: parentNode,
        child: canvas
      });

      parentNode.appendChild(canvas);
    }
  }

  svgToCanvas()

  var canvas = document.getElementsByTagName("canvas")[2];
  var img = canvas.toDataURL("image/png");

  const schemaPNG = {
    image: img,
    fit: [250, 200],
    alignment: 'center'
  }


  return [
    logoTop, alloCentreLogo, {
      text: "Informations sur votre environnement \n\n",
      style: "subTitle"
    },
    schemaPNG, {
      text: '\n Comment lire ce diagramme\n',
      fontSize: 20,
      margin: [0, 0, 0, 10]
    }, {
      text: "Environnement (Allocentré) : la connaissance du fonctionnement de votre environnement professionnel, c'est-à-dire votre Territoire (votre poste), de l’organisation de votre Travailler ensemble (votre environnement direct) et de la Stratégie de l’entreprise",
    }, {
      text: '\nVotre score & interprétez le résultat\n',
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
        text: "\nTravailler ensemble\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Travailler ensemble'), data).text]
    }, {
      text: [{
        text: "\nStratégie\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Stratégie'), data).text]
    },
    logoBot
  ]
}

function page7(data) {
  const newData = [data.map((cur) => {
    let newCur = {
      axis: cur.title,
      value: cur.score
    };
    if (newCur.axis === "Sentiment d'Efficacité Personnel et Estime de Soi") {
      newCur.axis = "SEP et Estime de Soi";
    }
    return newCur;
  }).filter((cur) => {
    return cur.axis === "Empathie" || cur.axis === "Vicariance" || cur.axis === "SEP et Estime de Soi";
  })]

  radarChart('#chart-page-7', newData);


  function svgToCanvas() {
    var nodesToRecover = [];
    var nodesToRemove = [];

    var svgElems = document.getElementsByTagName("svg");

    for (var i = 0; i < svgElems.length; i++) {
      var node = svgElems[i];
      var parentNode = node.parentNode;
      var svg = parentNode.innerHTML;

      var canvas = document.createElement('canvas');

      canvg(canvas, svg);

      nodesToRecover.push({
        parent: parentNode,
        child: node
      });
      parentNode.removeChild(node);

      nodesToRemove.push({
        parent: parentNode,
        child: canvas
      });

      parentNode.appendChild(canvas);
    }
  }

  svgToCanvas()

  var canvas = document.getElementsByTagName("canvas")[3];
  var img = canvas.toDataURL("image/png");

  const schemaPNG = {
    image: img,
    fit: [250, 200],
    alignment: 'center'
  }


  return [
    logoTop, intProjLogo, {
      text: "Facilitateurs en Intelligence Projective",
      style: "subTitle"
    },
    schemaPNG, {
      text: '\nComment lire ce diagramme\n',
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
      text: 'Votre score & interprétez le résultat\n',
      fontSize: 20,
      margin: [0, 5, 0, 10]
    }, {
      text: [{
        text: "Empathie\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Empathie'), data).text]
    }, {
      text: [{
        text: "\nVicariance\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Vicariance'), data).text]
    }, {
      text: [{
        text: "\nSEP / Estime de soi\n",
        bold: true,
        margin: [0, 0, 0, 5]
      }, R.find(R.propEq('title', 'Sentiment d\'Efficacité Personnel et Estime de Soi'), data).text]
    },
    logoBot
  ]
}

const page8 = [
  logoTop, {
    text: "Conclusion \n\n",
    style: "subTitle"
  }, {
    text: "Vous avez maintenant terminé votre Projective Indicator©.",
    fontSize: 20,
    margin: [10, 0, 0, 30]
  }, {
    text: "Il ne tient qu'à vous aujourd'hui de progresser dans les points évoqués mais aussi de stabiliser vos acquis qui vous ont permis d'arriver là où vous en êtes aujourd'hui.",
    fontSize: 20,
    margin: [10, 0, 0, 30]
  }, {
    text: "Pour continuer de développer votre Intelligence Projective, vous devez allez chercher :",
    fontSize: 20,
    margin: [10, 0, 0, 10]
  }, {
    ul: [{
      text: ["Des informations vous concernant"],
      fontSize: 20,
      margin: [10, 0, 0, 5]
    }, {
      text: ["Des informations sur votre environnement"],
      fontSize: 20,
      margin: [10, 0, 0, 5]
    }, {
      text: ["Ainsi que des éléments connexes"],
      fontSize: 20,
      margin: [10, 0, 0, 5],
    }]
  },
  logoBot
]

const page9 = [{
  text: [{
    text: "\n\nGLOSSAIRE : \n\n"
  }],
  fontSize: 22,
}, {
  text: [{
    text: "Agentivité :",
    bold: true
  }, "« Constat de la capacité de l’être humain à être acteur de son propre développement ». Il développe des capacités « d’agentivité »"]
}, {
  text: [{
    text: "\nAllo centré :",
    bold: true
  }, "Terme utilisé dans le cadre des informations que le bénéficiaire doit recevoir (instant T) et chercher (instant T+1) sur son environnement d’entreprise, dans sa réflexion de « carte »"]
}, {
  text: [{
    text: "\nAptitude :",
    bold: true
  }, "Disposition naturelle d’un sujet qui donne une capacité à faire (LAROUSSE) - Utilisées dans le PI© en termes de comportements"]
}, {
  text: [{
    text: "\nCompétences :",
    bold: true
  }, "Savoir faire éprouvé : mesurable quantitativement et qualitativement"]
}, {
  text: [{
    text: "\nEgocentré :",
    bold: true
  }, "Terme utilisé dans le cadre des informations que le consultant va donner au bénéficiaire pour l’aider dans sa réflexion de route, à savoir des informations concernant ses Aptitudes, Compétences et Motivations"]
}, {
  text: [{
    text: "\nEmpathie :",
    bold: true
  }, "Capacité de se mettre à la place de l’autre, de comprendre ses émotions sans pour autant les partager. L’empathie donne la capacité de dire : Oui, Non ou Oui mais à certaines conditions"]
}, {
  text: [{
    text: "\nIntelligence Projective :",
    bold: true
  }, "Capacité de l’individu de mettre ses Aptitudes Compétences et Motivations au service d’un projet collectif et capacité du collectif d’accueillir et de faire évoluer le projet de l’individu dans le projet collectif"]
}, {
  text: [{
    text: "\nMode de travail :",
    bold: true
  }, "Forme d’organisation du travail et de relations professionnelles : hiérarchique, transverse, matricielle"]
}, {
  text: [{
    text: "\nMotivations :",
    bold: true
  }, "Ensemble des forces consicientes ou inconscientes qui engagent une personne pour une activité précise"]
}, {
  text: [{
    text: "\nPoste :",
    bold: true
  }, "Situation de travail individuelle constituée d’un ensemble de tâches concourant à la réalisation d’une activité professionnelle. Se détermine par un intitulé de poste"]
}, {
  text: [{
    text: "\nProjection professionnelle :",
    bold: true
  }, "Capacité d’anticipation et de représentation du devenir socioprofessionnel (route et carte)"]
}, {
  text: [{
    text: "\nProjets professionnels :",
    bold: true
  }, "Scénarios professionnels avec un titre de poste, un attachement hiérarchique, un secteur d’activité, un pôle fonctionnel, un mode de fonctionnement et un contexte d’entreprise. Le tout doit être réaliste (en phase avec les Aptitudes, Compétences et Motivations de la personne) et réalisable (en phase avec la réalité du contexte du marché de l’emploi)"]
}, {
  text: [{
    text: "\nSecteur d’activité :",
    bold: true
  }, "Regroupement d’entreprises de fabrication, de commerce et de service qui ont la même activité principale, au regard de la nomenclature et du classement de l’activité économique considérée."]
}, {
  text: [{
    text: "\nSEP :",
    bold: true
  }, "Sentiment d’efficacité personnelle qui représente la confiance d’un individu quant à ses capacités à réaliser des performances particulières"]
}, {
  text: [{
    text: "\nVicariance :",
    bold: true
  }, "Capacité d’apprendre de l’expérience des autres, le Web 2.0 permet la vicariance."]
}]

const style = {
  title: {
    alignment: 'center',
    fontSize: 30,
    margin: [0, 150, 0, 0]
  },
  subTitle: {
    alignment: 'center',
    fontSize: 22,
    margin: [0, 140, 0, 0]
  }
}


export function docDefinition(data) {
  function content(data) {
    return page1(data.company).concat(page2, page3, page4(data.level3), page5(data.level2), page6(data.level2), page7(data.level2), page8, page9)
  }

  return {
    pageSize: 'A4',
    content: content(data),
    styles: style,
    pageMargins: [40, 0, 40, 0],
  }
}
