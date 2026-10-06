import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useSharedState from '../hooks/useSharedState';
import { getOpenClaimsCount } from '../services/claimsService';

function HomePage() {
  const [currentUser] = useSharedState('currentUser', { name: 'אורח' });
  const [openClaims, setOpenClaims] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOpenClaims() {
      const count = await getOpenClaimsCount();
      if (!cancelled) {
        setOpenClaims(count);
      }
    }

    loadOpenClaims().catch((error) => console.error('Failed to load open claims', error));
    return () => {
      cancelled = true;
    };
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
