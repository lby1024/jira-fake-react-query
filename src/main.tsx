import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Query } from './component/Query.tsx';
import './index.css'
import { Pop } from './component/Pop.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Query>
      <Pop.UI />
      <App />
    </Query>
  </React.StrictMode>,
)
