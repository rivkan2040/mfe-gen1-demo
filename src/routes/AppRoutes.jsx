import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ClaimDetailsPage from '../pages/ClaimDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';

// שים לב: המודול הזה עדיין כתוב בסגנון react-router-dom v5 (Switch/exact/
// useHistory) אף שה-package.json כבר שדרג ל-v6. זהו חוב טכני שהמיגרציה
// (S3 ואילך) אמורה לזהות ולתקן ל-Routes/useNavigate.
function ClaimRedirect() {
  const history = useHistory();

  React.useEffect(() => {
    if (!history.location.search.includes('claimId')) {
      history.replace('/');
    }
  }, [history]);

  return <Redirect to="/claims/new" />;
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/claims/:claimId"
        render={(routeProps) => <ClaimDetailsPage {...routeProps} />}
      />
      <Route path="/claims" exact component={ClaimRedirect} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default AppRoutes;
