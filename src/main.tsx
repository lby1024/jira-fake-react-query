import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Query } from './component/Query.tsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Query>
      <App/>
    </Query>
  </React.StrictMode>,
)
