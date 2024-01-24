function customRender(reactELement, mainContainer) {
  const container = mainContainer;
  const domElement = document.createElement(reactELement.type);
  domElement.innerHTML = reactELement.children;
  for (const prop in reactELement.props) {
    if (prop === 'children') continue;
    domElement.setAttribute(prop, reactELement.props.prop);
  }
  container.appendChild(domElement);
}

const reactELement = {
  type: 'a',
  props: {
    href: 'https://google.com',
    target: "_blank"
  },
  children: "Click me to visit google"
}

const mainContainer = document.getElementById('root');

customRender(reactELement, mainContainer);