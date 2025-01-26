import React from 'react';

import { HomepageSection } from '../HomepageSection/HomepageSection';
import step1 from '../../../assets/images/howItWorks/step1.png';
import step2 from '../../../assets/images/howItWorks/step2.png';
import step3 from '../../../assets/images/howItWorks/step3.png';
import step4 from '../../../assets/images/howItWorks/step4.png';
import step5 from '../../../assets/images/howItWorks/step5.png';
import style from './HowDoesItWork.module.scss';

type Step = {
  number: string;
  title: string;
  description: string;
};

const StepCard: React.FC<Step> = ({ number, title, description }) => (
  <div className={style.stepCard}>
    <span className={style.stepNumber}>{number}</span>
    <div className={style.stepContent}>
      <h3 className={style.stepTitle}>{title}</h3>
      <p className={style.stepDescription}>{description}</p>
    </div>
  </div>
);

const steps: (Step & { image: string })[] = [
  {
    number: '01',
    image: step1,
    title: 'Join a club or start your own',
    description:
      'Find a club that interests you or create a new one and invite members.',
  },
  {
    number: '02',
    image: step2,
    title: 'Suggest a book',
    description:
      "Each member can suggest a book they'd like to read. One book is randomly selected from the suggestions.",
  },
  {
    number: '03',
    image: step3,
    title: 'Read the selected book',
    description:
      "Read the chosen book within the given timeframe so you're ready for the discussion.",
  },
  {
    number: '04',
    image: step4,
    title: 'Meet and share your thoughts',
    description:
      'Gather with your club to exchange opinions, ideas, and impressions about the book.',
  },
  {
    number: '05',
    image: step5,
    title: 'Rate the book',
    description: 'Write a review to inspire other members and readers.',
  },
];

export const HowDoesItWork: React.FC = () => (
  <HomepageSection>
    <div className={style.section}>
      <h1 className={style.sectionTitle}>how does it work?</h1>

      <ol className={style.stepsContainer}>
        {steps.map((step) => (
          <li key={step.number} className={style.row}>
            <StepCard
              number={step.number}
              title={step.title}
              description={step.description}
            />
            <div className={style.illustration}>
              <img
                src={step.image}
                alt={step.title}
                className={style.illustrationImage}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  </HomepageSection>
);
