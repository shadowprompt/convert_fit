import React from 'react';

function defaultRenderItem(item) {
  return (
    <>
      <h4 className="app-list-item-title">
        {item.title}
      </h4>
      <div className="app-list-item-description">
        {item.desc}
      </div>
    </>
  );
}
function AppList(props) {
  const { list = [], renderItem = defaultRenderItem } = props;
  return (
    <div className="app-list-container">
      {
        list.map((item, index) => (
          <div className="app-list-item" key={item.key || item.label || index}>
            {
              renderItem(item)
            }
          </div>
        ))
      }
    </div>
  );
}

export default AppList;
