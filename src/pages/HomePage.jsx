import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useSharedState from '../hooks/useSharedState';
import { API_BASE_URL } from '../config/env';

function HomePage() {
  const [currentUser] = useSharedState('currentUser', { name: 'אורח' });
  const [openClaims, setOpenClaims] = useState(null);

  // useEffect אסינכרוני ישיר - דפוס legacy שיכול לעדכן state אחרי unmount;
  // המיגרציה אמורה לעטוף בפונקציה פנימית עם דגל ביטול.
  useEffect(async () => {
    const response = await fetch(`${API_BASE_URL}/claims/open-count`);
    const data = await response.json();
    setOpenClaims(data.count);
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">שלום, {currentUser.name}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          {openClaims === null ? 'טוען תביעות פתוחות...' : `תביעות פתוחות: ${openClaims}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HomePage;
