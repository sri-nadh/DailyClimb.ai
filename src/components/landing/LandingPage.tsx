import React from 'react';
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GlassmorphismCard } from '../ui/GlassmorphismCard';

const LandingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
}));

const ValuePropGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const ValuePropCard = styled(GlassmorphismCard)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const CTASection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(8),
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  color: 'white',
  padding: theme.spacing(2, 4),
  fontSize: '1.1rem',
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
  },
  transition: 'all 0.3s ease-in-out',
}));

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onLogin,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <LandingContainer>
      <ContentContainer maxWidth="lg">
        {/* Navigation */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="mb-12"
        >
          <Typography variant="h5" className="font-bold text-blue-400">
            DailyClimb
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={onLogin}
              className="text-white border-blue-400 hover:bg-blue-400/10"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onGetStarted}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>

        {/* Hero Section */}
        <HeroSection>
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            className="font-bold text-white mb-6 leading-tight"
          >
            Accelerate Your Professional Growth with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              AI-Powered Learning
            </span>
          </Typography>
          
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            className="text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Get personalized, time-optimized content delivered exactly when you need it. 
            Stay ahead in your career with daily insights from industry leaders.
          </Typography>
          
          <Typography
            variant="h6"
            className="text-blue-400 font-medium italic mb-8"
          >
            "Climb higher, one insight at a time"
          </Typography>
        </HeroSection>

        {/* Value Propositions */}
        <ValuePropGrid>
          <ValuePropCard>
            <Box className="text-6xl mb-4">⚡</Box>
            <Typography variant="h5" className="text-white font-semibold mb-3">
              Smart Content Curation
            </Typography>
            <Typography variant="body1" className="text-gray-300 leading-relaxed">
              AI finds and personalizes the best professional content for your domain
            </Typography>
          </ValuePropCard>

          <ValuePropCard>
            <Box className="text-6xl mb-4">🎯</Box>
            <Typography variant="h5" className="text-white font-semibold mb-3">
              Time-Optimized Learning
            </Typography>
            <Typography variant="body1" className="text-gray-300 leading-relaxed">
              Learn in focused 10-20 minute sessions that fit your schedule
            </Typography>
          </ValuePropCard>

          <ValuePropCard>
            <Box className="text-6xl mb-4">📱</Box>
            <Typography variant="h5" className="text-white font-semibold mb-3">
              Social Media Automation
            </Typography>
            <Typography variant="body1" className="text-gray-300 leading-relaxed">
              Generate professional posts automatically with proper source attribution
            </Typography>
          </ValuePropCard>
        </ValuePropGrid>

        {/* Call to Action */}
        <CTASection>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <GradientButton
              size="large"
              onClick={onGetStarted}
            >
              Start Your Daily Climb
            </GradientButton>
            
            <Button
              variant="outlined"
              size="large"
              className="text-gray-300 border-gray-500 hover:border-blue-400 hover:text-blue-400"
            >
              See How DailyClimb Works
            </Button>
          </Stack>
          
          <Typography variant="body2" className="text-gray-400 mt-6">
            Join thousands of professionals already climbing higher
          </Typography>
        </CTASection>
      </ContentContainer>
    </LandingContainer>
  );
};