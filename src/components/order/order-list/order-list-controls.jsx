import React from 'react';
import PropTypes from 'prop-types';

const OrderListControls = ({
  searchStr,
  handleSearchChange,
  handleKeyDown,
  handleSearchClick,
  handleClearClick,
  handleRequeryClick,
  filterStr,
}) => (
  <>
    <div className="input-group mb-1">
      <input
        type="text"
        value={searchStr}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search orders..."
        className="form-control"
      />
      <button className="btn btn-primary" onClick={handleSearchClick}>
        Search
      </button>
      <button className="btn btn-secondary" onClick={handleClearClick}>
        Clear
      </button>
      <button className="btn btn-info" onClick={handleRequeryClick}>
        Requery
      </button>
    </div>
    <div className="current-filter">
      <small id="current-filter" className="form-text text-muted">
        Текущий фильтр: {filterStr}
      </small>
    </div>
  </>
);

OrderListControls.propTypes = {
  searchStr: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleSearchClick: PropTypes.func.isRequired,
  handleClearClick: PropTypes.func.isRequired,
  handleRequeryClick: PropTypes.func.isRequired,
  filterStr: PropTypes.string,
};

export default OrderListControls;