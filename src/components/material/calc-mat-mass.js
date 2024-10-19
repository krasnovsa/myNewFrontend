function calculateMaterialProperties(dim1, dim2 = 0, dim3 = 1, profile, density, markName, qlt) {
    // Вывод входных параметров в консоль
    console.log("Входные параметры:");
    console.log("dim1:", dim1);
    console.log("dim2:", dim2);
    console.log("dim3:", dim3);
    console.log("profile:", profile);
    console.log("density:", density);
    console.log("markName:", markName);
    console.log("qlt:", qlt);
  
    let area = 0;
    let matName = `${markName} ${profile} ${dim1}`;
  
    // Вычисление площади поперечного сечения в зависимости от профиля
    switch (profile) {
      case 'Плита':
      case 'Полоса':
        area = dim1 * dim2;
        matName += ` х ${dim2}`;
        break;
      case 'Круг':
        area = Math.PI * (dim1 * dim1) / 4;
        break;
      case 'Труба':
        area = Math.PI * (dim1 * dim1) / 4;
        if (dim2 > 0) {
          area -= Math.PI * ((dim1 - 2 * dim2) * (dim1 - 2 * dim2)) / 4;
          matName += ` х ${dim2}`;
        }else{area=0}
        break;
      case 'Квадрат':
        area = dim1 * dim1;
        break;
      case 'Шестигранник':
        area = 2 * Math.sqrt(3) * ((dim1 / 2) * (dim1 / 2));
        break;
      default:
        area = 0;
        break;
    }
  
    // Вычисление массы 1 метра
    const mass1m = (area * density) / 1000;
  
    // Добавление качества к названию материала, если оно указано
    if (qlt) {
      matName += ` ${qlt}`;
    }

    console.log("Результат:");
    console.log("mass1m:", mass1m);
    console.log("matName:", matName);
  
    return {
      mass1m: parseFloat(mass1m.toFixed(3)),
      matName: matName.trim(),
    };
  }
  
//   // Пример использования функции
//   const dim1 = 50;
//   const dim2 = 30;
//   const dim3 = 1;
//   const qlt = 'Калибр';
//   const profile = 'Труба';
//   const density = 7.85;
//   const markName = 'Сталь 20';
  
//   const result = calculateMaterialProperties(dim1, dim2, dim3, profile, density, markName, qlt);
   //console.log(result); // { mass1m: 5.495, matName: 'Сталь Труба 50 х 30 Калибр' }
  
  export default calculateMaterialProperties;
  
 
