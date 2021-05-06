const fs = require('fs');

var premierFichier = process.argv[2]
var secondFichier = process.argv[3]

// lit le fichier .txt et le transforme en tableau de sous-chaine de chiffre
function transformerFichierTexteEnTableauDeSousChaine(fichierTexte) {
    try {
        var fichierLu = fs.readFileSync(fichierTexte);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    var tab = fichierLu.toString().split('\r\n');
    tab = tab.map(chaine => chaine.split('').map(chiffre => parseInt(chiffre)));
    return tab;
}

var c1 = transformerFichierTexteEnTableauDeSousChaine(premierFichier);
var c2 = transformerFichierTexteEnTableauDeSousChaine(secondFichier);


// retourne l'index du premier élément de la sous-chaine "chaine1" contenu dans "chaine2"
function verifSousChaineDansLigne(chaine1, chaine2) {
    return chaine2.indexOf(chaine1)
}


function verifRectangle(c1, c2) {
    let i = 0;
    let carre = false;
    do {
        var firstPosition = -1;
        while ((firstPosition === -1) && (i < c2.length)) {
            firstPosition = verifSousChaineDansLigne(c1[0].join(''), c2[i].join(''))
            i++
        }
        if (firstPosition === -1) return "Le carré n'existe pas !"
        else {
            for (let j = 1; j < c1.length; j++) {
                let positionSuivante = verifSousChaineDansLigne(c1[j].join(''), c2[i - 1 + j].join(''));
                if (positionSuivante !== firstPosition) {
                    carre = false;
                    break;
                } else {
                    carre = true;
                }
            }
        }
    } while (i < c2.length && carre === false)
    if (carre) return [firstPosition, i - 1].join()
    else return "Le carré n'existe pas !"
}

console.log(verifRectangle(c1, c2))


// var c1 = [
//     [1, 2, 3],
//     [3, 2, 1],
//     [1, 2, 3]
// ]

// var c2 = [
//     [9, 3, 0, 8, 7, 0],
//     [0, 8, 1, 2, 3, 5],
//     [9, 7, 3, 2, 1, 7],
//     [0, 9, 1, 2, 3, 0],
//     [8, 8, 3, 7, 0, 0]
// ]