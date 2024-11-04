import { Box, Typography, Link } from "@mui/material";

const AUTOMATIC_RENEWAL_INFO = 'Automatic renewal of $29.99 per month.'


const STYLES = {
  text: {
    color: 'var(--text-secondary-color)',
    fontSize: '12px',
    lineHeight: '20px',
  }
}

function SubscriptionText() {
  return (
    <Box textAlign="center"> 
      <Typography sx={STYLES.text}>
        {AUTOMATIC_RENEWAL_INFO}
        <br />
        You may cancel by{" "}
        <Link href="mailto:support@justdone.ai" color="inherit">
          support@justdone.ai
        </Link>. Our goal is customer satisfaction
      </Typography>
    </Box>
  );
}

export default SubscriptionText;