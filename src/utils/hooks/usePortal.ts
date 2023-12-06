import * as React from 'react';
import * as ReactDOM from 'react-dom';

function createRootElement(id:any) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function addRootElement(rootElem:any) {
  if (document.body.lastElementChild && document.body) {
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild.nextElementSibling
    );
  }
}

function usePortal(id:any) {
  const rootElemRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);
    if (!existingParent) {
      addRootElement(parentElem);
    }

    if (rootElemRef.current) {
      parentElem.appendChild(rootElemRef.current);
    }

    return () => {
      if (rootElemRef.current) {
        rootElemRef.current.remove();
      }

      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, []);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }

    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
