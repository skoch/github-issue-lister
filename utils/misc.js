export const isClient = typeof window !== 'undefined';
export const isProduction = process.env.NODE_ENV === 'production';

// Gets the display name of a JSX component for dev tools
export function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export const generateUniqueId = (props) => {
  let id = '';

  Object.keys(props).forEach((prop) => {
    id += `${props[prop]}-`;
  });

  id += `${Math.floor(Math.random() * 0xFFFF)}`;

  id = id.replace(/[^A-Za-z0-9-]/gi, '');

  return id;
};

export const getCookie = (name) => {
  if (!document.cookie) {
    return null;
  }

  const cookie = document.cookie
    .split(';')
    .filter(c => c.trim().startsWith(`${name}=`));
  if (!cookie.length) {
    return null;
  }

  return decodeURIComponent(cookie[0].split('=')[1]);
};
