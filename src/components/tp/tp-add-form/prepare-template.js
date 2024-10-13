import { getWorkGroupsList } from "../../../api/apiWg.js";
import { isAuthenticated } from "../../../auth";

const prepareTemplateForSubmission = (template) => {
    // Копируем шаблон
    const updatedTemplate = { ...template };
  
    // Фильтруем операции, исключая те, у которых isSelected = 0
    updatedTemplate.operations = updatedTemplate.operations.filter(
      (operation) => operation.isSelected !== 0
    );
  
    // Добавляем служебные операции
    const serviceOperations = [
      {
        num: 111,
        wgId: 1,
        qttToOne: 1,
        qtt: 1,
        isSelected: 1,
        name: "Сервисная операция для учета протерь",
      },
      {
        num: 112,
        wgId: 1,
        qttToOne: 1,
        qtt: 1,
        isSelected: 1,
        name: "Сервисная операция для учета протерь",
      },
      {
        num: 90,
        wgId: 19,
        qttToOne: 1,
        qtt: 1,
        isSelected: 1,
        name: "Слесарная",
      },
    ];
  
    updatedTemplate.operations = [
      serviceOperations[0],
      ...updatedTemplate.operations,
      serviceOperations[1],
    ];
  
    return updatedTemplate;
  };


// Export the prepareTemplateForSubmission function
export { prepareTemplateForSubmission };