import { Meta, StoryObj } from '@storybook/react';
import {
  within,
  userEvent,
  waitFor,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

import { SignIn } from './SignIn';

const RESPONSE_MESSAGE = 'Login realizado!';

export default {
  title: 'Pages/SignIn',
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(
            ctx.json({
              message: RESPONSE_MESSAGE,
            })
          );
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByTestId('email'), 'rhuan@gmail.com');
    userEvent.type(canvas.getByTestId('password'), '12345678');

    userEvent.click(canvas.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(canvas.getByText(RESPONSE_MESSAGE)).toBeInTheDocument();
    });
  },
};
