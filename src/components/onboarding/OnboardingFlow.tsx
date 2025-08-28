import React, { useState } from 'react';
import {
  Container,
  Typography,
  LinearProgress,
  Button,
  Stack,
  Box,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { OnboardingStep1 } from './steps/OnboardingStep1';
import { OnboardingStep2 } from './steps/OnboardingStep2';
import { OnboardingStep3 } from './steps/OnboardingStep3';
import { OnboardingStep4 } from './steps/OnboardingStep4';
import { OnboardingStep5 } from './steps/OnboardingStep5';
import { OnboardingStep6 } from './steps/OnboardingStep6';
import { OnboardingStep7 } from './steps/OnboardingStep7';
import { OnboardingData } from '../../types/schema';

const OnboardingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

const OnboardingHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(16px)',
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: 'calc(100vh - 120px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const StepContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.8)',
  backdropFilter: 'blur(16px)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(59, 130, 246, 0.2)',
  padding: theme.spacing(4),
  maxWidth: '600px',
  margin: '0 auto',
  width: '100%',
}));

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    step: 1,
  });

  const totalSteps = 7;

  const handleStepComplete = (stepData: any) => {
    const updatedData = { ...onboardingData, ...stepData, step: currentStep + 1 };
    setOnboardingData(updatedData);
    
    if (currentStep === totalSteps) {
      onComplete(updatedData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    const commonProps = {
      data: onboardingData,
      onNext: handleStepComplete,
      onBack: handleStepBack,
    };

    switch (currentStep) {
      case 1:
        return <OnboardingStep1 {...commonProps} />;
      case 2:
        return <OnboardingStep2 {...commonProps} />;
      case 3:
        return <OnboardingStep3 {...commonProps} />;
      case 4:
        return <OnboardingStep4 {...commonProps} />;
      case 5:
        return <OnboardingStep5 {...commonProps} />;
      case 6:
        return <OnboardingStep6 {...commonProps} />;
      case 7:
        return <OnboardingStep7 {...commonProps} />;
      default:
        return <OnboardingStep1 {...commonProps} />;
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <OnboardingContainer>
      {/* Header */}
      <OnboardingHeader>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6" className="font-bold text-blue-400">
              DailyClimb
            </Typography>
            {currentStep > 1 && (
              <IconButton onClick={handleStepBack} size="small">
                <ArrowBackIosNewOutlinedIcon className="text-gray-400" />
              </IconButton>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" className="text-gray-400">
              Step {currentStep} of {totalSteps}
            </Typography>
            <Button
              variant="text"
              onClick={onSkip}
              className="text-gray-400 hover:text-white"
            >
              Exit Setup
            </Button>
          </Stack>
        </Stack>

        {/* Progress Bar */}
        <Box className="mt-3">
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#3b82f6',
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </OnboardingHeader>

      {/* Content */}
      <ContentContainer maxWidth="md">
        <StepContainer>
          {renderCurrentStep()}
        </StepContainer>
      </ContentContainer>
    </OnboardingContainer>
  );
};