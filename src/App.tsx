import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const perPageChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const visibleItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );
  const itemsPerPageFrom = currentPage * itemsPerPage + 1;
  const itemsPerPageTo = Math.min(
    (currentPage + 1) * itemsPerPage,
    items.length,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
      {`Page ${currentPage + 1} (items ${itemsPerPageFrom} - ${itemsPerPageTo} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={perPageChangeHandler}
            defaultValue="5"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        itemsForPage={itemsPerPage}
        allItems={items}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ul>
        {visibleItems.map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
