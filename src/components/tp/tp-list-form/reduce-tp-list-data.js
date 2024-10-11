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
  
    // Сортируем элементы tpItems по возрастанию num
    Object.values(techProcesses).forEach((techProcess) => {
      techProcess.tpItems.sort((a, b) => a.num - b.num);
    });
  
    // Преобразуем объект техпроцессов в массив
    return Object.values(techProcesses);
  };
  
  export default reduceTpListData;