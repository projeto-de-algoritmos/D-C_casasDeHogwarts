export const houses = [
  {
    id: 1,
    name: "Corvinal",
    img: "./img/corvinal.jpeg",
    priorityList: [5,5,8,5,10,10,4,7,6,3],
  },
  {
    id: 2,
    name: "Grifinória",
    img: "./img/grifinoria.jpeg",
    priorityList: [10, 10, 6, 8, 4, 7, 7, 6,8,10],
  },
  {
    id: 4,
    name: "Sonserina",
    img: "./img/grifinoria.jpeg",
    priorityList: [2,8,10,10,1,1,1,2,10,8],
  },
  {
    id: 3,
    name: "Lufa Lufa",
    img: "./img/lufalufa.jpeg",
    priorityList: [7,3,4,3,7,4,10,10,3,6],
  },

];

export function setup(userPriority, housePriority) {
  var array = [];
  var tmp = Array(userPriority.length);
  console.log(userPriority);

  for (var index = 0; index < userPriority.length; index++) {
    tmp[userPriority[index] - 1] = index + 1;
  }
  userPriority = tmp;

  for (var i in housePriority) {
    array.push(userPriority[housePriority[i] - 1]);
  }
  
  return array;
}

export function mergeAndCount(a, b) {
  var array = [];
  var i = a.length;
  var j = b.length;
  var r = 0;

  while (i !== 0 || j !== 0) {
    if (j !== 0 && (i === 0 || b[b.length - j] < a[a.length - i])) {
      array.push(b[b.length - j]);
      j -= 1;
      r += i;
    } else {
      array.push(a[a.length - i]);
      i -= 1;
    }
  }
  return [r, array];
}

export function sortAndCount(userPriority) {
  var rb, ra, r;
  if (userPriority.length === 1) {
    return [0, userPriority];
  }

  var a = userPriority.slice(0, Math.floor(userPriority.length / 2));
  var b = userPriority.slice(
    Math.floor(userPriority.length / 2),
    userPriority.length
  );

  [ra, a] = sortAndCount(a);
  [rb, b] = sortAndCount(b);
  [r, userPriority] = mergeAndCount(a, b);

  return [r + ra + rb, userPriority];
}

export function matchhouse(userPriority) {
  var match;
  var min = Infinity;

  houses.forEach((house, index) => {
    var [inversions] = sortAndCount(setup(userPriority, house.priorityList));
    console.log(inversions);

    if (inversions < min) {
      min = inversions;
      match = house;
    }
  });

  return match;
}


//tentativa fracassada de melhorar o algoritmo

// export function calcularDistancia(vetor1, vetor2) {
//   let distancia = 0;
//   for (let i = 0; i < vetor1.length; i++) {
//     distancia += Math.pow(vetor1[i] - vetor2[i], 2);
//   }
//   return Math.sqrt(distancia);
// }

// export function encontrarGrupoMaisProximo(entradasUsuario) {
//   let grupoMaisProximo = -1;
//   let menorDistancia = Infinity;

//   for (let i = 0; i < houses.length; i++) {
//     const distancia = calcularDistancia(entradasUsuario, houses[i].priorityList);
//     if (distancia < menorDistancia) {
//       menorDistancia = distancia;
//       grupoMaisProximo = i + 1;
//     }
//   }



