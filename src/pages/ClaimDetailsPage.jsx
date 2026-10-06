import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useSharedState from '../hooks/useSharedState';
import DatePickerField from '../components/DatePickerField/DatePickerField';
import DocumentUpload from '../components/DocumentUpload/DocumentUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  statusBadge: (props) => ({
    color: props.urgent ? theme.palette.error.main : theme.palette.text.primary,
    fontWeight: props.urgent ? 700 : 400,
  }),
}));

function ClaimDetailsPage() {
  const { claimId } = useParams();
  const [claimDraft, setClaimDraft] = useSharedState('claimDraft', { urgent: false, incidentDate: null });
  const classes = useStyles({ urgent: claimDraft.urgent });

  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item>
        <Typography variant="h5">תביעה מספר {claimId}</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.statusBadge}>
          {claimDraft.urgent ? 'דחוף' : 'רגיל'}
        </Typography>
      </Grid>
      <Grid item>
        <DatePickerField
          label="תאריך האירוע"
          value={claimDraft.incidentDate}
          onChange={(incidentDate) => setClaimDraft({ ...claimDraft, incidentDate })}
        />
      </Grid>
      <Grid item>
        <DocumentUpload claimId={claimId} />
      </Grid>
    </Grid>
  );
}

export default ClaimDetailsPage;
