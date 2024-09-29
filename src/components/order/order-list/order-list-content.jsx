import React from 'react';
import PropTypes from 'prop-types';
import OrderListItem from '../order-list-item/order-list-item';
import OrderListHeader from './order-list-header';

const OrderListContent = ({ ordList, setSearchStr }) => (
  <table className=" table-bordered table-custom">
    <OrderListHeader />
    <tbody>
      {ordList.map((order, index) => (
        <OrderListItem
          key={order._id || order.id || index}
          ord={order}
          setSearchStr={setSearchStr}
        />
      ))}
    </tbody>
  </table>
);

OrderListContent.propTypes = {
  ordList: PropTypes.array.isRequired,
  setSearchStr: PropTypes.func.isRequired,
};

export default OrderListContent;