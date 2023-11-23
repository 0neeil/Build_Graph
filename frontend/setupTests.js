const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);