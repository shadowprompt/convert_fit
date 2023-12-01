import React from 'react';

function defaultRenderItem(item, index, props) {
  const { pathname } = props;
  let isActive = item.pathname === pathname;
  // 如果路径不相等但是是其自己父级路径，也可以认为是active
  if (!isActive) {
    const list = pathname.split('/');
    const parentPathname = list.slice(0, list.length - 1).join('/');
    isActive = item.pathname === parentPathname;
  }

  return (
    <li key={item.key || item.pathname || index}
       className={["app-nav-item", isActive ? 'active' : ''].join(' ')}>
      <a className="app-nav-item-link" href={item.href || item.pathname} title={item.title || item.label}>
        <span className="app-nav-item-icon">{item.icon}</span>
        <span className="app-nav-item-text">{item.label}</span>
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
