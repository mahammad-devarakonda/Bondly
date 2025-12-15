import React from 'react'
import Layout from './Layout'
import appStore, { persistor } from './Redux/Store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={appStore}>
      <Layout/>
    </Provider>
    
  )
}

export default App
