import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import { AppRouter } from './routers/AppRouter';
import { JournalApp } from './JournalApp';

ReactDOM.render(
  <JournalApp />,
  document.getElementById('root')
);
