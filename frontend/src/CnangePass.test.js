import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './pages/Auth';
import NavBar from './components/Navbar';
import Profile from './pages/Profile';
import { Context } from './index';
import UserStore from './store/UserStore';

describe('User Authorization and Navigation to Profile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  it('should login the user, navigate to profile, and change the password', async () => {
      render(
          <Context.Provider value={{ user: new UserStore() }}>
              <Router>
                  <Auth />
              </Router>
          </Context.Provider>
      );

      fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
          target: { value: 'admin3@gmail.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Password'), {
          target: { value: 'aaaaaaaa' },
      });

      await fireEvent.click(screen.getByText('Send'));

      window.localStorage.setItem('user', JSON.stringify({id:"30", email: 'admin3@gmail.com'}));

      window.localStorage.getItem.mockReturnValue(JSON.stringify({id:"30", email: 'admin3@gmail.com'}));

      const userStore = new UserStore();
      userStore.setIsAuth(true);

      render(
          <Context.Provider value={{ user: userStore }}>
              <Router>
                  <NavBar />
              </Router>
          </Context.Provider>
      );

      await fireEvent.click(screen.getByTestId('profile-button'));

      render(
        <Context.Provider value={{ user: userStore }}>
            <Router>
                <Profile/>
            </Router>
        </Context.Provider>
      );

      await fireEvent.click(screen.getByText('Change password'));

      expect(screen.getByText('Change Password')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Old Password'), {
          target: { value: 'aaaaaaaa' }
        });

        fireEvent.change(screen.getByLabelText('New Password'), {
            target: { value: 'bbbbbbbb' }
        });

        fireEvent.change(screen.getByLabelText('Confirm New Password'), {
            target: { value: 'bbbbbbbb' }
        });

        await fireEvent.click(screen.getByLabelText('Send'));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
});