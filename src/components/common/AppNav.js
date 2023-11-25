import React from 'react';

function defaultRenderItem(item, index, props) {
  const { pathname } = props;
  return (
    <li key={item.key || item.pathname || index}
       className={["app-nav-item", pathname === item.pathname ? 'active' : ''].join(' ')}>
      <a href={item.pathname} title={item.title || item.label}>
        <span style={{marginRight: '8px'}}>{item.icon}</span>
        <span>{item.label}</span>
      </a>
      {
        item.children && (
          <ul className="app-nav-container" style={{zIndex: index + 1}}>
            {
              item.children.map((it, idx) => defaultRenderItem(it, idx, props))
            }
          </ul>
        )
      }
    </li>
  );
}
function AppNav(props) {
  const { list, renderItem = defaultRenderItem } = props;
  return (
    <ul className="app-nav-container">
      {
        list.map((item, index) => renderItem(item, index, props))
      }
    </ul>
  );
}

export default AppNav;
