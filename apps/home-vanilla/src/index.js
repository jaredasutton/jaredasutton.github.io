{
  const context = {};
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_Z':
        return { ...state, z: action.payload };
      default:
        return state;
    }
  }
  const createStore = (reducer, context) => {
    let listeners = [];
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
    let state = reducer(context, { type: '@@INIT' });
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
    const getState = () => state;
    return { subscribe, dispatch, getState };
  }
  const store = createStore(reducer, context);

  const render = () => {
    const rootEl = document.createElement('div');
    rootEl.innerHTML = `
      <div>
        <h1>Home</h1>
        <p>z: ${store.getState().z}</p>
        <button id="btn">Set z</button>
      </div>
    `;
    rootEl.querySelector('#btn').addEventListener('click', () => {
      store.dispatch({ type: 'SET_Z', payload: Math.random() });
      render();
    });
    return rootEl;
  }
  document.body.appendChild(render());
}