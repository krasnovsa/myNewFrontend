function organizeFiles(data) {
  // Функция для создания карты всех элементов по их Id
  const fileMap = new Map();

  // Сначала добавляем все элементы в карту для быстрого доступа по ключу
  data.forEach((item) => {
    fileMap.set(item.Id, {
      ...item,
      children: item.isFolder ? [] : undefined,
    });
  });

  // Массив для корневых элементов (тех, у которых путь "./")
  const result = [];

  // Рекурсивная функция для перемещения дочерних элементов в папку
  function placeChildren(parent) {
    const parentPath = parent.relPath + parent.fName + "/";

    // Проходим по каждому элементу и проверяем, является ли он дочерним для текущей папки
    data.forEach((item) => {
      if (item.relPath === parentPath) {
        // Если это папка, рекурсивно обрабатываем ее детей
        if (item.isFolder === 1) {
          placeChildren(fileMap.get(item.Id));
        }
        // Убедимся, что у родителя есть поле children
        if (parent.children) {
          parent.children.push(fileMap.get(item.Id));
        }
      }
    });
  }

  // Обрабатываем каждый элемент
  data.forEach((item) => {
    // Если это папка в корне, начинаем обработку детей
    if (item.isFolder === 1 && item.relPath === "./") {
      placeChildren(fileMap.get(item.Id));
      result.push(fileMap.get(item.Id));
    }
    // Если это файл в корне, добавляем его в корневой массив
    else if (item.isFolder === 0 && item.relPath === "./") {
      result.push(fileMap.get(item.Id));
    }
  });

  return result;
}

export default organizeFiles;
