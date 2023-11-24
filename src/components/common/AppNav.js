import React from 'react';

function AppNav(props) {
  const { list, pathname } = props;
  return (
    <div className="app-nav-container">
      {
        list.map((item, index) => (
          <a key={item.key || item.pathname || index}
             href={item.pathname} title={item.title || item.label}
             className={["app-nav-item", pathname === item.pathname ? 'active' : ''].join(' ')}>
            <span style={{marginRight: '8px'}}>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))
      }
    </div>
  );
}

export default AppNav;
