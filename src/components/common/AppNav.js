import React from 'react';

function AppNav(props) {
  const { list, pathname } = props;
  return (
    <div className="app-nav-container">
      {
        list.map((item, index) => (
          <div key={item.key || item.pathname || index}
            className={["app-nav-item", pathname === item.pathname ? 'active' : ''].join(' ')}>
            <span>{item.icon}</span>
            <span>
                    <a href={item.pathname} title={item.title || item.label}>{item.label}</a>
                  </span>
          </div>
        ))
      }
    </div>
  );
}

export default AppNav;
