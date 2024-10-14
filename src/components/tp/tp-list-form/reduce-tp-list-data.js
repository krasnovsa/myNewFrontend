const reduceTpListData = (tpItems) => {
  const techProcesses = {};

  tpItems.forEach((item) => {
    const { tpId, tpAuthorId, tpCrDate, tpIsDefault, ...tpItem } = item;

    // Преобразование даты в формат DD.MM.YYYY
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

    // Если техпроцесс с таким tpId еще не создан, создаем его
    if (!techProcesses[tpId]) {
      techProcesses[tpId] = {
        tpId,
        tpAuthorId,
        tpCrDate: formatDate(tpCrDate), // Преобразуем дату
        tpIsDefault,
        tpItems: [],
      };
    }

    // Добавляем tpId обратно в tpItem
    tpItem.tpId = tpId;

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