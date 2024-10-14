import React, { useEffect, useState, useContext } from 'react';
import TpListFormList from '../tp-list-form-list/tp-list-form-list';
import reduceTpListData from './reduce-tp-list-data';
import { getTechProcessList } from '../../../api/apiTp';
import { isAuthenticated } from '../../../auth/index';
import { CurrentAppContext } from '../../../contexts/currentApp'; // Импортируем контекст
import './styles.css'; // Импортируем стили

const TpListForm = ({ prodId }) => {
  const [techProcesses, setTechProcesses] = useState([]);
  const [state] = useContext(CurrentAppContext); // Используем контекст

  const {
    user: { _id: userId = null },
    token,
  } = isAuthenticated();

  useEffect(() => {
    const fetchTechProcesses = async () => {
      try {
        const data = await getTechProcessList(token, userId, prodId);
        const groupedTpItems = reduceTpListData(data);
        setTechProcesses(groupedTpItems);
      } catch (err) {
        console.error('Ошибка при получении техпроцессов:', err);
      }
    };

    if (prodId) {
      fetchTechProcesses();
    }
  }, [prodId, token, userId, state.curProdIdTrigger]); // Добавляем зависимость от триггера

  return (
    <div className="tp-list-form-container">
      <h3>Список техпроцессов для продукта ID: {prodId}</h3>
      <div className="tp-list-form-content">
        <div className="row align-items-center">
          <div className="col form-group mb-0">
            <p>ID</p>
          </div>
          <div className="col form-group mb-0">
            <p>Автор</p>
          </div>
          <div className="col form-group mb-0">
            <p>Дата создания</p>
          </div>
          <div className="col form-group mb-0">
            <p>По умолчанию</p>
          </div>
        </div>
        {techProcesses.map((tp) => (
          <div key={tp.tpId} className="border-bottom">
            <TpListFormList techProcess={tp} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TpListForm;