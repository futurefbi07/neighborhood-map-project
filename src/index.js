import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/*<script type="text/javascript">
      function gm_authFailure() { 
        alert(`Google Maps Authentication Failed! Map Will not load correctly
              Please Check your API License Key`)
      // here define authentication failed message     
     };
    </script>*/
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
