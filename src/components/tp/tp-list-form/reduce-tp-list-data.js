/**
 * Функция для группировки элементов tpItems по техпроцессам
 * @param {Array} tpItems - массив объектов tpItems
 * @returns {Array} - массив техпроцессов с вложенными массивами объектов tpItems
 */
const reduceTpListData = (tpItems) => {
    // Создаем объект для хранения техпроцессов
    const techProcesses = {};
  
    // Проходим по каждому элементу tpItems
    tpItems.forEach((item) => {
      const { tpId, tpAuthorId, tpCrDate, tpIsDefault, ...tpItem } = item;
  
      // Если техпроцесс с таким tpId еще не создан, создаем его
      if (!techProcesses[tpId]) {
        techProcesses[tpId] = {
          tpId,
          tpAuthorId,
          tpCrDate,
          tpIsDefault,
          tpItems: [],
        };
      }
  
      // Добавляем элемент tpItem в массив tpItems техпроцесса
      techProcesses[tpId].tpItems.push(tpItem);
    });
  
    // Преобразуем объект техпроцессов в массив
    return Object.values(techProcesses);
  };
  
  export default reduceTpListData;