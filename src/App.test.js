import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'

import App from './App';
import Search from './components/Search'
import Button from './components/Button'
import UserList from './components/UserList'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(
        <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search', () => {
  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Поиск</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('есть корректный снимок', () => {
    const component = renderer.create(
        <Search>Поиск</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Дай мне больше</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('есть корректный снимок', () => {
    const component = renderer.create(
        <Button>Дай мне больше</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('UserList', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
  };

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserList { ...props } />, div);
  });
  test('есть корректный снимок', () => {
    const component = renderer.create(
        <UserList { ...props } />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});