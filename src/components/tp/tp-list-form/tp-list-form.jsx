import React, { useEffect, useState, useContext } from 'react';
import TpListFormList from '../tp-list-form-list/tp-list-form-list';
import reduceTpListData from './reduce-tp-list-data';
import { getTechProcessList } from '../../../api/apiTp';
import { isAuthenticated } from '../../../auth/index';
import { CurrentAppContext } from '../../../contexts/currentApp'; // Импортируем контекст
import './styles.css'; // Импортируем стили

const TpListForm = ({ prodId }) => {
  const [techProcesses, setTechProcesses] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="tp-list-form-container">
      <h3 onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
        {isCollapsed ? 'Развернуть' : 'Свернуть'} список техпроцессов для продукта ID: {prodId}
      </h3>
      {!isCollapsed && (
        <div className="tp-list-form-content">
          {techProcesses.map((tp) => (
            <TpListFormList key={tp.tpId} techProcess={tp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TpListForm;